import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig, JwtConfig } from './configs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters';

import dbConfigDev from './db/configs/db.config.development'
import dbConfigProd from './db/configs/db.config.production';
// console.log(process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    JwtModule.registerAsync(JwtConfig),
    TypeOrmModule.forRootAsync({
      useFactory: async () => process.env.NODE_ENV === 'production' ? dbConfigProd() : dbConfigDev()
    }),


  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ],
  exports: [JwtModule]
})

export class AppModule { }

