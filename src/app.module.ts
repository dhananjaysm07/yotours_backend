import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./config/database.module";
import { UserModule } from "./user/user.module";
import { TagModule } from "./tag/tag.module";
import { PackageGeneralModule } from "./package/package.module";
import { DestinationModule } from "./destination/destination.module";
import { TourModule } from "./tour/tour.module";
import { AttractionModule } from "./attraction-ticket/attraction.module";
import { ContentModule } from "./content/content.module";
import { ThingModule } from "./thing/thing.module";
import { CarModule } from "./car/car.module";
// import { RoleModule } from "./role/role.module";
@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req }) => ({ req }),
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UserModule,
    AuthModule,
    PackageGeneralModule,
    DestinationModule,
    TagModule,
    TourModule,
    AttractionModule,
    ContentModule,
    ThingModule,
    CarModule,
    // RoleModule,
  ],
  providers: [],
})
export class AppModule {}
