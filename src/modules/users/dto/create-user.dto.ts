import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, Matches } from "class-validator";
import { UserRole } from "src/common/enums";

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	firstName: string;

	@IsOptional()
	@IsString()
	lastName?: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsOptional()
	@IsString()
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,12}$/, {
		message: "Password must be 6-12 characters long, include at least one uppercase letter, one lowercase letter, and one number (e.g. A1234a)",
	})
	password?: string;

	@IsOptional()
	@IsUrl()
	avatarUri?: string;

	@IsOptional()
	@IsEnum(UserRole)
	role?: UserRole;

	@IsOptional()
	@IsString()
	expertise?: string;

	@IsOptional()
	@IsString()
	experience?: string;

	@IsOptional()
	@IsString()
	ordersHistory?: string;

	@IsOptional()
	@IsString({ each: true })
	favoritesMasters?: string[];
}
