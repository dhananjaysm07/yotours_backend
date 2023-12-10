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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt_1 = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async _signToken(payload) {
        return await this.jwtService.signAsync(payload);
    }
    async _comparePassword(data, hash) {
        try {
            return await (0, bcrypt_1.compare)(data, hash);
        }
        catch (error) {
            return false;
        }
    }
    async register(registerInput) {
        const { firstName, lastName, email, username, password, } = registerInput;
        const user = await this.userService.findOne({ email });
        const userByUsername = await this.userService.findOne({ username });
        if (user) {
            throw new common_1.BadRequestException('this email alredy joined');
        }
        if (userByUsername) {
            throw new common_1.BadRequestException('this username alredy joined');
        }
        const newUser = await this.userService.create({
            firstName,
            lastName,
            email,
            username,
            password,
        });
        const payload = {
            roles: newUser.roles,
            sub: newUser.id,
            username: newUser.username,
        };
        return { access_token: await this._signToken(payload), role: newUser.roles };
    }
    async login(loginInput) {
        const user = await this.userService.findByLogin(loginInput);
        const payload = {
            roles: user.roles,
            sub: user.id,
            username: user.username,
        };
        return { access_token: await this._signToken(payload), role: user.roles };
    }
    async validateUser({ sub }) {
        const user = await this.userService.findOne({ id: sub });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map