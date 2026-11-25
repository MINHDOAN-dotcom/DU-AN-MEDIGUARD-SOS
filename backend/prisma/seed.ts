/// <reference types="node" />
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const drugs = [
  { name: "Paracetamol 500mg", activeIngredient: "Paracetamol", category: "Giảm đau - hạ sốt", defaultDosage: "500mg", maxPerDose: 2 },
  { name: "Ibuprofen 400mg", activeIngredient: "Ibuprofen", category: "Chống viêm - giảm đau", defaultDosage: "400mg", maxPerDose: 2 },
  { name: "Amoxicillin 500mg", activeIngredient: "Amoxicillin", category: "Kháng sinh", defaultDosage: "500mg", maxPerDose: 2 },
  { name: "Cephalexin 500mg", activeIngredient: "Cephalexin", category: "Kháng sinh", defaultDosage: "500mg", maxPerDose: 2 },
  { name: "Azithromycin 500mg", activeIngredient: "Azithromycin", category: "Kháng sinh", defaultDosage: "500mg", maxPerDose: 1 },
  { name: "Ciprofloxacin 500mg", activeIngredient: "Ciprofloxacin", category: "Kháng sinh", defaultDosage: "500mg", maxPerDose: 1 },
  { name: "Metronidazole 250mg", activeIngredient: "Metronidazole", category: "Kháng sinh", defaultDosage: "250mg", maxPerDose: 2 },
  { name: "Omeprazole 20mg", activeIngredient: "Omeprazole", category: "Dạ dày", defaultDosage: "20mg", maxPerDose: 1 },
  { name: "Pantoprazole 40mg", activeIngredient: "Pantoprazole", category: "Dạ dày", defaultDosage: "40mg", maxPerDose: 1 },
  { name: "Loratadine 10mg", activeIngredient: "Loratadine", category: "Dị ứng", defaultDosage: "10mg", maxPerDose: 1 },
  { name: "Cetirizine 10mg", activeIngredient: "Cetirizine", category: "Dị ứng", defaultDosage: "10mg", maxPerDose: 1 },
  { name: "Chlorpheniramine 4mg", activeIngredient: "Chlorpheniramine", category: "Dị ứng", defaultDosage: "4mg", maxPerDose: 2 },
  { name: "Salbutamol 2mg", activeIngredient: "Salbutamol", category: "Hô hấp", defaultDosage: "2mg", maxPerDose: 2 },
  { name: "Prednisolone 5mg", activeIngredient: "Prednisolone", category: "Corticoid", defaultDosage: "5mg", maxPerDose: 4 },
  { name: "Dexamethasone 0.5mg", activeIngredient: "Dexamethasone", category: "Corticoid", defaultDosage: "0.5mg", maxPerDose: 4 },
  { name: "Vitamin C 500mg", activeIngredient: "Acid Ascorbic", category: "Vitamin", defaultDosage: "500mg", maxPerDose: 2 },
  { name: "Vitamin B Complex", activeIngredient: "Vitamin B", category: "Vitamin", defaultDosage: "1 viên", maxPerDose: 1 },
  { name: "Calcium 500mg", activeIngredient: "Calcium Carbonate", category: "Khoáng chất", defaultDosage: "500mg", maxPerDose: 2 },
  { name: "Sắt (Iron) 65mg", activeIngredient: "Ferrous Sulfate", category: "Khoáng chất", defaultDosage: "65mg", maxPerDose: 1 },
  { name: "Acid Folic 5mg", activeIngredient: "Folic Acid", category: "Vitamin", defaultDosage: "5mg", maxPerDose: 1 },
  { name: "Metformin 500mg", activeIngredient: "Metformin", category: "Đái tháo đường", defaultDosage: "500mg", maxPerDose: 2 },
  { name: "Gliclazide 80mg", activeIngredient: "Gliclazide", category: "Đái tháo đường", defaultDosage: "80mg", maxPerDose: 2 },
  { name: "Amlodipine 5mg", activeIngredient: "Amlodipine", category: "Huyết áp", defaultDosage: "5mg", maxPerDose: 1 },
  { name: "Losartan 50mg", activeIngredient: "Losartan", category: "Huyết áp", defaultDosage: "50mg", maxPerDose: 1 },
  { name: "Atorvastatin 20mg", activeIngredient: "Atorvastatin", category: "Mỡ máu", defaultDosage: "20mg", maxPerDose: 1 },
  { name: "Aspirin 81mg", activeIngredient: "Acetylsalicylic Acid", category: "Tim mạch", defaultDosage: "81mg", maxPerDose: 2 },
  { name: "Clopidogrel 75mg", activeIngredient: "Clopidogrel", category: "Tim mạch", defaultDosage: "75mg", maxPerDose: 1 },
  { name: "Warfarin 5mg", activeIngredient: "Warfarin", category: "Chống đông", defaultDosage: "5mg", maxPerDose: 1 },
  { name: "Insulin Glargine", activeIngredient: "Insulin Glargine", category: "Đái tháo đường", defaultDosage: "10 đơn vị", maxPerDose: 1 },
  { name: "ORS (Oresol)", activeIngredient: "Oral Rehydration Salts", category: "Bù nước", defaultDosage: "1 gói", maxPerDose: 4 },
];

