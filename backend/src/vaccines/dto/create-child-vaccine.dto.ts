import { IsString, IsOptional, IsDateString } from "class-validator";

export class CreateChildVaccineDto {
  @IsString()
  childId: string;

  @IsOptional()
  @IsString()
  templateId?: string;

  @IsString()
  vaccineName: string;

  @IsDateString()
  scheduledDate: string;

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