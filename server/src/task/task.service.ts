import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, id: number) {
    const newTask = {
      title: createTaskDto.title,
      body: createTaskDto.body,
      user: { id },
    };
    return await this.taskRepository.save(newTask);
  }

  async findAll(id: number) {
    return await this.taskRepository.find({
      where: {
        user: { id },
      },
    });
  }

  async findOne(id: number) {
    return await this.taskRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async findAllTasks() {
    return await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user') // Предполагается, что user - это связь сущности Task с сущностью User
      .getMany();
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({ where: { id: id } });

    if (!task) {
      throw new NotFoundException('зачем это вщ');
    }

    return await this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return await this.taskRepository.remove(task);
  }
}