const interactions: { drugA: string; drugB: string; severity: string; description: string }[] = [
  { drugA: "Warfarin", drugB: "Acetylsalicylic Acid", severity: "HIGH", description: "Tăng nguy cơ chảy máu nghiêm trọng. Tránh dùng đồng thời." },
  { drugA: "Warfarin", drugB: "Ibuprofen", severity: "HIGH", description: "NSAID làm tăng nguy cơ chảy máu đường tiêu hóa." },
  { drugA: "Acetylsalicylic Acid", drugB: "Ibuprofen", severity: "MEDIUM", description: "Giảm tác dụng chống tiểu cầu của aspirin." },
  { drugA: "Omeprazole", drugB: "Clopidogrel", severity: "HIGH", description: "Omeprazole ức chế hoạt hóa clopidogrel, giảm hiệu quả." },
  { drugA: "Calcium Carbonate", drugB: "Ferrous Sulfate", severity: "MEDIUM", description: "Canxi làm giảm hấp thu sắt. Uống cách nhau >= 2 giờ." },
  { drugA: "Calcium Carbonate", drugB: "Levothyroxine", severity: "MEDIUM", description: "Canxi làm giảm hấp thu levothyroxine." },
  { drugA: "Metformin", drugB: "Alcohol", severity: "MEDIUM", description: "Tăng nguy cơ nhiễm toan lactic." },
  { drugA: "Ciprofloxacin", drugB: "Calcium Carbonate", severity: "MEDIUM", description: "Canxi làm giảm hấp thu ciprofloxacin." },
  { drugA: "Azithromycin", drugB: "Amoxicillin", severity: "LOW", description: "Không cần thiết dùng đồng thời hai kháng sinh." },
  { drugA: "Prednisolone", drugB: "Ibuprofen", severity: "HIGH", description: "Tăng nguy cơ loét dạ dày - xuất huyết." },
  { drugA: "Dexamethasone", drugB: "Ibuprofen", severity: "HIGH", description: "Tăng nguy cơ loét dạ dày." },
  { drugA: "Acetylsalicylic Acid", drugB: "Methotrexate", severity: "HIGH", description: "Tăng độc tính methotrexate." },
  { drugA: "Metronidazole", drugB: "Alcohol", severity: "HIGH", description: "Phản ứng disulfiram-like." },
  { drugA: "Paracetamol", drugB: "Warfarin", severity: "MEDIUM", description: "Dùng kéo dài có thể tăng INR." },
  { drugA: "Atorvastatin", drugB: "Clarithromycin", severity: "HIGH", description: "Tăng nguy cơ tiêu cơ vân." },
  { drugA: "Amlodipine", drugB: "Simvastatin", severity: "MEDIUM", description: "Tăng nồng độ statin." },
  { drugA: "Losartan", drugB: "Potassium", severity: "MEDIUM", description: "Tăng kali máu." },
  { drugA: "Insulin Glargine", drugB: "Beta-blocker", severity: "MEDIUM", description: "Che giấu triệu chứng hạ đường huyết." },
];

