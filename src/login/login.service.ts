import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { EntityManager } from 'typeORM';
import { User } from 'entity/login.entity';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: EntityManager,
  ) { }

  async createToken(ids: number) {
    const user: JwtPayload = { vip_id: ids };
    const accessToken = this.jwtService.sign(user);
    return accessToken;
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return {};
  }

  async findAll(name: string): Promise<any> {
    const userRepository = this.userRepository.getRepository(User);
    return await userRepository.find({ where: { email: name } });
  }
}
