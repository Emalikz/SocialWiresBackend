import { Controller, UseGuards, Get, Post, Request, Body, Param, Delete, Patch, Response} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { MessagesService } from './services/messages/messages.service'; 
import { MessageCreateDto } from './dto/Message';
import { CommentCreateDto } from './dto/Comment';
import { CommentsService } from './services/comments/comments.service'; 
import { ReactionCreateDto } from './dto/Reaction';
import { ReactionsService } from './services/reactions/reactions.service';

@Controller('messages')
@UseGuards(AuthGuard)
export class MessagesController {
    constructor(readonly messageService:MessagesService,
                readonly commentService: CommentsService,
                readonly reactionService:ReactionsService){}
    @Get('me')
    getAll(@Request() req){
        return this.messageService.getAll(req.user.sub);
    }

    @Get('me/:id')
    getById(@Request() req, @Param('id') message_id: number){
        return this.messageService.getById(req.user.sub, message_id);
    }

    @Post()
    save(@Body() message:MessageCreateDto, @Request() req){
        return this.messageService.createMessage(message, req.user);
    }

    @Delete(":id")
    async deleteMessage(@Request() req, @Param('id') message_id: number){
        try{
            const resp = await this.messageService.delete(req.user.sub, message_id);
            return {deleted: true, status: "ok"}
        }catch(e){
            return {deleted: false, "status": e.message};
        }
    }


    @Patch('comment/:id')
    async comment(@Body() comment: CommentCreateDto, @Request() req, @Param('id') message_id:number, @Response() resp){
        const author = req.user.sub;
        const message = await this.messageService.getById(author, message_id);
        if(!message){
            return resp.json({error: true, status: 'You cannot comment on your own posts'}).status(401);
        }
        let result = await this.commentService.commentMessage(comment, author , message_id);
        message.comments.push(result);
        return resp.json(message).status(200);
    }

    @Patch('reaction/:id')
    async reaction(@Body() react: ReactionCreateDto, @Request() req, @Param('id') message_id:number, @Response() resp){
        const author = req.user.sub;
        const message = await this.messageService.getById(author, message_id);
        console.log(message);
        if(!message){
            return resp.json({error: true, status: 'You cannot react on your own posts'}).status(401);
        }
        let result = await this.reactionService.reaction(react, author , message_id);
        message.reactions.push(result);
        return resp.json(message).status(200);
    }

}
