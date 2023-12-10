"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlUser = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.GqlUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const user = graphql_1.GqlExecutionContext.create(ctx).getContext().req.user;
    return data ? user && user[data] : user;
});
//# sourceMappingURL=gql-user.decorator.js.map