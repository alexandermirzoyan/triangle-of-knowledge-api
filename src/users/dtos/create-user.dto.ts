import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Gender } from '../enums/gender.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  readonly last_name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'The email of the user',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({ example: '12345678', description: 'The password of the user' })
  readonly password: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({
    example: '+12345678',
    description: 'The phone number of the user',
  })
  readonly phone_number?: string;

  @IsOptional()
  @IsDateString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({
    example: '1990-01-01T00:00:00.000Z',
    description: 'The birthday of the user',
  })
  readonly date_of_birth?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
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
