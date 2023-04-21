import { Comment } from 'src/messages/entities/comment.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public fullname: string;

  @Column({ type: 'varchar', length: 120 })
  public email: string;
  
  @Column({ type: 'varchar', length: 120 })
  public password: string;

  @Column({ type: 'varchar', length: 120, unique:true })
  public username: string;

  @CreateDateColumn({ type: 'timestamptz' })
  public created_at!: Date;

  @OneToMany(type=> Comment, (comment)=>comment.author)
    comments: Comment[]

  @OneToMany(type=> Message, (message)=>message.author)
    messages: Message[]
}