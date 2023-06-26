import { IsNumber, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../pagination.dto";

export class FilterProductDto extends PaginationDto {
  @IsOptional()
  @IsString(isStringValidationOption())
  readonly title: string;


}