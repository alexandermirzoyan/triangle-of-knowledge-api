import { IsString, MinLength, MaxLength } from 'class-validator';
import { Match } from '../../common/decoratos/match.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({
    example: '12345678',
    description: 'The old password of the user',
  })
  readonly old_password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({
    example: '87654321',
    description: 'The new password of the user',
  })
  readonly new_password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Match('new_password', { message: 'Passwords do not match' })
  @ApiProperty({
    example: '87654321',
    description: 'The new password confirmation of the user',
  })
  readonly new_password_confirm: string;
}
