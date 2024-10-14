import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyEmailDto } from './dtos/verify-email.dto';
import { UserService } from '../users/user.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from '../users/dtos/login.dto';
import * as bcrypt from 'bcryptjs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<{ message: string }> {
    const { email } = registerDto;

    // Check if email is already registered
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      return { message: 'Email is already in use' };
    }

    // Create new user and save to database
    return await this.authService.register(registerDto);
  }

  @Get('verify-email')
  @ApiOperation({ summary: 'Verify user email' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async verifyEmail(@Query() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    // Validate user by email
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Generate JWT token for the user
    return this.authService.login(user);
  }
}
