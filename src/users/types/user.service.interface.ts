import { UserRegisterDto } from '../dto/user-register.dto';
import { UserLoginDto } from '../dto/user-login.dto';
import { IUserModel } from '../../models/types/user.model.interface';
import { UserUpdateDto } from '../dto/user-update.dto';
import { IUserResponse } from '../../utils/getUserResponseFields';

export interface IUserService {
	createUser(dto: UserRegisterDto): Promise<IUserModel | null>;
	updateUser(userId: string, dto: UserUpdateDto): Promise<IUserModel | null>;
	updateUserAvatar(
		userId: string,
		avatar: Express.Multer.File[] | { [p: string]: Express.Multer.File[] } | undefined,
	): Promise<IUserModel | null>;
	validateUser(dto: UserLoginDto): Promise<Partial<IUserModel> | null>;
	getUserInfo(userId: string): Promise<IUserResponse | null>;
}
