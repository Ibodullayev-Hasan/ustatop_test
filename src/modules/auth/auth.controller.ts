import { Controller, Post, Body, Res,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
	async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
		const data: object = await this.authService.create(createUserDto)

		res.status(201).json({ sucsess: true, message: 'Successfull register', data })
	}
}
