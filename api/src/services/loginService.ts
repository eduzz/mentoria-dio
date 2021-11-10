import * as jwt from 'jsonwebtoken';
import { getUserByCredentials } from "../repositories/UserRepository"

export const doUserLogin = async (username: string, password: string): Promise<string> => {
    const user = await getUserByCredentials(username, password);
    if (!user) throw new Error('User not found');
    // Create token and return it
    const newToken = jwt.sign({ user_id: user.id }, '123', {
        expiresIn: 3600
    });
    return newToken;
}
