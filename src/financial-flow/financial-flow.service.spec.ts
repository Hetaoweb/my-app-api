import { Test, TestingModule } from '@nestjs/testing';
import { FinancialFlowService } from './financial-flow.service';

describe('FinancialFlowService', () => {
  let service: FinancialFlowService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancialFlowService],
    }).compile();
    service = module.get<FinancialFlowService>(FinancialFlowService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
