import { Controller, UseGuards, Patch, Body, Request } from '@nestjs/common';
import { UsersService } from '../users.service';
import { AuthGuard } from '../../guards/auth.guard';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Patch('profile')
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.userId; 
    return this.usersService.updateUser(userId, updateUserDto);
  }
}
