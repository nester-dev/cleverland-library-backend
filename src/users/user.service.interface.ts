import { UserRegisterDto } from './dto/user-register.dto';
import UserModel from '../models/User.model';
import { Document } from 'mongoose';
import { UserLoginDto } from './dto/user-login.dto';
import { IUserModel } from '../models/user.model.interface';
import { User } from './user.entity';

export interface IUserService {
	createUser(dto: UserRegisterDto): Promise<Document<typeof UserModel | null> | null>;
	validateUser(dto: UserLoginDto): Promise<Partial<IUserModel> | null>;
	getUserInfo(userId: string): Promise<User | null>;
}
