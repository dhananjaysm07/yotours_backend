"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const default_1 = require("@apollo/server/plugin/landingPage/default");
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const auth_module_1 = require("./auth/auth.module");
const database_module_1 = require("./config/database.module");
const user_module_1 = require("./user/user.module");
const tag_module_1 = require("./tag/tag.module");
const destination_module_1 = require("./destination/destination.module");
const tour_module_1 = require("./tour/tour.module");
const attraction_module_1 = require("./attraction-ticket/attraction.module");
const content_module_1 = require("./content/content.module");
const thing_module_1 = require("./thing/thing.module");
const car_module_1 = require("./car/car.module");
const holiday_module_1 = require("./Holiday/holiday.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            graphql_1.GraphQLModule.forRoot({
                context: ({ req }) => ({ req }),
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), "src/schema.gql"),
                playground: false,
                plugins: [(0, default_1.ApolloServerPluginLandingPageLocalDefault)()],
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            destination_module_1.DestinationModule,
            tag_module_1.TagModule,
            tour_module_1.TourModule,
            attraction_module_1.AttractionModule,
            content_module_1.ContentModule,
            thing_module_1.ThingModule,
            car_module_1.CarModule,
            holiday_module_1.PackageModule,
        ],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map