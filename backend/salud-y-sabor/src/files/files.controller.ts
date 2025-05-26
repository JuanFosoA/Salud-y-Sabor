import {
  Controller,
  Get,
  Param,
  Res,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { StorageFolder } from '../shared/storage/storage.service';
import * as path from 'path';
import { promises as fs } from 'fs';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('files')
@UseGuards(AuthGuard)
export class FilesController {
  private readonly basePath = path.join(process.cwd(), 'uploads');

  @Get('medical-records/:filename')
  async getMedicalRecord(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    return this.serveFile(res, filename, StorageFolder.MEDICAL_RECORDS);
  }

  @Get('recipe-images/:filename')
  async getRecipeImage(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    return this.serveFile(res, filename, StorageFolder.RECIPE_IMAGES);
  }

  private async serveFile(
    res: Response,
    filename: string,
    folder: StorageFolder,
  ) {
    const filePath = path.join(this.basePath, folder, filename);

    try {
      await fs.access(filePath);
      res.sendFile(filePath);
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }
}
