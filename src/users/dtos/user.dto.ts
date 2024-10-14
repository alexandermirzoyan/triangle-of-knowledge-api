import { Expose } from 'class-transformer';
import { Gender } from '../enums/gender.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @Expose()
  @ApiProperty({
    example: '66fc5dcbfdd3f1fa257352c1',
    description: 'The id of the user',
  })
  readonly id: string;

  @Expose()
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  readonly first_name: string;

  @Expose()
  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  readonly last_name: string;

  @Expose()
  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'The email of the user',
  })
  readonly email: string;

  @Expose()
  @ApiProperty({
    example: '+12345678',
    description: 'The phone number of the user',
  })
  readonly phone_number?: string;

  @Expose()
  @ApiProperty({
    example: '1990-01-01T00:00:00.000Z',
    description: 'The birthday of the user',
  })
  readonly date_of_birth?: string;

  @Expose()
  @ApiProperty({ example: 'USA', description: 'The country of the user' })
  readonly country?: string;

  @Expose()
  @ApiProperty({
    example: 'Software Engineer',
    description: 'The profession of the user',
  })
  readonly profession?: string;

  @Expose()
  @ApiProperty({ example: 'male', description: 'The gender of the user' })
  readonly gender?: Gender;
}
