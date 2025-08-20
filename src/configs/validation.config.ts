import { BadRequestException, INestApplication, ValidationPipe } from "@nestjs/common";

export const setupGlobalPipes = (app: INestApplication) => {
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true,
		exceptionFactory: (errors) => {
			const messages = errors.flatMap(error =>
				Object.values(error.constraints || {})
			);
			return new BadRequestException(messages);
		},
	}))
}