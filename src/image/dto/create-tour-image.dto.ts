// CreateImage.dto.ts
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTourImageDTO {
  @IsNotEmpty()
  @IsString()
  imageUrl: string; // The URL of the image

  @IsNotEmpty()
  @IsUUID()
  tourId: string; // The UUID of the associated tour
}

