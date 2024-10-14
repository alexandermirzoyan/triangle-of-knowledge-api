import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { State } from '../enums/state.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateKnowledgeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({ example: 'C#', description: 'The title of knowledge' })
  readonly title: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(1000)
  @ApiProperty({
    example: 'dot net framework',
    description: 'The description of knowledge',
  })
  readonly description?: string;

  @IsNotEmpty()
  @IsEnum(State)
  @ApiProperty({ example: '0', description: 'The state of knowledge' })
  readonly state: State;
}
