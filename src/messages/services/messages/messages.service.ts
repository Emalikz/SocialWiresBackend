import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/messages/entities/message.entity'; 
import { DeleteResult, Repository } from 'typeorm';
import { MessageCreateDto } from 'src/messages/dto/Message'; 

@Injectable()
export class MessagesService {
    @InjectRepository(Message)
    private readonly repository: Repository<Message>;

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
        throw new Error("No se puede eliminar un mensaje que no es propio o que no existe");
    }

    public async createMessage(body: MessageCreateDto, user:string): Promise<Message> {
        const message: Message = new Message();
        message.title = body.title;
        message.content = body.content;
        message.author = user.sub;
        return  this.repository.save(message);
      }
}