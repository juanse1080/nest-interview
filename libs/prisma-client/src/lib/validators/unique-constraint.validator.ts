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
export type IsUniqueInterface = {
  table: ModelName;
  column: string;
};

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prismaService: PrismaService) {}
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    // catch options from decorator
    const { table, column }: IsUniqueInterface = args.constraints[0];

    // database query check data is exists
    const register = await (this.prismaService as any)[table].findMany({
      where: {
        [column]: value,
      },
    });

    return register.length === 0;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    // return custom field message
    const value: string = validationArguments.value;
    const property: string = validationArguments.property;
    const { table }: IsUniqueInterface = validationArguments.constraints[0];

    return `${property} with value ${value} already exist in table ${table}`;
  }
}

// decorator function
export function IsUnique(
  options: IsUniqueInterface,
  validationOptions?: ValidationOptions
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}
