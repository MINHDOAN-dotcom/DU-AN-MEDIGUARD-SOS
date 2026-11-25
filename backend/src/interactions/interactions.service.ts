import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { InteractionChecker } from "./interaction-checker";

@Injectable()
export class InteractionsService {
  constructor(private prisma: PrismaService) {}

  async analyze(medicines: { name?: string; activeIngredient?: string; quantityPerDose?: number | null }[]) {
    // Resolve active ingredients: use provided or look up drug by name
    const resolved: string[] = [];
    for (const m of medicines) {
      let ing = m.activeIngredient;
      if (!ing && m.name) {
        const drug = await this.prisma.drug.findFirst({
          where: { name: { equals: m.name } },
        });
        ing = drug?.activeIngredient;
      }
      resolved.push(ing || m.name || "");
    }

    const duplicates = InteractionChecker.findDuplicates(resolved);

    const records = await this.prisma.drugInteraction.findMany();
    const interactions = InteractionChecker.findInteractions(resolved, records);

    const highDoseIndices = InteractionChecker.highDoseWarnings(
      medicines.map((m) => m.quantityPerDose),
    );

    return {
      ingredients: resolved,
      duplicates,
      interactions,
      highDoseIndices,
      hasWarnings: duplicates.length > 0 || interactions.length > 0 || highDoseIndices.length > 0,
    };
  }

  async checkIngredients(ingredients: string[]) {
    const records = await this.prisma.drugInteraction.findMany();
    const interactions = InteractionChecker.findInteractions(ingredients, records);
    const duplicates = InteractionChecker.findDuplicates(ingredients);
    return { duplicates, interactions, hasWarnings: duplicates.length > 0 || interactions.length > 0 };
  }
}