import * as jwt from 'jsonwebtoken';


const jwtSecret = 'indecifrável';

export function generateJwtToken(payload: object): string {
    return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}

export function verifyJwtToken(token: string) {
    try {
        const decoded = jwt.verify(token, jwtSecret);
        return decoded;
    } catch (e) {
        throw new Error('Invalid token');
    }
};

