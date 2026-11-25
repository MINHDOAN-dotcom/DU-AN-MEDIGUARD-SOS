export interface InteractionRecord {
  drugA: string;
  drugB: string;
  severity: string;
  description: string;
}

export interface DuplicateResult {
  ingredient: string;
  indices: number[];
}

export class InteractionChecker {
  static normalize(value?: string | null): string {
    return (value || "").trim().toLowerCase();
  }

  static findDuplicates(ingredients: string[]): DuplicateResult[] {
    const map = new Map<string, number[]>();
    ingredients.forEach((ing, idx) => {
      const key = this.normalize(ing);
      if (!key) return;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(idx);
    });
    const result: DuplicateResult[] = [];
    for (const [ingredient, indices] of map.entries()) {
      if (indices.length > 1) result.push({ ingredient, indices });
    }
    return result;
  }

  static findInteractions(ingredients: string[], records: InteractionRecord[]): InteractionRecord[] {
    const set = new Set(ingredients.map((i) => this.normalize(i)).filter(Boolean));
    return records.filter((r) => {
      const a = this.normalize(r.drugA);
      const b = this.normalize(r.drugB);
      return set.has(a) && set.has(b);
    });
  }

  static highDoseWarnings(quantities: (number | null | undefined)[]): number[] {
    const out: number[] = [];
    quantities.forEach((q, idx) => {
      if (q != null && q > 5) out.push(idx);
    });
    return out;
  }
}