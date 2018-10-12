import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { createPool, createConnection, MysqlError, PoolConnection } from 'mysql';

const config = {
  host: '47.75.248.200',
  user: 'hetao',
  password: 'Hetao+123456',
  database: 'user',
};

// const crateMysql = createConnection(config);
const Pool = createPool(config);
// crateMysql.connect();
@Injectable()
export class AppService {
  handleMysql(sqlCode: string, change) {
    Pool.getConnection((err: MysqlError, connection: PoolConnection) => {
      Pool.query(sqlCode, (errs: MysqlError, rows: PoolConnection) => {
        if (errs) {
          this.errorTips();
        }
        change(err, rows);
        connection.release();
      });
    });
  }

  errorTips() {
    throw new HttpException({
      status: 500,
      tips: '数据库报错',
    }, 500);
  }
}
