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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt_1 = require("bcrypt");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async findAll() {
        return await this.userRepo.find();
    }
    async findOne(where) {
        return await this.userRepo.findOne({ where });
    }
    async findByLogin(loginInput) {
        const { username, password } = loginInput;
        const user = await this.findOne({ username });
        if (!user) {
            throw new common_1.BadRequestException("username is invalid");
        }
        const comparePassword = await (0, bcrypt_1.compare)(password, user.password);
        if (!comparePassword) {
            throw new common_1.BadRequestException("password is invalid");
        }
        return user;
    }
    async create(createUserInput) {
        let { firstName, lastName, email, password, username, roleIds } = createUserInput;
        const userInDb = await this.findOne({ email });
        const usernameInDb = await this.findOne({ username });
        if (userInDb) {
            throw new common_1.BadRequestException("this is email alredy exist");
        }
        if (usernameInDb) {
            throw new common_1.BadRequestException("this is username alredy exist");
        }
        const user = new user_entity_1.User();
        user.email = email;
        user.username = username;
        user.password = password;
        user.firstName = firstName;
        user.lastName = lastName;
        return this.userRepo.save(user);
    }
    async update(user, updateUserInput) {
        const statusResult = {
            message: "edited successfully",
            success: true,
        };
        const { firstName, lastName, password } = updateUserInput;
        await this.userRepo.update({ id: user.id }, { firstName, lastName, password });
        return statusResult;
    }
    async remove(id) {
        const statusResult = {
            success: true,
            message: "user removed successfully",
        };
        await this.userRepo.delete({ id });
        return statusResult;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map