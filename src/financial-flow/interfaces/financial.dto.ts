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
  @Min(0.00000001, {
      message: 'money 不能小于0.00000001',
  })
  @IsNumber()
  readonly money: number;
}