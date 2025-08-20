import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TokenService } from 'src/common/services';

@Module({
  imports: [
    forwardRef(() => UsersModule)
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
  exports: [AuthService]
})
export class AuthModule { }
