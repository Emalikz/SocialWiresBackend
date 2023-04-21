import { Controller, UseGuards, Get, Post, Request, Body, Param, Delete, Patch, Response} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { MessagesService } from './services/messages.service';
import { MessageCreateDto } from './dto/Message';
import { CommentCreateDto } from './dto/Comment';
import { CommentsService } from './services/comments.service';

@Controller('messages')
@UseGuards(AuthGuard)
export class MessagesController {
    constructor(readonly messageService:MessagesService, readonly commentService: CommentsService){}
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

            console.log("Prueba")
            return resp.json({error: true, status: 'You cannot comment your own posts'}).status(401);
        }
        this.commentService.commentMessage(comment, author , message_id);
        const response =await this.messageService.getById(author,message_id);
        console.log(response);
        return resp.json(response).status(200);
    }

}
