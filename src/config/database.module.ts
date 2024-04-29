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
        // url: "postgres://admin:Bcozf4OAfO96DdKshB1vduMRT7wpwsWl@dpg-com05aq1hbls7398a7og-a.oregon-postgres.render.com/yotours_wi7l",
        // url: "postgres://gotrip_postgres_database_user:6myYJPYRAHDyBuUZcIDDfoHMg4ihK4cA@dpg-cmotdqen7f5s73da69eg-a/gotrip_postgres_database",
        host: configService.get<string>(
          "DB_HOST",
          "dpg-com05aq1hbls7398a7og-a.oregon-postgres.render.com"
        ), // Replace with your actual environment variable names
        port: configService.get<number>("DB_PORT", 5432),
        username: configService.get<string>("DB_USERNAME", "admin"),
        password: configService.get<string>(
          "DB_PASSWORD",
          "Bcozf4OAfO96DdKshB1vduMRT7wpwsWl"
        ),
        database: configService.get<string>("DB_DATABASE", "yotours_wi7l"),
        ///////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////
        // host: configService.get<string>("DB_HOST", "localhost"), // Replace with your actual environment variable names
        // port: configService.get<number>("DB_PORT", 5432),
        // username: configService.get<string>("DB_USERNAME", "postgres"),
        // password: configService.get<string>(
        //   "DB_PASSWORD",
        //   process.env.POSTGRES_PASSWORD_PRODUCTION
        // ),
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
