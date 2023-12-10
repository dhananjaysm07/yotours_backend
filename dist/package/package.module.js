"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageGeneralModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const general_entity_1 = require("./entities/general.entity");
const package_service_1 = require("./package.service");
const package_resolver_1 = require("./package.resolver");
const highlight_entity_1 = require("./entities/highlight.entity");
const photo_entity_1 = require("./entities/photo.entity");
const itinerary_entity_1 = require("./entities/itinerary.entity");
const location_entity_1 = require("./entities/location.entity");
const destination_module_1 = require("../destination/destination.module");
const hotel_entity_1 = require("./entities/hotel.entity");
const sight_entity_1 = require("./entities/sight.entity");
const datedetails_entity_1 = require("./entities/datedetails.entity");
const travel_date_entity_1 = require("./entities/travel-date.entity");
const intercity_entity_1 = require("./entities/intercity.entity");
let PackageGeneralModule = class PackageGeneralModule {
};
PackageGeneralModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                general_entity_1.PackageGeneral,
                highlight_entity_1.Highlight,
                photo_entity_1.Photo,
                itinerary_entity_1.Itinerary,
                location_entity_1.LocationDetails,
                hotel_entity_1.HotelDetails,
                sight_entity_1.Sight,
                intercity_entity_1.InterCity,
                datedetails_entity_1.DateDetails,
                travel_date_entity_1.TravelDate,
            ]),
            destination_module_1.DestinationModule,
        ],
        providers: [package_service_1.PackageGeneralService, package_resolver_1.PackageGeneralResolver],
    })
], PackageGeneralModule);
exports.PackageGeneralModule = PackageGeneralModule;
//# sourceMappingURL=package.module.js.map