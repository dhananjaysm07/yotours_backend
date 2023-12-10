import { StatusResult } from "src/common/entities/status-result.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
export declare class UserReslover {
    private readonly userService;
    constructor(userService: UserService);
    findAllUsers(): Promise<User[]>;
    findUserById(id: string): Promise<User>;
    createUser(createUserInput: CreateUserInput): Promise<User>;
    updateUser(updateUserInput: UpdateUserInput, user: any): Promise<StatusResult>;
    removeUser(id: string): Promise<StatusResult>;
}
