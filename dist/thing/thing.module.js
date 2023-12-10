"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const thing_entity_1 = require("./entities/thing.entity");
const thing_service_1 = require("./thing.service");
const thing_resolver_1 = require("./thing.resolver");
const destination_module_1 = require("../destination/destination.module");
let ThingModule = class ThingModule {
};
ThingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([thing_entity_1.Thing]), destination_module_1.DestinationModule],
        providers: [thing_service_1.ThingService, thing_resolver_1.ThingResolver],
        exports: [thing_service_1.ThingService],
    })
], ThingModule);
exports.ThingModule = ThingModule;
//# sourceMappingURL=thing.module.js.map