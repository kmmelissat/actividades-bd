import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private productsService: ProductsService,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    // Verificar que el producto existe
    const product = await this.productsService.findOne(
      createCommentDto.productId,
    );
    if (!product) {
      throw new NotFoundException(
        `Producto con ID ${createCommentDto.productId} no encontrado`,
      );
    }

    const comment = this.commentsRepository.create({
      ...createCommentDto,
      product,
    });

    return this.commentsRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentsRepository.find({
      relations: ['product'],
    });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!comment) {
      throw new NotFoundException(`Comentario con ID ${id} no encontrado`);
    }

    return comment;
  }
}
