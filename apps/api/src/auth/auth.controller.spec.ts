import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const authController = app.get<AuthController>(AuthController);
      expect(authController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
