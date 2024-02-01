// role.service.ts

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { EditRoleDto } from "./dto/edit-role.dto";
import { Role } from "./entities/role.entity";
import { PermissionValue } from "./enums/permission.enum";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }

  async editRole(id: string, editRoleDto: EditRoleDto): Promise<Role> {
    const role = await this.roleRepository.findOneOrFail({ where: { id: id } });
    Object.assign(role, editRoleDto);
    return await this.roleRepository.save(role);
  }

  getAllPermissions(): string[] {
    // Directly use the values from the enum
    const permissionValues: string[] = Object.values(PermissionValue);
    return permissionValues;
  }
}
