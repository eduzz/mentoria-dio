import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    
    public getUserByCredentials = async (username: string, password: string): Promise<User> => {
        return await this.findOne({ email: username, password });
    }

    public getUserById = async (id: number): Promise<User> => {
        return await this.findOne(id);
    }

    public createUser = async (data: any): Promise<User> => {
        const user = this.create();
        user.name = data.name;
        user.email = data.email;
        user.password = data.password;
        return await user.save();
    }

}