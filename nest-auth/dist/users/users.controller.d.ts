import { UserService } from "./users.service";
import { users } from "@prisma/client";
import { CreateUsersDto } from "./dto/create-users.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register({ email, name, avatar_uri, password, access_level, login }: CreateUsersDto): Promise<users>;
    login({ login, enteredPassword }: {
        login: string;
        enteredPassword: string;
    }): Promise<{
        message: string;
        token: string;
    }>;
    verifyToken({ token }: {
        token: string;
    }): Promise<users>;
}
