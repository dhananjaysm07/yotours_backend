import { HighlightInput } from "./highlight.input";
import { PhotoInput } from "./photo.input";
export declare class CreatePackageGeneralInput {
  title: string;
  type: string;
  summary: string;
  currentStep: number;
  destinationIds: string[];
  highlights: HighlightInput[];
  photos: PhotoInput[];
  createdAt: Date;
  updatedAt: Date;
}
