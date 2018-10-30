import { IsString, IsFQDN, MinLength, Min, IsNumber } from 'class-validator';

export class FinancialDto {
  readonly create_date: string;
}

export class SetFinanciaDto {
  @MinLength(1, {
    message: 'type_icon 不能为空',
  })
  readonly type_icon: string;

  @IsNumber()
  readonly type_id: number;

  @IsNumber()
  @Min(0.01, {
      message: 'money 不能小于0.01',
  })

  @IsNumber()
  readonly money: number;
}

export class EidtFinanciaDot {
  @Min(0, {
    message: 'id 不能为空',
  })
  readonly id: number;

  readonly money: number;

  readonly type_id: number;

  readonly type_icon: string;
}