const vaccines = [
  { name: "BCG", disease: "Lao", recommendedAgeMonths: 0, doseNumber: 1, minIntervalDays: null, notes: "Tiêm lúc sinh" },
  { name: "Viêm gan B (mũi sinh)", disease: "Viêm gan B", recommendedAgeMonths: 0, doseNumber: 1, minIntervalDays: null, notes: "Trong 24h đầu" },
  { name: "DPT-VGB-Hib (mũi 1)", disease: "Bạch hầu - Ho gà - Uốn ván - Viêm gan B - Hib", recommendedAgeMonths: 2, doseNumber: 1, minIntervalDays: 28, notes: "" },
  { name: "DPT-VGB-Hib (mũi 2)", disease: "Bạch hầu - Ho gà - Uốn ván - Viêm gan B - Hib", recommendedAgeMonths: 3, doseNumber: 2, minIntervalDays: 28, notes: "" },
  { name: "DPT-VGB-Hib (mũi 3)", disease: "Bạch hầu - Ho gà - Uốn ván - Viêm gan B - Hib", recommendedAgeMonths: 4, doseNumber: 3, minIntervalDays: 28, notes: "" },
  { name: "OPV/IPV (mũi 1)", disease: "Bại liệt", recommendedAgeMonths: 2, doseNumber: 1, minIntervalDays: 28, notes: "" },
  { name: "OPV/IPV (mũi 2)", disease: "Bại liệt", recommendedAgeMonths: 3, doseNumber: 2, minIntervalDays: 28, notes: "" },
  { name: "OPV/IPV (mũi 3)", disease: "Bại liệt", recommendedAgeMonths: 4, doseNumber: 3, minIntervalDays: 28, notes: "" },
  { name: "PCV (mũi 1)", disease: "Phế cầu", recommendedAgeMonths: 2, doseNumber: 1, minIntervalDays: 56, notes: "" },
  { name: "PCV (mũi 2)", disease: "Phế cầu", recommendedAgeMonths: 4, doseNumber: 2, minIntervalDays: 56, notes: "" },
  { name: "Rotavirus (mũi 1)", disease: "Rotavirus", recommendedAgeMonths: 2, doseNumber: 1, minIntervalDays: 28, notes: "Uống" },
  { name: "Rotavirus (mũi 2)", disease: "Rotavirus", recommendedAgeMonths: 4, doseNumber: 2, minIntervalDays: 28, notes: "Uống" },
  { name: "Sởi - Rubella (mũi 1)", disease: "Sởi - Rubella", recommendedAgeMonths: 9, doseNumber: 1, minIntervalDays: null, notes: "" },
  { name: "Viêm não Nhật Bản (mũi 1)", disease: "Viêm não Nhật Bản", recommendedAgeMonths: 12, doseNumber: 1, minIntervalDays: 14, notes: "" },
  { name: "Viêm não Nhật Bản (mũi 2)", disease: "Viêm não Nhật Bản", recommendedAgeMonths: 15, doseNumber: 2, minIntervalDays: null, notes: "" },
  { name: "Thủy đậu (mũi 1)", disease: "Thủy đậu", recommendedAgeMonths: 12, doseNumber: 1, minIntervalDays: 90, notes: "" },
  { name: "Viêm gan A (mũi 1)", disease: "Viêm gan A", recommendedAgeMonths: 12, doseNumber: 1, minIntervalDays: 180, notes: "" },
  { name: "DPT (mũi 4 - nhắc)", disease: "Bạch hầu - Ho gà - Uốn ván", recommendedAgeMonths: 18, doseNumber: 4, minIntervalDays: null, notes: "" },
  { name: "Sởi - Rubella (mũi 2)", disease: "Sởi - Rubella", recommendedAgeMonths: 18, doseNumber: 2, minIntervalDays: null, notes: "" },
  { name: "DPT (mũi 5 - nhắc)", disease: "Bạch hầu - Ho gà - Uốn ván", recommendedAgeMonths: 60, doseNumber: 5, minIntervalDays: null, notes: "5 tuổi" },
];

async function main() {
  await prisma.scheduleLog.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.medicine.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.childVaccine.deleteMany();
  await prisma.vaccineTemplate.deleteMany();
  await prisma.drugInteraction.deleteMany();
  await prisma.drug.deleteMany();
  await prisma.familyMember.deleteMany();
  await prisma.familyProfile.deleteMany();
  await prisma.user.deleteMany();

  await prisma.drug.createMany({ data: drugs });

  await prisma.drugInteraction.createMany({
    data: interactions.map((it) => ({
      drugA: it.drugA,
      drugB: it.drugB,
      severity: it.severity,
      description: it.description,
    })),
  });

  await prisma.vaccineTemplate.createMany({ data: vaccines });

  const elderly = await prisma.user.create({
    data: { email: "elderly@mediguard.vn", passwordHash: "demo", fullName: "Nguyen Van A", role: "ELDERLY", phone: "0900000001" },
  });
  const caregiver = await prisma.user.create({
    data: { email: "caregiver@mediguard.vn", passwordHash: "demo", fullName: "Tran Thi B", role: "CAREGIVER", phone: "0900000002" },
  });
  const child = await prisma.user.create({
    data: { email: "child@mediguard.vn", passwordHash: "demo", fullName: "Nguyen Van C", role: "CHILD", phone: null },
  });

  const family = await prisma.familyProfile.create({
    data: { name: "Gia đình Nguyễn", ownerId: caregiver.id },
  });
  await prisma.familyMember.createMany({
    data: [
      { familyId: family.id, userId: caregiver.id, relation: "owner", isGuardian: true },
      { familyId: family.id, userId: elderly.id, relation: "father", isGuardian: false },
      { familyId: family.id, userId: child.id, relation: "son", isGuardian: false },
    ],
  });

  console.log("Seed completed");
  console.log("Drugs:", await prisma.drug.count());
  console.log("Interactions:", await prisma.drugInteraction.count());
  console.log("Vaccines:", await prisma.vaccineTemplate.count());
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });