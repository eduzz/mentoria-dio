import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const Ping = (req: Request, res: Response, next: NextFunction) => {
    return res.json(req.body);
}

export const ErrorHandling = (error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    return res.status(400).json({
        message: error.toString()
    });
}