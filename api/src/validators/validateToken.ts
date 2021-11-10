import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const checkTokenIsValid = (token: string): any => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, '123', (err, decoded) => {
            if (err) reject('Authorization token required');
            resolve(decoded);
        });
    });
}

export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token: string = req.headers.authorization;
        if (!token) {
            throw new Error('Authorization token required');
        }
        const decodedToken = await checkTokenIsValid(token);
        req.body.user_id = decodedToken.user_id;
        next(req);
    } catch (err) {
        next(err);
    }
}