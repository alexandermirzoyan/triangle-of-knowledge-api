import { Expose } from 'class-transformer';
import { State } from '../enums/state.enum';
import { ApiProperty } from '@nestjs/swagger';

export class KnowledgeDto {
  @Expose()
  @ApiProperty({
    example: '66fc5dcbfdd3f1fa257352c1',
    description: 'The id of knowledge',
  })
  readonly id: string;

  @Expose()
  @ApiProperty({ example: 'C#', description: 'The title of knowledge' })
  readonly title: string;

  @Expose()
  @ApiProperty({
    example: 'dot net framework',
    description: 'The description of knowledge',
  })
  readonly description: string;

  @Expose()
  @ApiProperty({ example: '0', description: 'The state of knowledge' })
  readonly state: State;
}
