import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReactionCreateDto } from 'src/messages/dto/Reaction';
import { Reaction } from 'src/messages/entities/Reaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReactionsService {
    @InjectRepository(Reaction)
    private readonly repository: Repository<Reaction>;


    react(reaction_dto:ReactionCreateDto, author_id:number, message_id:number){
        const reaction = new Reaction();
        reaction.author_id = author_id;
        reaction.message = message_id;
        reaction.reaction = reaction_dto.reaction;
        return this.repository.save(reaction);
    }
}
