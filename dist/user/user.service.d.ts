import { LoginInput } from "src/auth/dto/login.input";
import { StatusResult } from "src/common/entities/status-result.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entities/user.entity";
type Where = FindOptionsWhere<User>;
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(where: Where): Promise<User>;
    findByLogin(loginInput: LoginInput): Promise<User>;
    create(createUserInput: CreateUserInput): Promise<User>;
    update(user: User, updateUserInput: UpdateUserInput): Promise<StatusResult>;
    remove(id: string): Promise<StatusResult>;
}
export {};
