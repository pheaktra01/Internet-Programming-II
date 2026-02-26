import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users') // base route for all user-related endpoints prefixed with /users
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Post('create')
  createUser(@Body() body: User) {
    return this.userService.create(body);
  }

  @Patch('/:id')
  updateUser(
    @Body() body: { username: string; email: string; password: string },
    @Param('id') id: number,
  ) {
    return this.userService.update(id, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}