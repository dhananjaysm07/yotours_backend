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
exports.UserReslover = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const gql_user_decorator_1 = require("../common/decorators/gql-user.decorator");
const status_result_entity_1 = require("../common/entities/status-result.entity");
const role_decorator_1 = require("./decorator/role.decorator");
const create_user_input_1 = require("./dto/create-user.input");
const update_user_input_1 = require("./dto/update-user.input");
const user_entity_1 = require("./entities/user.entity");
const role_enum_1 = require("./enums/role.enum");
const user_service_1 = require("./user.service");
let UserReslover = class UserReslover {
    constructor(userService) {
        this.userService = userService;
    }
    async findAllUsers() {
        const users = await this.userService.findAll();
        return users;
    }
    async findUserById(id) {
        return await this.userService.findOne({ id });
    }
    async createUser(createUserInput) {
        return this.userService.create(createUserInput);
    }
    async updateUser(updateUserInput, user) {
        return this.userService.update(user, updateUserInput);
    }
    async removeUser(id) {
        return this.userService.remove(id);
    }
};
__decorate([
    (0, role_decorator_1.HasRoles)(role_enum_1.Role.Admin),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, graphql_1.Query)(() => [user_entity_1.User], { name: 'findAllUser' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserReslover.prototype, "findAllUsers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => user_entity_1.User, { name: 'findUserById' }),
    __param(0, (0, graphql_1.Args)("id", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserReslover.prototype, "findUserById", null);
__decorate([
    (0, role_decorator_1.HasRoles)(role_enum_1.Role.Admin),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)("createUserInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserReslover.prototype, "createUser", null);
__decorate([
    (0, role_decorator_1.HasRoles)(role_enum_1.Role.Admin),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, graphql_1.Mutation)(() => status_result_entity_1.StatusResult),
    __param(0, (0, graphql_1.Args)('updateUserInput')),
    __param(1, (0, gql_user_decorator_1.GqlUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_input_1.UpdateUserInput, Object]),
    __metadata("design:returntype", Promise)
], UserReslover.prototype, "updateUser", null);
__decorate([
    (0, role_decorator_1.HasRoles)(role_enum_1.Role.Admin),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, graphql_1.Mutation)(() => status_result_entity_1.StatusResult),
    __param(0, (0, graphql_1.Args)('id', { name: "removeUser" })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserReslover.prototype, "removeUser", null);
UserReslover = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserReslover);
exports.UserReslover = UserReslover;
//# sourceMappingURL=user.resolver.js.map