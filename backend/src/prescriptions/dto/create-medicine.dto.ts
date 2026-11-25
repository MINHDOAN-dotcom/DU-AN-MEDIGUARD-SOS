import { IsString, IsInt, IsOptional, Min } from "class-validator";

export class CreateMedicineDto {
  @IsOptional()
  @IsString()
  drugId?: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  activeIngredient?: string;

  @IsOptional()
  @IsString()
  dosage?: string;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantityPerDose?: number;

  @IsOptional()
  @IsString()
  frequency?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}