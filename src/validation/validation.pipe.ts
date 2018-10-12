import { Injectable, PipeTransform, ArgumentMetadata, HttpStatus, HttpException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, { metatype }: ArgumentMetadata) {

    const object = plainToClass(metatype, value);

    const errors = await validate(object);

    const tipsData = [];

    let tipsText = '';

    if (!metatype || !this.toValidate(metatype) || !errors.length) {
      return value;
    }

    errors.forEach(res => {
      tipsData.push(res.constraints);
    });
    for (const key in errors[0].constraints) {
      if (errors[0].constraints.hasOwnProperty(key)) {
        tipsText = errors[0].constraints[key];
      }
    }

    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      tips: tipsText,
      data: tipsData,
    }, 403);
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}