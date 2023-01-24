import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authorizeChecker = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];

            const secret: string = process.env.TOKEN_SECRET as string;

            jwt.verify(token, secret, (err) => {
                if (err) {
                    res.status(403).send('Incorrect Token');
                } else {
                    next();
                }
            });
        } else {
            res.status(401).send('No Token Provided');
        }
    } catch (err) {
        throw new Error('Authetication error: ${err}');
    }
};
