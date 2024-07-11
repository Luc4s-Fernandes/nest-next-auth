import {
    Body,
    Controller,
    HttpStatus,
    HttpException,
    Post,
} from "@nestjs/common";
import { UserService } from "./users.service";
import { users } from "@prisma/client";
import { CreateUsersDto } from "./dto/create-users.dto";
import { hashPassword, comparePassword } from "../utils/bcrypt.service";
import { generateJwtToken, verifyJwtToken } from "src/utils/jwt.service";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post("register")
    async register(
        @Body() { email, name, avatar_uri, password, access_level, login }: CreateUsersDto
    ): Promise<users> {
        const hashedPassword = await hashPassword(password);

        try {
            return await this.userService.register({
                email,
                name,
                password: hashedPassword,
                avatar_uri,
                access_level: parseInt(access_level),
                login,
            });
        } catch (e) {
            throw new Error(
                "The system encountered an error during the user registration attempt: " + e.message
            );
        }
    }

    @Post("login")
    async login(@Body() { login, enteredPassword }: { login: string, enteredPassword: string }) {
        try {
            const data = await this.userService.login(login);
            const { password } = data;

            const isLoginSuccessful = await comparePassword(enteredPassword, password);

            if (!isLoginSuccessful) {
                throw new HttpException('Login or password not found', HttpStatus.UNAUTHORIZED);
            }

            const token = generateJwtToken(data);

            return {
                message: 'success',
                token: token,
            };

        } catch (e) {
            throw new HttpException('Error during login attempt: ' + e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post("verify-token")
    async verifyToken(@Body() { token }: { token: string }): Promise<users> {
        try {
            const decodedUser = verifyJwtToken(token);

            const user = await this.userService.findById(decodedUser.userId);

            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            return user;
        } catch (e) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
}