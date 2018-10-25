import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeORM';
import { User } from 'entity/login.entity';
import { FinancialFlow } from 'entity/financialFlow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, FinancialFlow]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 360000,
      },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy],
})
export class LoginModule {}
