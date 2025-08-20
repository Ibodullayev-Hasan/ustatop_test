import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setUpswagger(app: INestApplication) {
	const options = new DocumentBuilder()
		.setTitle(`Usta top`)
		.setDescription(`Bu "Usta top" loyihasi uchun API dokumenti`)
		.setVersion('1.0')
		.build()

	const dokument = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('api/docs', app, dokument)
}