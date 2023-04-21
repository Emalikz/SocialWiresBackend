import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from './services/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/User.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports:[
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: "1d"}
    }),
  ],
  controllers: [AuthController],
  providers: [UserService],
  exports:[UserService],
})
export class AuthModule {}
 