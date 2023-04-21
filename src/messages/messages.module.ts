import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './services/messages.service';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './services//comments.service';
import { Comment } from './entities/comment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Message, Comment]),],
  controllers: [MessagesController],
  providers: [MessagesService, CommentsService]
})
export class MessagesModule {}
