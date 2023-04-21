import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/messages/entities/message.entity'; 
import { DeleteResult, Repository } from 'typeorm';
import { MessageCreateDto } from 'src/messages/dto/Message'; 

@Injectable()
export class MessagesService {
    @InjectRepository(Message)
    private readonly repository: Repository<Message>;

    /**
     * Get all the messages by author
     * @param author 
     * @returns 
     */
    getAll(author):Promise<Message[]>{
        return this.repository.find({
            where: {
                author:{
                    id: author
                }
            },
            relations:['author', 'comments','comments.author', 'reactions', 'reactions.author']
        })
    }

    /**
     * Get message by id and author
     * @param author 
     * @param message_id 
     * @returns 
     */
    getById(author, message_id):Promise<Message>{
        return this.repository.findOne({
            where: {
                id: message_id,
                author:{
                    id: author
                }
            },
            relations:['author', 'comments', 'reactions']
        })
    }

    /**
     * Delete message if the request user is owner of them
     * @param author 
     * @param message_id 
     * @returns 
     */
    async delete(author, message_id):Promise<DeleteResult>{
        //Validamos de que el mensaje pertenezca al usuario actual
        const message = await this.repository.findOne({
            where:{
                id: message_id,
                author: {
                    id: author
                }
            }
        })
        if(message){
            return this.repository.delete({id:message_id});
        }
        throw new Error("Cannot delete a message that is not owned or does not exist");
    }

    /**
     * Register message in database
     * @param body 
     * @param user 
     * @returns 
     */
    public async createMessage(body: MessageCreateDto, user:string): Promise<Message> {
        const message: Message = new Message();
        message.title = body.title;
        message.content = body.content;
        message.author = user.sub;
        return  this.repository.save(message);
      }
}