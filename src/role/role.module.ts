import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleService } from "./role.service";
import { RoleResolver } from "./role.resolver";
import { Role } from "./entities/role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleService, RoleResolver],
  exports: [RoleService, TypeOrmModule.forFeature([Role])],
})
export class RoleModule {}
