import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';


@Module({
    imports : [
        TypeOrmModule.forRootAsync({
            imports :  [ ConfigModule ], 
            useFactory : async (configService:ConfigService)=>({
                type : 'postgres' , 
                url:"postgres://issue_user:k0BgaH5w44to15qIhQWRu6SKVhEhlWZT@dpg-ckmdd8gu1l6c7383q9jg-a.oregon-postgres.render.com/issues_database",
                // host : configService.get<string>("POSTGRES_HOST"),
                // port : configService.get<number>("POSTGRES_PORT"),
                // username : configService.get<string>("POSTGRES_USERNAME"),
                // password : configService.get<string>("POSTGRES_PASSWORD"),
                // database : configService.get<string>("POSTGRES_DATABASE") , 
                entities : ["dist/**/*.entity{.ts,.js}"],
                synchronize : true , 
                ssl:true
            }), 
            inject : [ConfigService]
        }) 
    ] , 
    
})
export class DatabaseModule{}