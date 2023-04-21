import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './services/messages/messages.service'; 
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './services/comments/comments.service'; 
import { Comment } from './entities/comment.entity';
import { ReactionsService } from './services/reactions/reactions.service';
import { Reaction } from './entities/Reaction.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Message, Comment, Reaction]),],
  controllers: [MessagesController],
  providers: [MessagesService, CommentsService, ReactionsService]
})
export class MessagesModule {}
