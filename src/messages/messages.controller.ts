import { Controller, UseGuards, Get, Post, Request, Body, Param, Delete, Patch, Response, Inject} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { MessagesService } from './services/messages/messages.service'; 
import { MessageCreateDto } from './dto/Message';
import { CommentCreateDto } from './dto/Comment';
import { CommentsService } from './services/comments/comments.service'; 
import { ReactionCreateDto } from './dto/Reaction';
import { ReactionsService } from './services/reactions/reactions.service';
import { UserService } from 'src/auth/services/user/user.service';

@Controller('messages')
@UseGuards(AuthGuard)
export class MessagesController {
    @Inject(UserService) readonly userService:UserService;
    constructor(readonly messageService:MessagesService,
                readonly commentService: CommentsService,
                readonly reactionService:ReactionsService){}

    /**
     * Messages of current user
     * @param req 
     * @returns 
     */
    @Get('me')
    getAll(@Request() req){
        return this.messageService.getAll(req.user.sub);
    }

    /**
     * find specific message of current user
     * @param req 
     * @param message_id 
     * @returns 
     */
    @Get('me/:id')
    getById(@Request() req, @Param('id') message_id: number){
        return this.messageService.getById(req.user.sub, message_id);
    }

    /**
     * Create message
     * @param message 
     * @param req 
     * @returns 
     */
    @Post()
    save(@Body() message:MessageCreateDto, @Request() req){
        return this.messageService.createMessage(message, req.user);
    }

    /**
     * Delete message
     * @param req 
     * @param message_id 
     * @returns 
     */
    @Delete(":id")
    async deleteMessage(@Request() req, @Param('id') message_id: number){
        try{
            const resp = await this.messageService.delete(req.user.sub, message_id);
            return {deleted: true, status: "ok"}
        }catch(e){
            return {deleted: false, "status": e.message};
        }
    }


    /**
     * Comment message
     * @param comment 
     * @param req 
     * @param message_id 
     * @param resp 
     * @returns 
     */
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

    /**
     * React to message
     * @param react 
     * @param req 
     * @param message_id 
     * @param resp 
     * @returns 
     */
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

    /**
     * User reactions stats
     */
    @Get('reaction/ratio')
    async userReactionRatio(){
        const users = await this.userService.getAll();
        let user_reactions = users.map((user)=>{
            const {id,messages} = user;
            let totalReactions = 0;
            let by_reaction_percent= {};
            messages.map(message=>{
                totalReactions+= message.reactions.length;
                message.reactions.map(({reaction})=>{
                    if(by_reaction_percent[reaction] == undefined){
                        by_reaction_percent[reaction] = Math.round(1 * 100 / totalReactions);
                        return;
                    }
                    by_reaction_percent[reaction] = Math.round(by_reaction_percent[reaction] + 1 * 100 / totalReactions);
                });
            })
            return {totalReactions, by_reaction_percent, id}
        })
        return user_reactions;
    }
}
