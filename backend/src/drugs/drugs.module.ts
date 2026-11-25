import { Module } from "@nestjs/common";
import { DrugsController } from "./drugs.controller";
import { DrugsService } from "./drugs.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [DrugsController],
  providers: [DrugsService],
  exports: [DrugsService],
})
export class DrugsModule {}