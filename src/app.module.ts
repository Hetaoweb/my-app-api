import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeORM';
import { FinancialFlowModule } from './financial-flow/financial-flow.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '47.75.248.200',
      port: 3306,
      username: 'hetao',
      password: 'Hetao+123456',
      database: 'user',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    LoginModule,
    FinancialFlowModule,
  ],
  controllers: [AppController, LoginController],
  providers: [AppService, LoginService],
})
export class AppModule {
  // constructor(private readonly connection: Connection) {}
}
