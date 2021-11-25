import { NextFunction, Request, Response } from "express";
import LoginService from "../services/loginService";
import UserService from "../services/userService";

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

    public sendReset = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body;
            await this.loginService.sendResetPassword(email);
            return res.json(true);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { password, token } = req.body;
            await this.userService.updatePassword(password, token);
            return res.json(true);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

}

export default new AuthController(UserService, LoginService);
