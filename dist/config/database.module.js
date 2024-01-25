"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    type: "postgres",
                    url: "postgres://issue_user:k0BgaH5w44to15qIhQWRu6SKVhEhlWZT@dpg-ckmdd8gu1l6c7383q9jg-a.oregon-postgres.render.com/issues_database",
                    host: configService.get("DB_HOST", "dpg-ckffbhunpffc73f603ig-a"),
                    port: configService.get("DB_PORT", 5432),
                    username: configService.get("DB_USERNAME", "jira_clone_user"),
                    password: configService.get("DB_PASSWORD", "FraeZh9zOgJvt1fRLpU08it9tsKJAvNo"),
                    database: configService.get("DB_DATABASE", "jira_clone"),
                    entities: ["dist/**/*.entity{.ts,.js}"],
                    synchronize: true,
                    ssl: false,
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map