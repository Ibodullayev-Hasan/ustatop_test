import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as CryptoJS from 'crypto-js';
import { User } from "src/modules/users/entities/user.entity";

@Injectable()
export class TokenService {
	private jwtSecretKey: string;
	private aesKey: string;
	private accessTime: string;
	private refreshTime: string;

	constructor(private readonly jwtService: JwtService) {
		this.jwtSecretKey = process.env.JWT_SECRET || '';
		this.aesKey = process.env.AES_KEY || '';
		this.accessTime = process.env.ACCESS_TOKEN_TIME || '15m';
		this.refreshTime = process.env.REFRESH_TOKEN_TIME || '7d';
	}

	async generator(user: User)
		: Promise<{
			accToken: string,
			accessExpiresIn: string,
			refToken: string,
			refreshExpiresIn: string
		}> {
		try {
			if (!this.jwtSecretKey || !this.aesKey) {
				throw new HttpException('Missing secret keys', HttpStatus.INTERNAL_SERVER_ERROR);
			}

			const payload = { sub: user.id, email: user.email };

			const [accToken, refToken] = await Promise.all([
				this.jwtService.signAsync(payload, { secret: this.jwtSecretKey, expiresIn: this.accessTime, algorithm: "HS512" }),
				this.jwtService.signAsync(payload, { secret: this.jwtSecretKey, expiresIn: this.refreshTime, algorithm: "HS512" }),
			]);

			// JWT'ni AES-256 bilan shifrlash (string formatga o'tkazish)
			const encryptedAccToken = CryptoJS.AES.encrypt(accToken, this.aesKey).toString();
			const encryptedRefToken = CryptoJS.AES.encrypt(refToken, this.aesKey).toString();

			return {
				accToken: encryptedAccToken,
				accessExpiresIn: this.accessTime,
				refToken: encryptedRefToken,
				refreshExpiresIn: this.refreshTime
			};
		} catch (error: any) {
			throw error instanceof HttpException
				? error
				: new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
