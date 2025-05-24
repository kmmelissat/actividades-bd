import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@ApiTags('Ejercicio 3A - Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo comentario con puntuación' })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({
    status: 201,
    description: 'Comentario creado exitosamente',
    type: Comment,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos (rating 1-5, comentario max 200 chars)',
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los comentarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de comentarios con productos',
    type: [Comment],
  })
  findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener comentario por ID' })
  @ApiParam({ name: 'id', description: 'ID del comentario' })
  @ApiResponse({
    status: 200,
    description: 'Comentario encontrado',
    type: Comment,
  })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Comment> {
    return this.commentsService.findOne(id);
  }
}
