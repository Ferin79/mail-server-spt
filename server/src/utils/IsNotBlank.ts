/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    registerDecorator,


    ValidationOptions, ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({ name: "IsNotBlank", async: false })
export class IsNotBlankConstraint implements ValidatorConstraintInterface {
  public validate(value: string) {
    return typeof value === "string" && value.trim().length > 0;
  }

  public defaultMessage() {
    return `$property cannot be empty`;
  }
}

export function IsNotBlank(
  property?: string,
  validationOptions?: ValidationOptions
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: "IsNotBlank",
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsNotBlankConstraint,
    });
  };
}
