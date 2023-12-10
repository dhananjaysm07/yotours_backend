"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttractionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const destination_module_1 = require("../destination/destination.module");
const attraction_entity_1 = require("./entities/attraction.entity");
const attraction_service_1 = require("./attraction.service");
const attraction_resolver_1 = require("./attraction.resolver");
let AttractionModule = class AttractionModule {
};
AttractionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([attraction_entity_1.Attraction]), destination_module_1.DestinationModule],
        providers: [attraction_service_1.AttractionService, attraction_resolver_1.AttractionResolver],
        exports: [attraction_service_1.AttractionService],
    })
], AttractionModule);
exports.AttractionModule = AttractionModule;
//# sourceMappingURL=attraction.module.js.map