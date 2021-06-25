import {
  Body,
  HttpCode,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../../filters/user.filter';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly Service: UserService) {}

  @Get()
  @UseGuards(AuthGuard())
  showAll(@Req() req: any) {
    console.log(req.user);
    return this.Service.getAll();
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: UserDto) {
    return this.Service.create(body);
  }

  @Get(':id')
  showById(@Param('id') id: string) {
    return this.Service.get('_id', id);
  }

  @Put(':id')
  edit(@Param('id') id: string, @Body() body: UserDto) {
    return this.Service.edit(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.Service.delete(id);
  }
}
