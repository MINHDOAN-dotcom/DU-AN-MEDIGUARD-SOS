import { Controller, Get, Post, Delete, Body, Param, Request } from "@nestjs/common";
import { FamilyService } from "./family.service";
import { CreateFamilyDto } from "./dto/create-family.dto";
import { AddMemberDto } from "./dto/add-member.dto";
import { JoinFamilyDto } from "./dto/join-family.dto";

@Controller("family")
export class FamilyController {
  constructor(private family: FamilyService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateFamilyDto) {
    return this.family.create(req.user.id, dto.name);
  }

  @Get("my")
  my(@Request() req: any) {
    return this.family.myFamilies(req.user.id);
  }

  @Post("join")
  join(@Request() req: any, @Body() dto: JoinFamilyDto) {
    return this.family.joinByCode(req.user.id, dto.code);
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.family.findOne(id);
  }

  @Post(":id/members")
  addMember(@Param("id") id: string, @Body() dto: AddMemberDto) {
    return this.family.addMember(id, dto);
  }

  @Delete(":id/members/:userId")
  removeMember(@Param("id") id: string, @Param("userId") userId: string) {
    return this.family.removeMember(id, userId);
  }

  @Get(":id/invite")
  invite(@Param("id") id: string) {
    return this.family.inviteLink(id);
  }
}