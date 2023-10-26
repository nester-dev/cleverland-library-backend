import cloudinary from 'cloudinary';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IStorageService, UploadedImage } from './types/storage.service.interface';
import { HttpError } from '../errors/http-error.class';
import streamifier from 'streamifier';

@injectable()
export class CloudinaryStorageService implements IStorageService {
	private readonly cloudinaryConfig: cloudinary.ConfigOptions;
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {
		this.cloudinaryConfig = {
			cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
			api_key: this.configService.get('CLOUDINARY_API_KEY'),
			api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
		};

		cloudinary.v2.config(this.cloudinaryConfig);
	}

	async uploadImagesToStorage(
		data: Express.Multer.File[] | { [p: string]: Express.Multer.File[] } | undefined,
	): Promise<UploadedImage[]> {
		let files: Express.Multer.File[] = [];

		if (Array.isArray(data)) {
			files = data;
		} else if (typeof data === 'object') {
			Object.values(data).forEach((value) => {
				files = files.concat(value);
			});
		}

		return Promise.all(
			files.map((file) => {
				const { originalname } = file;

				return new Promise((res, rej) => {
					const cld_upload_stream = cloudinary.v2.uploader.upload_stream(
						{ folder: 'cleverland' },
						(error, result) => {
							if (error) {
								rej(new HttpError(500, 'Error uploading image'));
							}

							if (result) {
								const url = cloudinary.v2.url(result?.public_id, {
									format: originalname.substring(originalname.lastIndexOf('.') + 1),
								});
								res({ id: result?.public_id, url });
							}
						},
					);

					streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
				});
			}),
		) as Promise<UploadedImage[]>;
	}

	async deleteFileLocation(fileName?: string): Promise<void> {
		console.log(fileName);
	}
}
