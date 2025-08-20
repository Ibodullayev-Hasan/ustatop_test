import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { TokenService } from 'src/common/services';
import * as bcryptjs from "bcryptjs"


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly tokenService: TokenService
  ) { }
  // register
  async create(createUserDto: CreateUserDto): Promise<{
    user: Omit<User, "password">,
    accToken: string,
    refToken: string,
  }> {
    try {

      const [user, hashedPassword] = await Promise.all([
        this.userRepo.findOne({ where: { email: createUserDto.email } }),
        bcryptjs.hash(createUserDto.password, 10)
      ])

      if (user) throw new ConflictException(`Bu email oldin ro'yxatdan o'tgan!`)

      createUserDto.password = hashedPassword

      const newUser = this.userRepo.create(createUserDto);

      const savedUser = await this.userRepo.save(newUser);
      const tokens = await this.tokenService.generator(savedUser);

      const { password, ...result } = savedUser;

      return { user: result, accToken: tokens.accToken, refToken: tokens.refToken }
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
