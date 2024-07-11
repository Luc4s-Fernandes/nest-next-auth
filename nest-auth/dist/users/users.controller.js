"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_users_dto_1 = require("./dto/create-users.dto");
const bcrypt_service_1 = require("../utils/bcrypt.service");
const jwt_service_1 = require("../utils/jwt.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async register({ email, name, avatar_uri, password, access_level, login }) {
        const hashedPassword = await (0, bcrypt_service_1.hashPassword)(password);
        try {
            return await this.userService.register({
                email,
                name,
                password: hashedPassword,
                avatar_uri,
                access_level: parseInt(access_level),
                login,
            });
        }
        catch (e) {
            throw new Error("The system encountered an error during the user registration attempt: " + e.message);
        }
    }
    async login({ login, enteredPassword }) {
        try {
            const data = await this.userService.login(login);
            const { password } = data;
            const isLoginSuccessful = await (0, bcrypt_service_1.comparePassword)(enteredPassword, password);
            if (!isLoginSuccessful) {
                throw new common_1.HttpException('Login or password not found', common_1.HttpStatus.UNAUTHORIZED);
            }
            const token = (0, jwt_service_1.generateJwtToken)(data);
            return {
                message: 'success',
                token: token,
            };
        }
        catch (e) {
            throw new common_1.HttpException('Error during login attempt: ' + e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyToken({ token }) {
        try {
            const decodedUser = (0, jwt_service_1.verifyJwtToken)(token);
            const user = await this.userService.findById(decodedUser.userId);
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            return user;
        }
        catch (e) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_users_dto_1.CreateUsersDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("verify-token"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyToken", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UserController);
//# sourceMappingURL=users.controller.js.map