"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
const bcrypt = require("bcrypt");
async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}
async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}
//# sourceMappingURL=bcrypt.service.js.map