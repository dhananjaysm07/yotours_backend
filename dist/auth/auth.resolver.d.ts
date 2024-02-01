import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";
import { RegisterInput } from "./dto/register.input";
export declare class AuthResolver {
    private readonly authServise;
    constructor(authServise: AuthService);
    register(registerInput: RegisterInput): Promise<{
        access_token: string;
        role: import("../role/entities/role.entity").Role[];
    }>;
    login(loginInput: LoginInput): Promise<{
        access_token: string;
        role: import("../role/entities/role.entity").Role[];
    }>;
}
