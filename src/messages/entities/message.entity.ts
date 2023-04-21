import { Users } from 'src/auth/entities/User.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn('increment')
    public id!: number;

    @Column({ type: 'varchar' })
    title

    @Column({ type: 'text' })
    content

    @OneToOne(type=>Users) @JoinColumn()
    author

    @OneToMany(type=> Comment, (comment)=>comment.message)
    comments: Comment[]

    @CreateDateColumn({ type: 'timestamptz' })
    public created_at!: Date;
    
}