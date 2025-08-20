import { registerAs } from "@nestjs/config";
import * as path from "path";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export default registerAs(
	'dbconfig.dev',
	(): PostgresConnectionOptions => ({
		type: 'postgres',
		url: process.env.DATABASE_URL as string,
		entities: [path.join(__dirname, '../../**/*.entity{.ts,.js}')],
		synchronize: process.env.DATABASE_SYNCHRONIZE as unknown as boolean,
		logging: false,
	}),
);
