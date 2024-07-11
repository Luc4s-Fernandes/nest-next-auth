import { PrismaService } from "../prisma/prisma.service";
import { users } from "@prisma/client";
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    register({ email, name, password, access_level, login, avatar_uri }: {
        email: any;
        name: any;
        password: any;
        access_level: any;
        login: any;
        avatar_uri: any;
    }): Promise<users>;
    login(login: string): Promise<users>;
    findById(id: number): Promise<users>;
}
