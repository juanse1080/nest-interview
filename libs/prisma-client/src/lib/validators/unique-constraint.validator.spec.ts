import { User } from '../interfaces';
import { PrismaService } from '../prisma.service';
import { IsUniqueConstraint } from './unique-constraint.validator';

describe('IsUniqueConstraint', () => {
  const table = 'user';
  const property = 'email';
  const value = 'correo@gmail.com';

  const commonArgs = {
    value,
    targetName: 'IsUniqueConstraint',
    object: {},
    property,
    constraints: [
      {
        table,
        column: property,
      },
    ],
  };
  let uniqueConstraint: IsUniqueConstraint;
  let prismaService: PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    prismaService = {
      [table]: {
        findMany: jest.fn(),
      },
    } as unknown as PrismaService;

    uniqueConstraint = new IsUniqueConstraint(prismaService);
  });

  it('should be valid', async () => {
    jest.spyOn(prismaService[table], 'findMany').mockResolvedValue([]);

    const isValid = await uniqueConstraint.validate(value, {
      ...commonArgs,
    });

    expect(isValid).toEqual(true);
    expect(prismaService[table].findMany).toHaveBeenCalled();
  });

  it('should be invalid', async () => {
    jest
      .spyOn(prismaService[table], 'findMany')
      .mockResolvedValue([{ email: value } as User]);

    const isValid = await uniqueConstraint.validate(value, {
      ...commonArgs,
    });

    expect(isValid).toEqual(false);
    expect(prismaService[table].findMany).toHaveBeenCalled();
  });

  it('default message', () => {
    const message = uniqueConstraint.defaultMessage({
      ...commonArgs,
    });

    expect(message).toEqual(
      `${property} with value ${value} already exist in table ${table}`
    );
  });
});
