import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PrescriptionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: any) {
    return this.prisma.prescription.create({
      data: { userId, title: dto.title, doctorName: dto.doctorName, imageUrl: dto.imageUrl, status: "DRAFT" },
      include: { medicines: true },
    });
  }

  async findAll(userId?: string) {
    return this.prisma.prescription.findMany({
      where: userId ? { userId } : undefined,
      include: { medicines: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const p = await this.prisma.prescription.findUnique({ where: { id }, include: { medicines: true } });
    if (!p) throw new NotFoundException("Prescription not found");
    return p;
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    return this.prisma.prescription.update({
      where: { id },
      data: {
        title: dto.title,
        doctorName: dto.doctorName,
        imageUrl: dto.imageUrl,
        status: dto.status,
      },
      include: { medicines: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.prescription.delete({ where: { id } });
    return { removed: true };
  }

  async addMedicine(prescriptionId: string, dto: any) {
    await this.findOne(prescriptionId);
    return this.prisma.medicine.create({
      data: {
        prescriptionId,
        drugId: dto.drugId,
        name: dto.name,
        activeIngredient: dto.activeIngredient,
        dosage: dto.dosage,
        unit: dto.unit,
        quantityPerDose: dto.quantityPerDose,
        frequency: dto.frequency,
        notes: dto.notes,
      },
    });
  }

  async removeMedicine(medicineId: string) {
    await this.prisma.medicine.delete({ where: { id: medicineId } });
    return { removed: true };
  }

  async listMedicines(prescriptionId: string) {
    return this.prisma.medicine.findMany({ where: { prescriptionId } });
  }
}