import { Role } from "src/role/entities/role.entity";
export declare class User {
    id: string;
    username: string;
    password: string;
    hashPassword(): Promise<void>;
    email: string;
    firstName: string;
    lastName: string;
    roles: Role[];
}
