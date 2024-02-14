import {
  DataAccessActionService,
  DataAccessUserService,
} from '@nest-interview/data-access';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import { User } from '@nest-interview/prisma-client';
import { AuthUser } from './interfaces/auth.interface';
import { LoginInput } from './interfaces/login.interface';
import { RegisterInput } from './interfaces/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataAccessUserService: DataAccessUserService,
    private readonly dataAccessActionService: DataAccessActionService,
    private readonly jwtService: JwtService
  ) {}

  async register({ password, email, name }: RegisterInput): Promise<User> {
    const hashedPassword = await bcryptjs.hash(password, 10);

    return await this.dataAccessUserService.createUser({
      name,
      email,
      password: hashedPassword,
    });
  }

  async login({ email, password }: LoginInput): Promise<AuthUser> {
    const user = await this.dataAccessUserService.getUnique({ email });

    if (!user) throw new UnauthorizedException('Invalid email');

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    const { password: _password, roles, ...payload } = user;

    const actions = await this.dataAccessActionService.getAll({
      where: {
        roles: {
          some: {
            code: {
              in: roles.map(({ code }) => code),
            },
          },
        },
      },
    });

    const actionsStrings = actions.map(({ code }) => code);

    const token = await this.jwtService.signAsync({
      ...payload,
      actions: actionsStrings,
    });

    return {
      ...payload,
      token,
      actions: actionsStrings,
    };
  }
}
