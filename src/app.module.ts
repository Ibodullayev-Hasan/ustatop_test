import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig, JwtConfig } from './configs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

import dbConfigDev from './db/configs/db.config.development'
import dbConfigProd from './db/configs/db.config.production';

@Module({
  imports: [

    // configurations
    ConfigModule.forRoot(envConfig),
    JwtModule.registerAsync(JwtConfig),
    TypeOrmModule.forRootAsync({
      useFactory: async () => process.env.NODE_ENV === 'production' ? dbConfigProd() : dbConfigDev()
    }),

    // modules
    UsersModule,
    AuthModule
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

