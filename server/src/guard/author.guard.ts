import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { TaskService } from '../task/task.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private readonly taskService: TaskService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id, type } = request.params;

    let entity;

    switch (type) {
      case 'task':
        entity = await this.taskService.findOne(id);
        break;
      default:
        throw new NotFoundException('ЗОндбе');
    }

    const user = request.user;

    if (entity && user && entity.user.id === user.id) return true;

    throw new BadRequestException('Что-то пошло не так...');
  }
}
