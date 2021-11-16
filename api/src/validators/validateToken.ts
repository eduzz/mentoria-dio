import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedException } from '../exceptions/NotAuthorizedException';

export const checkTokenIsValid = (token: string): any => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, '123', (err, decoded) => {
            if (err) reject('Invalid token');
            resolve(decoded);
        });
    });
}

export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bearerToken: string = req.headers.authorization;
        if (!bearerToken) {
            throw new NotAuthorizedException('Authorization token required');
        }
        const token: string = bearerToken.split(' ')[1];
        const decodedToken = await checkTokenIsValid(token);
        res.locals.user_id = decodedToken.user_id;
        next();
    } catch (err) {
        next(err);
    }
}