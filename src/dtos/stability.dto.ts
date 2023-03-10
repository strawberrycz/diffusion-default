import { IsString } from 'class-validator';

export class StabilityDto {
  @IsString()
  public text: string;
}
