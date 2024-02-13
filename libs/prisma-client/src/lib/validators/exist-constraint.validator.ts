import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { PrismaService } from '../prisma.service';
import { ModelName } from '../interfaces';

// decorator options interface
export type ExistInterface = {
  table: ModelName;
  column: string;
  condition?: (value: any) => any;
  validate?: (value: any, response: any) => boolean;
};

@ValidatorConstraint({ name: 'ExistConstraint', async: true })
@Injectable()
export class ExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prismaService: PrismaService) {}
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    // catch options from decorator
    const { table, column, condition, validate }: ExistInterface =
      args.constraints[0];

    // database query check data is exists
    const register = await (this.prismaService as any)[table].findMany({
      where: {
        [column]: condition ? condition(value) : value,
      },
    });

    return validate ? validate(value, register) : register.length > 0;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    // return custom field message
    const value: string = validationArguments.value;
    const property: string = validationArguments.property;
    const { table }: ExistInterface = validationArguments.constraints[0];

    return `${property} with value ${value} do not exist in table ${table}`;
  }
}

// decorator function
export function Exist(
  options: ExistInterface,
  validationOptions?: ValidationOptions
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'Exist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: ExistConstraint,
    });
  };
}
