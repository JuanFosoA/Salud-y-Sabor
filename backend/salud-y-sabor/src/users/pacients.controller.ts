import {
  Controller,
  UseGuards,
  Patch,
  Body,
  Req,
  Put,
  Post,
  HttpCode,
  Get,
  ParseIntPipe,
  Param,
  NotFoundException,
  Query,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Pacient } from './pacient.entity';
import { UpdatePacientDto } from './dto/updatePacient.dto';
import { Request } from 'express';
import { EspecialistaGuard } from 'src/guards/especialista.guard';

@Controller('pacients')
export class PacientsController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(EspecialistaGuard)
  @ApiOperation({
    summary: 'Get all pacients for current specialist',
    description:
      'Returns paginated list of pacients belonging to the authenticated specialist',
  })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of pacients',
    type: [Pacient],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAllPacients(
    @Req() request: Request,
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
  ) {
    return this.usersService.getAllPacients(request, skip, take);
  }

  @Get('search')
  @UseGuards(EspecialistaGuard)
  @ApiOperation({
    summary: 'Search pacients by name',
    description: 'Search pacients by name for current specialist',
  })
  @ApiQuery({ name: 'name', required: true, type: String })
  @ApiResponse({
    status: 200,
    description: 'List of matching pacients',
    type: [Pacient],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getPacientsByName(
    @Req() request: Request,
    @Query('name') name: string,
  ) {
    if (!name || name.trim().length < 2) {
      throw new HttpException(
        'Name query parameter must be at least 2 characters',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.usersService.getPacientsByName(request, name);
  }

  @Delete(':id')
  @UseGuards(EspecialistaGuard)
  @ApiOperation({
    summary: 'Delete a pacient',
    description: 'Delete a specific pacient belonging to current specialist',
  })
  @ApiResponse({ status: 200, description: 'Pacient deleted successfully' })
  @ApiResponse({
    status: 404,
    description: 'Pacient not found or not authorized',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deletePacient(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.deletePacient(request, id);
  }

  @Put(':id')
  @UseGuards(EspecialistaGuard)
  @ApiOperation({
    summary: 'Update a pacient',
    description:
      'Update pacient information including menus and recipes associations',
  })
  @ApiResponse({
    status: 200,
    description: 'Pacient updated successfully',
    type: Pacient,
  })
  @ApiResponse({ status: 404, description: 'Pacient not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updatePacient(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePacientDto: UpdatePacientDto,
  ) {
    try {
      return await this.usersService.updatePacient(
        request,
        id,
        updatePacientDto,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get(':id')
  @UseGuards(EspecialistaGuard)
  @ApiOperation({
    summary: 'Get pacient by ID',
    description: 'Returns detailed information about a specific pacient',
  })
  @ApiResponse({ status: 200, description: 'Pacient found', type: Pacient })
  @ApiResponse({ status: 404, description: 'Pacient not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getPacientById(@Param('id', ParseIntPipe) id: number) {
    const pacient = await this.usersService.getPacientById(id);

    if (!pacient) {
      throw new NotFoundException(`Pacient with ID ${id} not found`);
    }

    return pacient;
  }

  @Patch('change-password')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Change user password',
    description:
      "Updates the authenticated user's password. Requires the current password and a valid JWT token.",
  })
  @ApiOkResponse({
    description: 'Password updated successfully',
  })
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized if token is invalid or old password is incorrect',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data (e.g., new password too short)',
  })
  async changePassword(
    @Req() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(
      req.user.id,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }

  @Post('forgot-password')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Request password reset',
    description:
      'Sends a password reset email to the user if the email exists. Always returns 200 to avoid email enumeration attacks.',
  })
  @ApiOkResponse({
    description: 'If the email exists, a reset link will be sent',
  })
  @ApiBadRequestResponse({
    description: 'Invalid email format',
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.usersService.forgotPassword(forgotPasswordDto.email);
  }

  @Put('reset-password')
  @ApiOperation({
    summary: 'Reset user password',
    description:
      "Resets the user's password using a valid reset token received via email.",
  })
  @ApiOkResponse({
    description: 'Password reset successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid token or expired token',
  })
  @ApiNotFoundResponse({
    description: 'Token does not exist',
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.usersService.resetPassword(
      resetPasswordDto.newPassword,
      resetPasswordDto.resetToken,
    );
  }
}
