import { IsString, IsBoolean, IsOptional } from "class-validator";

export class AddMemberDto {
  @IsString()
  userId: string;

  @IsString()
  relation: string;

  @IsOptional()
  @IsBoolean()
  isGuardian?: boolean;
}