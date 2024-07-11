import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { CreateUsersDto } from "./dto/create-users.dto";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";


@Module({
    imports: [PrismaModule, CreateUsersDto],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UsersModule {

}