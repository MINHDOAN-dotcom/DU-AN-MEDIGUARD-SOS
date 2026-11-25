import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import Fuse from "fuse.js";

@Injectable()
export class DrugsService {
  constructor(private prisma: PrismaService) {}

  async findAll(q?: string) {
    const drugs = await this.prisma.drug.findMany();
    if (!q || !q.trim()) return drugs;
    const fuse = new Fuse(drugs, {
      keys: ["name", "activeIngredient", "category"],
      threshold: 0.4,
      ignoreLocation: true,
    });
    return fuse.search(q.trim()).map((r) => r.item);
  }

  async findById(id: string) {
    return this.prisma.drug.findUnique({ where: { id } });
  }

  async create(data: { name: string; activeIngredient: string; category?: string; defaultDosage?: string; maxPerDose?: number; imageUrl?: string }) {
    return this.prisma.drug.create({ data });
  }
}