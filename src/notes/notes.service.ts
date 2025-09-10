import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, user: User): Promise<Note> {
    const note = this.notesRepository.create({
      ...createNoteDto,
      user,
    });
    return this.notesRepository.save(note);
  }

  async findAll(user: User): Promise<Note[]> {
    return this.notesRepository.find({
      where: { user: { id: user.id } }, 
      relations: ['user'],
    });
  }

  async findOne(id: number, user: User): Promise<Note> {
    const note = await this.notesRepository.findOne({
      where: { id, user: { id: user.id } }, 
      relations: ['user'],
    });
    if (!note) {
      throw new NotFoundException(`Nota con id ${id} no encontrada`);
    }
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, user: User): Promise<Note> {
    const note = await this.findOne(id, user); 
    Object.assign(note, updateNoteDto);
    return this.notesRepository.save(note);
  }

  async remove(id: number, user: User): Promise<void> {
    const note = await this.findOne(id, user); 
    await this.notesRepository.remove(note);
  }
}
