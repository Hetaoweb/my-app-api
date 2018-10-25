import { Module } from '@nestjs/common';
import { FinancialFlowService } from './financial-flow.service';
import { FinancialFlowController } from './financial-flow.controller';

@Module({
  providers: [FinancialFlowService],
  controllers: [FinancialFlowController],
})
export class FinancialFlowModule {}
