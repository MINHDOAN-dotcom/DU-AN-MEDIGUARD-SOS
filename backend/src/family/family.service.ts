import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FamilyService {
  constructor(private prisma: PrismaService) {}

  async create(ownerId: string, name: string) {
    const family = await this.prisma.familyProfile.create({
      data: { name, ownerId },
    });
    await this.prisma.familyMember.create({
      data: { familyId: family.id, userId: ownerId, relation: "owner", isGuardian: true },
    });
    return family;
  }

  async myFamilies(userId: string) {
    const memberships = await this.prisma.familyMember.findMany({
      where: { userId },
      include: { family: { include: { members: { include: { user: { select: { id: true, fullName: true, role: true, phone: true } } } } } } },
    });
    return memberships.map((m: any) => m.family);
  }

  async findOne(id: string) {
    const family = await this.prisma.familyProfile.findUnique({
      where: { id },
      include: { members: { include: { user: { select: { id: true, fullName: true, role: true, phone: true } } } } },
    });
    if (!family) throw new NotFoundException("Family not found");
    return family;
  }

  async addMember(familyId: string, dto: { userId: string; relation: string; isGuardian?: boolean }) {
    await this.findOne(familyId);
    return this.prisma.familyMember.create({
      data: { familyId, userId: dto.userId, relation: dto.relation, isGuardian: dto.isGuardian ?? false },
    });
  }

  async removeMember(familyId: string, userId: string) {
    await this.findOne(familyId);
    await this.prisma.familyMember.deleteMany({ where: { familyId, userId } });
    return { removed: true };
  }

  async joinByCode(userId: string, code: string) {
    const family = await this.prisma.familyProfile.findUnique({ where: { id: code } });
    if (!family) throw new NotFoundException("Invalid invite code");
    const existing = await this.prisma.familyMember.findUnique({
      where: { familyId_userId: { familyId: family.id, userId } },
    });
    if (existing) return family;
    await this.prisma.familyMember.create({
      data: { familyId: family.id, userId, relation: "member", isGuardian: false },
    });
    return family;
  }

  inviteLink(familyId: string) {
    return { code: familyId, link: `mediguard://family/join?code=${familyId}` };
  }
}