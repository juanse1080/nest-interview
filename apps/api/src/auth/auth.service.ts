import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { DataAccessUserService } from '@nest-interview/data-access-users';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import { AuthUser } from './interfaces/auth.interface';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataAccessUserService: DataAccessUserService,
    private readonly jwtService: JwtService
  ) {}

  async register({ password, email, name }: RegisterDto): Promise<void> {
    const user = await this.dataAccessUserService.getUnique({ email });

    if (user) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcryptjs.hash(password, 10);

    await this.dataAccessUserService.createUser({
      name,
      email,
      password: hashedPassword,
    });
  }

  async login({ email, password }: LoginDto): Promise<AuthUser> {
    const user = await this.dataAccessUserService.getUnique({ email });

    if (!user) throw new UnauthorizedException('Invalid email');

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    const { password: _password, ...payload } = user;

    const token = await this.jwtService.signAsync(payload);

    return {
      ...payload,
      token,
    };
  }
}
