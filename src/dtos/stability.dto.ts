import { IsNumber, IsOptional, IsString } from 'class-validator';

export class StabilityDto {
  @IsString()
  public text: string;

  @IsOptional()
  @IsNumber()
  public width?: number;

  @IsOptional()
  @IsNumber()
  public height?: number;
}
