import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Roles } from "../common/decorators/roles.decorator";

@Controller("users")
export class UsersController {
  constructor(private users: UsersService) {}

  @Get()
  @Roles("ADULT", "CAREGIVER", "ELDERLY")
  list() {
    return this.users.list();
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.users.findById(id);
  }
}