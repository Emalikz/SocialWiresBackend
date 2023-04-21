import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, Index } from 'typeorm';
import { Message } from './message.entity';
import { Users } from 'src/auth/entities/User.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('increment')
    public id!: number;

    @Column({ type: 'text' })
    comment

    @ManyToOne(type=>Message, (message)=>message.comments) @JoinColumn()
    message

    @Column({ type: 'int' }) // Cambiar el tipo de la columna a string
    author_id: number;

    @ManyToOne(type=>Users, (user)=>user.comments) 
    @JoinColumn({ name: 'author_id', referencedColumnName: 'id'})
    @Index({unique:false})
    author

    @CreateDateColumn({ type: 'timestamptz' })
    public created_at!: Date;
}