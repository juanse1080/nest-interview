import { Role } from '../interfaces';
import { PrismaService } from '../prisma.service';
import { ExistConstraint } from './exist-constraint.validator';

describe('ExistConstraint', () => {
  const table = 'role';
  const property = 'roles';
  const value = ['SUPPER'];

  const commonArgs = {
    value,
    targetName: 'ExistConstraint',
    object: {},
    property,
    constraints: [
      {
        table,
        column: 'code',
        condition: (value: string[]) => ({ in: value }),
        validate: (value: string[], response: string[]) => {
          return value.length === response.length;
        },
      },
    ],
  };

  let existConstraint: ExistConstraint;
  let prismaService: PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    prismaService = {
      [table]: {
        findMany: jest.fn(),
      },
    } as unknown as PrismaService;

    existConstraint = new ExistConstraint(prismaService);
  });

  it('should be valid', async () => {
    jest
      .spyOn(prismaService[table], 'findMany')
      .mockResolvedValue([{ code: value[0] } as Role]);

    const isValid = await existConstraint.validate(value, {
      ...commonArgs,
    });

    expect(isValid).toBe(true);
    expect(prismaService[table].findMany).toHaveBeenCalled();
  });

  it('should be invalid', async () => {
    jest.spyOn(prismaService[table], 'findMany').mockResolvedValue([]);

    const isValid = await existConstraint.validate(value, {
      ...commonArgs,
    });

    expect(isValid).toBe(false);
    expect(prismaService[table].findMany).toHaveBeenCalled();
  });

  it('default message', () => {
    const message = existConstraint.defaultMessage({
      ...commonArgs,
    });

    expect(message).toBe(
      `${property} with value ${value} do not exist in table ${table}`
    );
  });
});
