import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { LoginInput } from "./dto/login.input";
import { RegisterInput } from "./dto/register.input";
import { JwtPayload } from "./jwt/jwt.payload";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    private _signToken;
    private _comparePassword;
    register(registerInput: RegisterInput): Promise<{
        access_token: string;
        role: import("../user/enums/role.enum").Role[];
    }>;
    login(loginInput: LoginInput): Promise<{
        access_token: string;
        role: import("../user/enums/role.enum").Role[];
    }>;
    validateUser({ sub }: JwtPayload): Promise<import("../user/entities/user.entity").User>;
}
