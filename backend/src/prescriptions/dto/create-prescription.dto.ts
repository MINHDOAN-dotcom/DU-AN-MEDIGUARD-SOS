import { IsString, IsOptional } from "class-validator";

export class CreatePrescriptionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  doctorName?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}