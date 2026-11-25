import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BullModule } from "@nestjs/bullmq";
import { APP_GUARD } from "@nestjs/core";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { FamilyModule } from "./family/family.module";
import { DrugsModule } from "./drugs/drugs.module";
import { PrescriptionsModule } from "./prescriptions/prescriptions.module";
import { VaccinesModule } from "./vaccines/vaccines.module";
import { InteractionsModule } from "./interactions/interactions.module";
import { JwtAuthGuard } from "./common/guards/jwt-auth.guard";
import { RolesGuard } from "./common/guards/roles.guard";

const redisImports = process.env.REDIS_HOST
  ? [
      BullModule.forRootAsync({
        useFactory: () => ({
          connection: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT) || 6379,
            username: process.env.REDIS_USERNAME || "default",
            password: process.env.REDIS_PASSWORD || undefined,
          },
        }),
      }),
    ]
  : [];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ...redisImports,
    PrismaModule,
    AuthModule,
    UsersModule,
    FamilyModule,
    DrugsModule,
    PrescriptionsModule,
    VaccinesModule,
    InteractionsModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}