import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { Message } from '../entities/message.entity';
import { CommentCreateDto } from '../dto/Comment';

@Injectable()
export class CommentsService {
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>;
    
    commentMessage(comment_dto:CommentCreateDto, author:number, message_id: number):Promise<Comment>{
        const comment = new Comment();
        comment.author_id = author;
        comment.message = message_id;
        comment.comment = comment_dto.comment;
        return this.repository.save(comment);
    }
}
