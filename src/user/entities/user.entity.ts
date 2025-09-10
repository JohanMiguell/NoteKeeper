import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Note } from '../../notes/entities/note.entity';
export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    
    @Column ({ 
        type: 'enum', 
        enum: UserRole, 
        default: UserRole.USER 
    })
    role: UserRole;

    @OneToMany(() => Note, (note) => note.user)
    notes: Note[];

}
