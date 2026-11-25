import { Controller, Get, Post, Query, Param, Body } from "@nestjs/common";
import { DrugsService } from "./drugs.service";

@Controller("drugs")
export class DrugsController {
  constructor(private drugs: DrugsService) {}

  @Get()
  findAll(@Query("q") q?: string) {
    return this.drugs.findAll(q);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.drugs.findById(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.drugs.create(body);
  }
}