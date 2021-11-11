import * as jwt from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import {UserRepository} from "../repositories/UserRepository"

class LoginService {
    
    constructor(private readonly userRepository: UserRepository){}
    
    public async doUserLogin (username: string, password: string): Promise<string> {
        const user = await this.userRepository.getUserByCredentials(username, password);
        if (!user) throw new Error('User not found');
        const newToken = jwt.sign({ user_id: user.id }, '123', {
            expiresIn: 3600
        });
        return newToken;
    }
}

export default new LoginService(getCustomRepository(UserRepository));