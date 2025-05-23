import { Injectable, Logger } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  private readonly uploadPath = path.join(__dirname, '..', '..', 'medical-records');
  private readonly logger = new Logger(StorageService.name);

  constructor() {
    this.initializeStorage().catch((error) => {
      this.logger.error(
        `Failed to initialize storage directory: ${error.message}`,
      );
      // Opcional: Lanzar el error para detener la aplicación si es crítico
      // throw new Error('Storage initialization failed');
    });
  }

  private async initializeStorage(): Promise<void> {
    try {
      await fs.mkdir(this.uploadPath, { recursive: true });
      this.logger.log(
        `Medical records directory initialized at ${this.uploadPath}`,
      );
    } catch (error) {
      if (error.code !== 'EEXIST') {
        this.logger.error(`Critical storage error: ${error.message}`);
        throw error; // Relanza errores no esperados
      }
      // Si es EEXIST (directorio ya existe), solo lo registramos
      this.logger.debug('Medical records directory already exists');
    }
  }

  async saveMedicalRecord(file: Express.Multer.File): Promise<string> {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(this.uploadPath, fileName);

    try {
      await fs.writeFile(filePath, file.buffer);
      this.logger.debug(`Medical record saved: ${fileName}`);
      return fileName;
    } catch (error) {
      this.logger.error(`Failed to save medical record: ${error.message}`);
      throw new Error('Could not save medical record');
    }
  }
}
