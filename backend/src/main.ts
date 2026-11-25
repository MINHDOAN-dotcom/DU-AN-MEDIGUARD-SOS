import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
  );
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("MediGuard API")
    .setDescription("Family Healthcare & SOS API")
    .setVersion("0.1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const logger = new Logger("Bootstrap");
  if (!process.env.GEMINI_API_KEY) logger.warn("GEMINI_API_KEY is empty: OCR will run in DEMO/mock mode.");
  if (!process.env.TELEGRAM_BOT_TOKEN) logger.warn("TELEGRAM_BOT_TOKEN is empty: Telegram escalation disabled.");
  if (!process.env.FCM_SERVICE_ACCOUNT_JSON) logger.warn("FCM_SERVICE_ACCOUNT_JSON is empty: push notifications disabled.");
  if (process.env.DEMO_MODE === "true") logger.log("DEMO_MODE enabled: mock OCR + shortened escalation.");
  if (!process.env.REDIS_HOST) logger.warn("REDIS_HOST is empty: BullMQ/Redis features disabled.");

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`MediGuard backend listening on ${port}`);
  console.log(`Swagger docs: http://localhost:${port}/api/docs`);
}

bootstrap();