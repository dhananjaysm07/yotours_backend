"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const destination_entity_1 = require("../destination/entities/destination.entity");
const destination_service_1 = require("./destination.service");
const createdestination_input_1 = require("./dto/createdestination.input");
const updatedestination_input_1 = require("./dto/updatedestination.input");
let DestinationResolver = class DestinationResolver {
    constructor(destinationService) {
        this.destinationService = destinationService;
    }
    createDestination(createDestinationInput) {
        return this.destinationService.createDestination(createDestinationInput);
    }
    updateDestination(updateDestinationInput) {
        return this.destinationService.updateDestination(updateDestinationInput);
    }
    async getDestinations() {
        return this.destinationService.findAllDestinations();
    }
    async getDestination(id) {
        return this.destinationService.findOneDestination(id);
    }
    async deleteDestination(destinationId) {
        return await this.destinationService.deleteDestination(destinationId);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => destination_entity_1.Destination),
    __param(0, (0, graphql_1.Args)("createDestinationInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createdestination_input_1.CreateDestinationInput]),
    __metadata("design:returntype", void 0)
], DestinationResolver.prototype, "createDestination", null);
__decorate([
    (0, graphql_1.Mutation)(() => destination_entity_1.Destination),
    __param(0, (0, graphql_1.Args)("updateDestinationInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatedestination_input_1.UpdateDestinationInput]),
    __metadata("design:returntype", void 0)
], DestinationResolver.prototype, "updateDestination", null);
__decorate([
    (0, graphql_1.Query)(() => [destination_entity_1.Destination]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DestinationResolver.prototype, "getDestinations", null);
__decorate([
    (0, graphql_1.Query)(() => destination_entity_1.Destination, { nullable: true }),
    __param(0, (0, graphql_1.Args)("id", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DestinationResolver.prototype, "getDestination", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)("destinationId", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DestinationResolver.prototype, "deleteDestination", null);
DestinationResolver = __decorate([
    (0, graphql_1.Resolver)(() => destination_entity_1.Destination),
    __metadata("design:paramtypes", [destination_service_1.DestinationService])
], DestinationResolver);
exports.DestinationResolver = DestinationResolver;
//# sourceMappingURL=destination.resolver.js.map