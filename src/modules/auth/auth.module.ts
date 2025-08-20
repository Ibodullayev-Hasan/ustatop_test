import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TokenService } from 'src/common/services';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    PassportModule.register({ session: false }),
    forwardRef(() => UsersModule)
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService,GoogleStrategy],
  exports: [AuthService]
})
export class AuthModule { }
