import { INestApplication } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

export const corsConfig = (app: INestApplication) => {
	app.enableCors({
		credentials: true,
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
	})

	app.use(cookieParser())
}