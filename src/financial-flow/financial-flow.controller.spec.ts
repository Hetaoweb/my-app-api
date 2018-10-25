import { Test, TestingModule } from '@nestjs/testing';
import { FinancialFlowController } from './financial-flow.controller';

describe('FinancialFlow Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [FinancialFlowController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: FinancialFlowController = module.get<FinancialFlowController>(FinancialFlowController);
    expect(controller).toBeDefined();
  });
});
