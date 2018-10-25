import { Controller, Get, Query, UseGuards, Put, Res, Body, UsePipes, HttpStatus } from '@nestjs/common';
import { FinancialFlowService } from './financial-flow.service';
import { FinancialDto, SetFinanciaDto } from './interfaces/financial.dto';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from 'validation/validation.pipe';

@Controller('financial-flow')
export class FinancialFlowController {
  constructor(private readonly financiaFlowService: FinancialFlowService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getFinancial(@Query() QueryResponse: FinancialDto, @Res() response) {
    this.financiaFlowService.getFinancialFlow(QueryResponse.create_date).then(res => {
      this.financiaFlowService.getTotalMoney(QueryResponse.create_date).then(data => {
        response.status(HttpStatus.OK).json({
          status: 'success',
          totalMoney: data[0].totalMoney,
          data: res,
        });
      });
    });
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  addFinancial(@Res() response, @Body() BodyResponse: SetFinanciaDto) {
    const { type_id, type_icon, money  } = {...BodyResponse};
    this.financiaFlowService.setFinancialFlow({ type_id, type_icon, money}).then(res => {
      response.status(HttpStatus.OK).json({
        status: 'success',
        tips: '添加成功',
      });
    });
  }
}
