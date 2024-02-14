import { createMock } from '@golevelup/ts-jest';
import {
  DataAccessModule,
  DataAccessUserService,
} from '@nest-interview/data-access';
import { User } from '@nest-interview/prisma-client';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcryptjs from 'bcryptjs';

import { jwtConstants } from './auth.constants';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const password = 'test';
  const payload: Omit<User, 'password'> = {
    id: 6,
    name: 'Juan',
    email: 'juanmarcon+20@gmail.com',
    createdAt: new Date('2024-02-13T21:01:57.476Z'),
    updatedAt: new Date('2024-02-13T21:01:57.476Z'),
    roles: [
      {
        id: 1,
        name: 'Superuser',
        code: 'SUPER',
        createdAt: new Date('2024-02-12T19:24:12.949Z'),
        updatedAt: null,
      },
    ],
  };

  const user: User = {
    ...payload,
    password: '$2a$10$mpriX.x8Jzvxy0SMYVxbfeXQ4yAKy2p/12qWvG9PzWTRnejND2D86',
  };

  let authService: AuthService;
  let jwtService: JwtService;
  let dataAccessUserService: DataAccessUserService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DataAccessModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthService],
    })
      .useMocker(createMock)
      .compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    dataAccessUserService = module.get<DataAccessUserService>(
      DataAccessUserService
    );
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('login', async () => {
    jest.spyOn(dataAccessUserService, 'getUnique').mockResolvedValue(user);

    const loginResponse = await authService.login({
      email: user.email,
      password,
    });

    const token = await jwtService.signAsync(payload);

    expect(loginResponse).toEqual({ ...payload, token });
  });

  it('register', async () => {
    jest.spyOn(dataAccessUserService, 'createUser').mockResolvedValue(user);

    const registerResponse = await authService.register({
      email: user.email,
      name: user.name,
      password,
    });

    const isPasswordValid = await bcryptjs.compare(
      password,
      registerResponse.password
    );

    expect(registerResponse).toEqual(user);
    expect(isPasswordValid).toEqual(true);
  });
});
