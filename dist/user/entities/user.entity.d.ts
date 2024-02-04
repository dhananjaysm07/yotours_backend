import { Role } from "../enums/role.enum";
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
