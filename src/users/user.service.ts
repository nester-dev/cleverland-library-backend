import { IUserService } from './types/user.service.interface';
import { User } from './user.entity';
import { inject, injectable } from 'inversify';
import { UserRegisterDto } from './dto/user-register.dto';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUserRepository } from './types/user.repository.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { IUserModel } from '../models/types/user.model.interface';
import { v4 as uuid } from 'uuid';
import { HttpError } from '../errors/http-error.class';
import { UserUpdateDto } from './dto/user-update.dto';
import { IStorageService } from '../storage/types/storage.service.interface';
import { getUserResponseFields, IUserResponse } from '../utils/getUserResponseFields';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
		@inject(TYPES.StorageService) private storageService: IStorageService,
	) {}

	async createUser({
		email,
		password,
		firstName,
		lastName,
		username,
		phone,
	}: UserRegisterDto): Promise<IUserModel | null> {
		const existedUser = await this.userRepository.findUserByUsername(email);

		if (existedUser) {
			return null;
		}

		const userId = uuid();
		const newUser = new User(userId, username, email, false, firstName, lastName, phone);
		const salt = this.configService.get('SALT');

		await newUser.setPassword(password, Number(salt));

		return await this.userRepository.createUser(newUser);
	}

	async updateUser(userId: string, dto: UserUpdateDto): Promise<IUserModel | null> {
		const existedUser = await this.userRepository.findUserById(userId);

		if (!existedUser) {
			throw new HttpError(404, 'User not found');
		}

		return await this.userRepository.updateUserInfo(userId, dto);
	}

	async updateUserAvatar(
		userId: string,
		image?: Express.Multer.File[] | { [p: string]: Express.Multer.File[] } | undefined,
	): Promise<IUserModel | null> {
		const existedUser = await this.userRepository.findUserById(userId);

		if (existedUser?.avatar?.id) {
			await this.storageService.deleteFileLocation(existedUser.avatar.id);
		}

		const result = await this.storageService.uploadImagesToStorage(image);

		if (!result.length) {
			throw new HttpError(404, 'Cannot upload image');
		}

		return await this.userRepository.updateUserAvatar(userId, result?.at(0));
	}

	async validateUser({ identifier, password }: UserLoginDto): Promise<Partial<IUserModel> | null> {
		const existedUser = await this.userRepository.findUserByUsername(identifier);

		if (!existedUser) {
			return null;
		}

		const user = new User(
			existedUser.id,
			existedUser.username,
			existedUser.email,
			existedUser.blocked,
			existedUser.firstName,
			existedUser.lastName,
			existedUser.phone,
			existedUser.createdAt,
			existedUser.updatedAt,
			existedUser.password,
		);

		const isValid = await user.comparePassword(password);

		if (!isValid) {
			return null;
		}

		return user.mapUserFields(existedUser);
	}

	async getUserInfo(userId: string): Promise<IUserResponse | null> {
		const existedUser = await this.userRepository.findUserById(userId);

		if (!existedUser) {
			return null;
		}

		return getUserResponseFields(existedUser);
	}
}
