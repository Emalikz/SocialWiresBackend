import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(this.config.get("POSTGRES_NAME"))
    return {
      type: 'postgres',
      host: this.config.get("POSTGRES_HOST"),
      port: this.config.get("POSTGRES_PORT"),
      database: this.config.get("DATABASE_NAME"),
      username: this.config.get("POSTGRES_NAME"),
      password: this.config.get("POSTGRES_PASSWORD"),
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: true, // never use TRUE in production!
    };
  }
}