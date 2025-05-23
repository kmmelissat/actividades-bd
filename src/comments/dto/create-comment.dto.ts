import { IsString, IsInt, Min, Max, Length } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Length(1, 200, {
    message: 'El comentario debe tener entre 1 y 200 caracteres',
  })
  content: string;

  @IsString()
  author: string;

  @IsInt()
  @Min(1, { message: 'El puntaje mínimo es 1' })
  @Max(5, { message: 'El puntaje máximo es 5' })
  rating: number;

  @IsInt()
  productId: number;
}
