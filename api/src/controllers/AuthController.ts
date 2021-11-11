import { NextFunction, Request, Response } from "express";
import LoginService from "../services/LoginService";
import UserService from "../services/UserService";

class AuthController {
    
    constructor(private readonly userService: typeof UserService, 
                private readonly loginService: typeof LoginService) { }

    public login = async (req: Request, res: Response) => {
        try {
            const newToken = await this.loginService.doUserLogin(req.body.email, req.body.password);
            return res.json({
                token: newToken
            });
        } catch (err) {
            res.status(401).json({
                message: "Usuário não encontrado"
            });
        }
    }

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.createUser(req.body);
            return res.json(user);
        } catch (err) {
            next(err);
        }
    }

    public profile = async (req: Request, res: Response) => {
        const userId = req.body.user_id || undefined;
        const profile = await this.userService.getProfile(userId);
        return res.json(profile);
    }

}

export default new AuthController(UserService, LoginService);
