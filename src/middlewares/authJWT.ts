import { JwtPayloadInterface } from './../interfaces/common/jwt-payload.interface';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'
import { config } from '../config';
import { BasicErrorResponseInterface } from '../interfaces/errors/basic-errors.interface';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const commonError: BasicErrorResponseInterface = {
        state: 0,
        message: 'Unauthorized'
    };

    if(!req.headers.authorization){
        commonError.errorData = 'Missing authorization header';
        return res.status(401).json(commonError);
    }

    const token: string = req.headers.authorization.split(' ')[1];

    if(!token){
        commonError.errorData = 'Wrong token';
        return res.status(401).json(commonError);
    }

    try {
        const decodedJson = jwt.verify(token, config.secret) as JwtPayloadInterface;
        req.userId = decodedJson.id;
        next();
    } catch (error: any) {
        commonError.errorData = error.message;
        return res.status(401).json(commonError);
    }
}