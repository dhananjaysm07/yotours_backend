import { GqlExecutionContext } from '@nestjs/graphql';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    getRequest(context: GqlExecutionContext): any;
}
export {};
