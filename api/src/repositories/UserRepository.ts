import User from "../entity/User";

export const getUserByCredentials = async (username: string, password: string): Promise<User> => {
    // Get user by Database or another data source
    const user: User = {
        id: 1,
        name: 'Diogo Mainardes',
        email: 'teste@teste.com',
        password: 'dadasdsad'
    };

    return user;
}

export const getUserById = async (id: number): Promise<User> => {
    // Get user by Database or another data source
    const user: User = {
        id: 1,
        name: 'Diogo Mainardes',
        email: 'teste@teste.com',
        password: 'dadasdsad'
    };

    return user;
}

export const createUser = async (data: any): Promise<User> => {
    // Insert user on Database or another data source
    const user: User = {
        id: 1,
        name: 'Diogo Mainardes',
        email: 'teste@teste.com',
        password: 'dadasdsad'
    };

    return user;
}