import { Controller, Get, Post, Patch, Delete, Body, Param, Request, Query } from "@nestjs/common";
import { PrescriptionsService } from "./prescriptions.service";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { CreateMedicineDto } from "./dto/create-medicine.dto";

@Controller("prescriptions")
export class PrescriptionsController {
  constructor(private service: PrescriptionsService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreatePrescriptionDto) {
    return this.service.create(req.user.id, dto);
  }

  @Get()
  findAll(@Request() req: any, @Query("userId") userId?: string) {
    return this.service.findAll(userId || req.user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdatePrescriptionDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }

  @Post(":id/medicines")
  addMedicine(@Param("id") id: string, @Body() dto: CreateMedicineDto) {
    return this.service.addMedicine(id, dto);
  }

  @Get(":id/medicines")
  listMedicines(@Param("id") id: string) {
    return this.service.listMedicines(id);
  }

  @Delete("medicines/:medicineId")
  removeMedicine(@Param("medicineId") medicineId: string) {
    return this.service.removeMedicine(medicineId);
  }
}