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
        // url: "postgres://admin:G7j4zKqlEUOFAJHwkWSFeGcERCGj7IFk@dpg-contkaa1hbls73fqs6p0-a.oregon-postgres.render.com/yotours_klhy",
        // url: "postgres://gotrip_postgres_database_user:6myYJPYRAHDyBuUZcIDDfoHMg4ihK4cA@dpg-cmotdqen7f5s73da69eg-a/gotrip_postgres_database",
        // host: configService.get<string>("DB_HOST", "localhost"), // Replace with your actual environment variable names
        // port: configService.get<number>("DB_PORT", 5432),
        // username: configService.get<string>("DB_USERNAME", "postgres"),
        // password: configService.get<string>("DB_PASSWORD", ""),
        // database: configService.get<string>("DB_DATABASE", "yotours"),
        ///////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////
        host: configService.get<string>("DB_HOST", "localhost"), // Replace with your actual environment variable names
        port: configService.get<number>("DB_PORT", 5432),
        username: configService.get<string>("DB_USERNAME", "postgres"),
        password: configService.get<string>(
          "DB_PASSWORD",
          process.env.POSTGRES_PASSWORD_PRODUCTION
        ),
        database: configService.get<string>("DB_DATABASE", "yotours"),
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
        ssl: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
