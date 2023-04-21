import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from 'src/common/helper/env.helper';
const envFilePath: string = getEnvPath(`${__dirname}/../common/envs`);
import { TypeOrmConfigService } from 'src/common/db/typeorm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from 'src/messages/messages.module';
@Module({
  imports: [
    AuthModule,
    MessagesModule,
    ConfigModule.forRoot({ envFilePath, isGlobal:true}),
    TypeOrmModule.forRootAsync({useClass:TypeOrmConfigService})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
