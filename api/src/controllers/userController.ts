import { Request, Response } from "express";
import * as LoginService from "../services/loginService";
import * as UserService from "../services/userService";

export const Login = async (req: Request, res: Response) => {
    const newToken = await LoginService.doUserLogin(req.body.username, req.body.password);
    return res.json({
        token: newToken
    });
}

export const Profile = async (req: Request, res: Response) => {
    const userId = req.body.user_id || undefined;
    const profile = await UserService.getProfile(userId);
    return res.json(profile);
}

export const CreateUser = async (req: Request, res: Response) => {
    const user = await UserService.createUser(req.body);
    return res.json(user);
}