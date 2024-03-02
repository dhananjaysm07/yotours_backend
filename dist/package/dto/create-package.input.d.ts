import { HighlightInput } from "./highlight.input";
import { PhotoInput } from "./photo.input";
import { DateDetailsInput } from "./date.input";
export declare class CreatePackageGeneralInput {
    id?: string;
    title: string;
    type: string;
    summary: string;
    currentStep: number;
    inclusion: string[];
    exclusion: string[];
    dates: DateDetailsInput[];
    destinationIds: string[];
    highlights: HighlightInput[];
    photos: PhotoInput[];
}
