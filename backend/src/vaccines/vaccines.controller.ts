import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from "@nestjs/common";
import { VaccinesService } from "./vaccines.service";
import { CreateChildVaccineDto } from "./dto/create-child-vaccine.dto";
import { UpdateChildVaccineDto } from "./dto/update-child-vaccine.dto";

@Controller("vaccines")
export class VaccinesController {
  constructor(private service: VaccinesService) {}

  @Get("templates")
  templates() {
    return this.service.listTemplates();
  }

  @Get()
  byChild(@Query("childId") childId: string) {
    return this.service.listByChild(childId);
  }

  @Post()
  create(@Body() dto: CreateChildVaccineDto) {
    return this.service.create(dto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateChildVaccineDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}