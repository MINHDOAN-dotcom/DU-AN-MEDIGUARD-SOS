import { InteractionChecker } from "./interaction-checker";

describe("InteractionChecker", () => {
  it("detects duplicate active ingredients", () => {
    const res = InteractionChecker.findDuplicates(["Paracetamol", "Ibuprofen", "Paracetamol"]);
    expect(res).toHaveLength(1);
    expect(res[0].ingredient).toBe("paracetamol");
    expect(res[0].indices).toEqual([0, 2]);
  });

  it("returns no duplicates when all unique", () => {
    const res = InteractionChecker.findDuplicates(["A", "B", "C"]);
    expect(res).toHaveLength(0);
  });

  it("finds interactions among ingredients", () => {
    const records = [
      { drugA: "Warfarin", drugB: "Ibuprofen", severity: "HIGH", description: "bleed" },
      { drugA: "X", drugB: "Y", severity: "LOW", description: "none" },
    ];
    const res = InteractionChecker.findInteractions(["Warfarin", "Ibuprofen"], records);
    expect(res).toHaveLength(1);
    expect(res[0].severity).toBe("HIGH");
  });

  it("normalizes case for interactions", () => {
    const records = [{ drugA: "warfarin", drugB: "ibuprofen", severity: "HIGH", description: "d" }];
    const res = InteractionChecker.findInteractions(["WARFARIN", "Ibuprofen"], records);
    expect(res).toHaveLength(1);
  });

  it("flags high dose > 5", () => {
    const res = InteractionChecker.highDoseWarnings([2, 6, 1, 10]);
    expect(res).toEqual([1, 3]);
  });

  it("ignores null/empty ingredients", () => {
    const res = InteractionChecker.findDuplicates(["", null as any, "  "]);
    expect(res).toHaveLength(0);
  });
});