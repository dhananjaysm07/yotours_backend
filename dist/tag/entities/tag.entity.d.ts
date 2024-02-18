import { Attraction } from "src/attraction-ticket/entities/attraction.entity";
import { Car } from "src/car/entities/car.entity";
import { Destination } from "src/destination/entities/destination.entity";
import { Thing } from "src/thing/entities/thing.entity";
import { Tour } from "src/tour/entities/tour.entity";
export declare class Tag {
    id: string;
    name: string;
    active: boolean;
    tours: Tour[];
    attractions: Attraction[];
    things: Thing[];
    cars: Car[];
    destinations: Destination[];
}
