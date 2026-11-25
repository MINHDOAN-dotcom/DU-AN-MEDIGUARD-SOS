import { IsString, IsOptional, IsDateString } from "class-validator";

export class UpdateChildVaccineDto {
  @IsOptional()
  @IsDateString()
  scheduledDate?: string;

  @IsOptional()
  @IsDateString()
  administeredDate?: string;

  @IsOptional()
  @IsString()
  lotNumber?: string;

  @IsOptional()
  @IsString()
  reactionNote?: string;

  @IsOptional()
  @IsString()
  status?: string;
}