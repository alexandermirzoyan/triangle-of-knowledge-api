import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { Gender } from '../../users/enums/gender.enum';
import { Match } from '../../common/decoratos/match.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  readonly last_name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'The email of the user',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '12345678', description: 'The password of the user' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password', { message: 'Passwords do not match' })
  @ApiProperty({
    example: '12345678',
    description: 'The confirm password of the user',
  })
  readonly confirm_password: string;

  @IsOptional()
  @ApiProperty({
    example: '+12345678',
    description: 'The phone number of the user',
  })
  readonly phone_number?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    example: '1990-01-01T00:00:00.000Z',
    description: 'The birthday of the user',
  })
  readonly date_of_birth?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'USA', description: 'The country of the user' })
  readonly country?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Software Engineer',
    description: 'The profession of the user',
  })
  readonly profession?: string;

  @IsOptional()
  @IsEnum(Gender)
  @ApiProperty({ example: 'male', description: 'The gender of the user' })
  readonly gender?: Gender;
}
