import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/messages/entities/comment.entity'; 
import { CommentCreateDto } from 'src/messages/dto/Comment';

@Injectable()
export class CommentsService {
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>;
    
    /**
     * Comment a message
     * @param {CommentCreateDto} comment_dto 
     * @param {number} author author of comment
     * @param message_id message to comment
     * @returns 
     */
    commentMessage(comment_dto:CommentCreateDto, author:number, message_id: number):Promise<Comment>{
        const comment = new Comment();
        comment.author_id = author;
        comment.message = message_id;
        comment.comment = comment_dto.comment;
        return this.repository.save(comment);
    }
}
