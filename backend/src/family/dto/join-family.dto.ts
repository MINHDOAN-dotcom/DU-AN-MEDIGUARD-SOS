import { IsString } from "class-validator";

export class JoinFamilyDto {
  @IsString()
  code: string;
}