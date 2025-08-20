import { Controller, Post, Body, Res, Get, UseGuards, Req, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CreateGoogleUserDto } from '../users/dto/create-google-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const data: object = await this.authService.create(createUserDto)

    res.status(201).json({ sucsess: true, message: 'Successfull register', data })
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {
    // Google login page’ga redirect qiladi
  }

  @Get("google/redirect")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req) {
    const { email, firstName, avatarUri } = req.user;

    const dto: CreateGoogleUserDto = {
      email,
      firstName,
      avatarUri,
      provider: "google",
    };

    return this.authService.createByGoogleOAuth(dto);
  }
}
