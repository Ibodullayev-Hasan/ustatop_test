import { ConfigModuleOptions } from "@nestjs/config";
import dbConfigDev from "../db/configs/db.config.development"
import dbConfigPro from "../db/configs/db.config.production"

export const envConfig: ConfigModuleOptions = {
	load: [dbConfigPro, dbConfigDev],
	isGlobal: true,
	envFilePath: [`.env.${process.env.NODE_ENV}`]
}