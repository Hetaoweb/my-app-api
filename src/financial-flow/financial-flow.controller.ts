import { Controller, Get, Query, UseGuards, Put, Res, Body, UsePipes, HttpStatus, Post } from '@nestjs/common';
import { FinancialFlowService } from './financial-flow.service';
import { FinancialDto, SetFinanciaDto, EidtFinanciaDot } from './interfaces/financial.dto';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from 'validation/validation.pipe';

@Controller('financial-flow')
export class FinancialFlowController {
  constructor(private readonly financiaFlowService: FinancialFlowService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getFinancial(@Query() QueryResponse: FinancialDto, @Res() response) {
    this.financiaFlowService
          .getFinancialFlow(QueryResponse.create_date)
            .then(res => {
              this.financiaFlowService
                .getTotalMoney(QueryResponse.create_date)
                  .then(data => {
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
    const { type_id, type_icon, money  } = BodyResponse;
    this.financiaFlowService
      .setFinancialFlow({ type_id, type_icon, money})
        .then(res => {
          response.status(HttpStatus.OK).json({
            status: 'success',
            tips: '添加成功',
          });
        });
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  editFinancial(@Body() bodyResponse: EidtFinanciaDot, @Res() response) {
    const { id, money, type_icon, type_id } = bodyResponse;
    this.financiaFlowService.inquireFiancialFlow(bodyResponse.id).then(res => {
      if (!res.length) {
        response.status(HttpStatus.OK).json({
          status: 'error',
          tips: '此记录不存在!',
        });
        return;
      }
      this.financiaFlowService.editTFinancialFlow({ id, money, type_icon, type_id }).then(() => {
        response.status(HttpStatus.OK).json({
          status: 'success',
          tips: '修改成功!',
        });
      });
    });
  }
}
