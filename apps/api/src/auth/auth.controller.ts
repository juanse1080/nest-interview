import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request as RequestExpress } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guard/auth.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async getData() {
    return { message: 'Hello API' };
  }

  @Post('sign-in')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('sign-up')
  async register(@Body() body: RegisterDto) {
    await this.authService.register(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req: RequestExpress) {
    return (req as any).user; // TODO: define request express
  }
}
