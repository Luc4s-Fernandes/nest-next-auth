import jwt from 'jsonwebtoken';

export default function getJwtPayload(token) {
    try {
        const decoded = jwt.decode(token, { complete: true });
        return decoded ? decoded.payload : null;
    } catch (err) {
        console.error("Failed to decode token:", err);
        return null;
    }
}