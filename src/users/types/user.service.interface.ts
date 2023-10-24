import { UserRegisterDto } from '../dto/user-register.dto';
import { UserLoginDto } from '../dto/user-login.dto';
import { IUserModel } from '../../models/types/user.model.interface';
import { User } from '../user.entity';

export interface IUserService {
	createUser(dto: UserRegisterDto): Promise<IUserModel | null>;
	validateUser(dto: UserLoginDto): Promise<Partial<IUserModel> | null>;
	getUserInfo(userId: string): Promise<User | null>;
}
