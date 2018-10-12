import { Controller, Res, Body, Post, UsePipes } from '@nestjs/common';
import { AppService } from 'app.service';
import { CreateLoginDto } from './login.dto';
import { ValidationPipe } from 'validation/validation.pipe';

@Controller('login')
export class LoginController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UsePipes(ValidationPipe)
  goLogin(@Res() ResData, @Body() BodyData: CreateLoginDto) {
    const change = (err, res) => {
      if (res[0].password !== BodyData.password) {
        ResData.status(400).json({
          status: 400,
          type: 'error',
          tips: '密码错误！',
        });
        return;
      }
      ResData.status(200).json({
        status: 200,
        type: 'success',
        data: res,
      });
    };
    this.appService.handleMysql(`SELECT * from user WHERE email="${BodyData.email}"`, change);
  }
}
