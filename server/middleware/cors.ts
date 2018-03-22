import { Request, Response, NextFunction } from 'express';

export function cors(_: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:1337');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}