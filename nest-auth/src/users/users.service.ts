import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { users } from "@prisma/client";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async register({ email, name, password, access_level, login, avatar_uri }): Promise<users> {
        return this.prisma.users.create({
            data: {
                email,
                name,
                avatar_uri,
                login,
                password,
                access_level,
            }
        })
    }

    async login(login: string): Promise<users> {
        return this.prisma.users.findFirst({
            where: {
                login
            }
        });
    }

    async findById(id: number): Promise<users> {
        return this.prisma.users.findFirst({
            where: {
                id
            }
        });
    }

}