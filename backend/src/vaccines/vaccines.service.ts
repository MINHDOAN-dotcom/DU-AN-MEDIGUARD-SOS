import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class VaccinesService {
  constructor(private prisma: PrismaService) {}

  async listTemplates() {
    return this.prisma.vaccineTemplate.findMany({ orderBy: { recommendedAgeMonths: "asc" } });
  }

  async listByChild(childId: string) {
    return this.prisma.childVaccine.findMany({
      where: { childId },
      include: { template: true },
      orderBy: { scheduledDate: "asc" },
    });
  }

  async create(dto: any) {
    return this.prisma.childVaccine.create({
      data: {
        childId: dto.childId,
        templateId: dto.templateId,
        vaccineName: dto.vaccineName,
        scheduledDate: new Date(dto.scheduledDate),
        administeredDate: dto.administeredDate ? new Date(dto.administeredDate) : null,
        lotNumber: dto.lotNumber,
        reactionNote: dto.reactionNote,
        status: dto.status || "PENDING",
      },
    });
  }

  async update(id: string, dto: any) {
    const existing = await this.prisma.childVaccine.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("Vaccine record not found");
    return this.prisma.childVaccine.update({
      where: { id },
      data: {
        scheduledDate: dto.scheduledDate ? new Date(dto.scheduledDate) : undefined,
        administeredDate: dto.administeredDate ? new Date(dto.administeredDate) : undefined,
        lotNumber: dto.lotNumber,
        reactionNote: dto.reactionNote,
        status: dto.status,
      },
    });
  }

  async remove(id: string) {
    await this.prisma.childVaccine.delete({ where: { id } });
    return { removed: true };
  }
}