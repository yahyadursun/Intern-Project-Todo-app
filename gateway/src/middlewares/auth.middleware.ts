import { Request, Response, NextFunction } from "express";
import TokenService from "../services/token.service";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const provideAuth = req.headers.authorization;
        if (!provideAuth) {
            return res.status(401).json({ message: "Authorization header is missing" });
        }
        
        const accessToken = provideAuth.split(' ')[1];
        try {
            const user = TokenService.verifygenerateAccessToken(accessToken);
            req.validatedUser = user;
            next();
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    } catch (err) {
        next(err);
    }
};
