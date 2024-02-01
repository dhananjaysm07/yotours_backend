import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { EditRoleDto } from "./dto/edit-role.dto";
import { Role } from "./entities/role.entity";
// import { Query } from "@nestjs/common";
import { PermissionValue } from "./enums/permission.enum";

@Resolver("Role")
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Role)
  async createRole(
    @Args("createRoleInput") createRoleDto: CreateRoleDto
  ): Promise<Role> {
    return this.roleService.createRole(createRoleDto);
  }

  @Mutation(() => Role)
  async editRole(
    @Args("id") id: string,
    @Args("editRoleInput") editRoleDto: EditRoleDto
  ): Promise<Role> {
    return this.roleService.editRole(id, editRoleDto);
  }

  @Query(() => [String])
  getAllPermissions(): string[] {
    return this.roleService.getAllPermissions();
  }
}
