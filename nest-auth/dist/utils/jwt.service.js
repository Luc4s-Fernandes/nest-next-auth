"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtToken = generateJwtToken;
exports.verifyJwtToken = verifyJwtToken;
const jwt = require("jsonwebtoken");
const jwtSecret = 'indecifrável';
function generateJwtToken(payload) {
    return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}
function verifyJwtToken(token) {
    try {
        const decoded = jwt.verify(token, jwtSecret);
        return decoded;
    }
    catch (e) {
        throw new Error('Invalid token');
    }
}
;
//# sourceMappingURL=jwt.service.js.map