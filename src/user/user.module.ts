import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserReslover } from "./user.resolver";
import { UserService } from "./user.service";
// import { RoleModule } from "src/role/role.module";
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserReslover],
  exports: [UserService],
})
export class UserModule {}
