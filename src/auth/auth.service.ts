import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/schemas/user.schema';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dtos/register.dto';
import { VerifyEmailDto } from './dtos/verify-email.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async register(user: RegisterDto): Promise<{ message: string }> {
    // Hash the password before saving
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await this.userService.create(user);

    const token = this.generateVerificationToken(newUser);

    // Send verification email
    await this.mailService.sendUserConfirmation(user.email, token);

    return {
      message:
        'Registration successful. Please check your email to verify your account.',
    };
  }

  async login(user: UserDocument): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private generateVerificationToken(user: UserDocument): string {
    const payload = { email: user.email, sub: user.id };

    return this.jwtService.sign(payload);
  }

  async verifyEmail(
    verifyEmailDto: VerifyEmailDto,
  ): Promise<{ message: string }> {
    const { token } = verifyEmailDto;

    try {
      const decoded = await this.jwtService.verifyAsync(token);
      const user = await this.userService.findById(decoded.sub);

      if (!user || user.is_verified) {
        return { message: 'Invalid or expired token' };
      }

      user.is_verified = true;
      await user.save();

      return { message: 'Email verified successfully!' };
    } catch (error) {
      return { message: 'Invalid or expired token' };
    }
  }
}
