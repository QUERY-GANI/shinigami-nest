import {
  Body,
  HttpCode,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../../filters/user.filter';
import { Auth } from '../../decorators/auth.decorator';
import { RoleType } from '../auth/role-types';

@Controller('user')
export class UserController {
  constructor(private readonly Service: UserService) {}

  @Get()
  @Auth(RoleType.admin)
  showAll() {
    return this.Service.getAll();
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: UserDto) {
    return this.Service.create(body);
  }

  @Get(':id')
  @Auth(RoleType.user, RoleType.admin)
  showById(@Param('id') id: string) {
    return this.Service.get('_id', id);
  }

  @Put(':id')
  @Auth(RoleType.user, RoleType.admin)
  edit(@Param('id') id: string, @Body() body: UserDto) {
    return this.Service.edit(id, body);
  }

  @Delete(':id')
  @Auth(RoleType.user, RoleType.admin)
  delete(@Param('id') id: string) {
    return this.Service.delete(id);
  }
}
