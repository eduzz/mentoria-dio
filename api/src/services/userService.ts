import * as jwt from 'jsonwebtoken';
import User from '../entity/User';
import * as UserRepository from "../repositories/UserRepository"

export const getProfile = async (id: number): Promise<User> => {
    const user = await UserRepository.getUserById(id);
    return user;
}

export const createUser = async (data: any): Promise<User> => {
    const user: User = await UserRepository.createUser(data)
    return user;
}