import { Injectable } from '@nestjs/common';
import { EntityManager, getConnection } from 'typeorm';
import { FinancialFlow } from 'entity/financialFlow.entity';

@Injectable()
export class FinancialFlowService {
  constructor(private readonly entityManager: EntityManager) {}

  async getFinancialFlow(date: string) {
    const financialFlow = this.entityManager.getRepository(FinancialFlow);
    return await financialFlow.query(
      `SELECT
      id,
      type_id,
      (case type_id
        when 1 then '收入'
        when 0 then '支出'
        else '未知状态' end) as type_name,
      type_icon,
      money,
      DATE_FORMAT(update_date, '%Y-%m-%d %T') as update_date,
      CONCAT(
        DATE_FORMAT(create_date, '%Y年%m月%d日 '),
        case DAYOFWEEK(create_date)
        when 1 then '星期天'
        when 2 then '星期一'
        when 3 then '星期二'
        when 4 then '星期三'
        when 5 then '星期四'
        when 6 then '星期五'
        when 7 then '星期六'
        else '信息错误' end) as create_date
      FROM financial_flow
      WHERE create_date>"${date}-00" and create_date<"${date}-31"`);
  }

  async setFinancialFlow(data) {
    return await getConnection()
      .createQueryBuilder()
        .insert()
          .into(FinancialFlow)
            .values(data)
              .execute();
  }

  async getTotalMoney(date) {
    return await this.entityManager
      .query(`select
              ifnull(sum(money), 0) as totalMoney
              FROM financial_flow
              WHERE create_date>"${date}-00" and create_date<"${date}-31" and type_id = 0`);
  }

  async editTFinancialFlow(data) {
    return await getConnection()
      .createQueryBuilder()
        .update(FinancialFlow)
          .set(data)
            .where('id = :id', { id: data.id})
              .execute();
  }

  async inquireFiancialFlow(ids: number) {
    return await this.entityManager.getRepository(FinancialFlow).find({where: {id: ids}});
  }
}
