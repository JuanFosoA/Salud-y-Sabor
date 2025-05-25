import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export enum StorageFolder {
  MEDICAL_RECORDS = 'medical-records',
  RECIPE_IMAGES = 'recipe-images',
}

@Injectable()
export class StorageService {
  private readonly basePath = path.join(process.cwd(), 'uploads');
  private readonly logger = new Logger(StorageService.name);

  constructor() {
    // Inicializa todas las carpetas necesarias al iniciar
    this.initializeFolders(Object.values(StorageFolder)).catch((error) => {
      this.logger.error(`Failed to initialize storage: ${error.message}`);
    });
  }

  private async initializeFolders(folders: string[]): Promise<void> {
    try {
      await fs.mkdir(this.basePath, { recursive: true });

      // Crea subcarpetas
      for (const folder of folders) {
        const folderPath = path.join(this.basePath, folder);
        await fs.mkdir(folderPath, { recursive: true });
        this.logger.log(`Folder initialized: ${folderPath}`);
      }
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
      this.logger.debug('Folders already exist');
    }
  }

  async saveFile(
    file: Express.Multer.File,
    folder: StorageFolder,
  ): Promise<string> {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(this.basePath, folder, fileName);

    await fs.writeFile(filePath, file.buffer);
    this.logger.debug(`File saved to ${folder}/${fileName}`);
    return fileName;
  }

  async deleteFile(fileName: string, folder: StorageFolder): Promise<void> {
    const filePath = path.join(this.basePath, folder, fileName);

    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      this.logger.debug(`File deleted: ${filePath}`);
    } catch (error) {
      if (error.code === 'ENOENT') {
        this.logger.warn(`File not found: ${filePath}`);
        return;
      }
      throw error;
    }
  }

  async getFile(fileName: string, folder: StorageFolder): Promise<Buffer> {
    const filePath = path.join(this.basePath, folder, fileName);

    try {
      await fs.access(filePath);
      return await fs.readFile(filePath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new NotFoundException('File not found');
      }
      throw error;
    }
  }
}
