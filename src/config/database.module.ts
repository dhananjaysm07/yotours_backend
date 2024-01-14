import { Module } from "@nestjs/common";
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        url: "postgres://issue_user:k0BgaH5w44to15qIhQWRu6SKVhEhlWZT@dpg-ckmdd8gu1l6c7383q9jg-a.oregon-postgres.render.com/issues_database",
        // host: configService.get<string>(
        //   "DB_HOST",
        //   "dpg-ckffbhunpffc73f603ig-a"
        // ), // Replace with your actual environment variable names
        // port: configService.get<number>("DB_PORT", 5432),
        // username: configService.get<string>("DB_USERNAME", "jira_clone_user"),
        // password: configService.get<string>(
        //   "DB_PASSWORD",
        //   "FraeZh9zOgJvt1fRLpU08it9tsKJAvNo"
        // ),
        // database: configService.get<string>("DB_DATABASE", "jira_clone"),
        ///////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////
        // host: configService.get<string>("DB_HOST", "localhost"), // Replace with your actual environment variable names
        // port: configService.get<number>("DB_PORT", 5432),
        // username: configService.get<string>("DB_USERNAME", "postgres"),
        // password: configService.get<string>("DB_PASSWORD", "mypassword"),
        // database: configService.get<string>("DB_DATABASE", "yotours"),
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
        ssl: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
