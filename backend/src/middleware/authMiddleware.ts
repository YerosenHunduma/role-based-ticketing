import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../utils/errorHandler';
import jwt, { JwtPayload as JwtPayloadType, VerifyErrors } from 'jsonwebtoken';

// Extend Express Request interface to include userId
declare module 'express-serve-static-core' {
    interface Request {
        userId?: string;
        role?: string;
    }
}

// Define JWT payload type
interface JwtPayload extends JwtPayloadType {
    _id: string;
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.access_token;
    if (!accessToken) {
        return next(new errorHandler('Your session has expired. Please log in again to continue.', 401));
    }

    jwt.verify(accessToken, process.env.JWT_SECRET || '', (err: VerifyErrors | null, decoded: any) => {
        if (err) {
            return next(new errorHandler('Your session has expired. Please log in again to continue.', 401));
        }

        const payload = decoded as JwtPayload;
        req.userId = payload._id;
        req.role = payload.role;

        next();
    });
};
