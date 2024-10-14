import {
  Body,
  Controller,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from './schemas/user.schema';
import { CurrentUser } from './decorators/current-user.decorator';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dtos/user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Update user details route
  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiOperation({ summary: 'Update user account' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(
    @CurrentUser() user: UserDocument,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(
      user.id,
      updateUserDto,
    );

    // Use class-transformer to convert to UserDto
    return plainToInstance(UserDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  // Separate route for updating password
  @UseGuards(JwtAuthGuard)
  @Put('update-password')
  @ApiOperation({ summary: 'Update user password' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updatePassword(
    @CurrentUser() user: UserDocument,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<{ message: string }> {
    return await this.userService.updatePassword(
      user.id,
      updatePasswordDto.old_password,
      updatePasswordDto.new_password,
    );
  }
}
