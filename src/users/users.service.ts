import { User } from '../models/user';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel) {
    }

    async createUser(user: any): Promise<User> {
        const createdUser = new this.userModel(user);
        const takeUser = await createdUser.save();
        return takeUser;
    }

    async findAllUsers(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOne(username: string): Promise<User> {
        return await this.userModel.findOne({'username': username}).exec();
    }

    async findOneByUsernameAndPassword(user: User): Promise<User> {
        return await this.userModel.findOne({'username': user.username, 'password': user.password}).exec();
    }

    async updateUser(id: string, user: any): Promise<User> {
        return await this.userModel.findOneAndUpdate({'_id': id}, user).exec();
    }

    async deleteUser(id: string): Promise<void> {
        return await this.userModel.findOneAndRemove({'_id': id}).exec();
    }

}
