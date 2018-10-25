import { Controller, Res, Body, Post, UsePipes, HttpException, HttpStatus } from '@nestjs/common';
import { ValidationPipe } from 'validation/validation.pipe';
import { LoginService } from './login.service';
import { getManager, MongoEntityManager, Connection } from 'typeorm';
import { CreateLoginDto } from './interfaces/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService, private readonly connection: Connection) { }

  @Post()
  @UsePipes(ValidationPipe)
  async getToken(@Res() Response, @Body() BodyData: CreateLoginDto): Promise<any> {
    this.loginService.findAll(BodyData.email).then(res => {
      const response_data = res;
      if (!response_data.length && response_data.email) {
        Response.status(403).json(
          {
            type: 'error',
            tips: '邮箱输入错误，请重新输入！',
          },
        );
        return;
      } else if (BodyData.password !== response_data[0].password) {
        Response.status(403).json(
          {
            type: 'error',
            tips: '密码错误，请重新输入！',
          },
        );
        return;
      }
      this.loginService.createToken(res[0].vip_id).then((data) => {
        Response.status(HttpStatus.OK).json(
          {
            type: 'success',
            tips: '登陆成功',
            token: data,
          },
        );
      });
    });
  }
}
