import multer, { Multer } from 'multer';
import { injectable } from 'inversify';
import { v4 as uuid } from 'uuid';
import { RequestHandler } from 'express';

@injectable()
export class MulterService {
	upload: Multer;
	constructor() {
		const storage = multer.diskStorage({
			destination: (req, file, cb) => {
				cb(null, 'uploads/');
			},
			filename(
				req,
				file: Express.Multer.File,
				callback: (error: Error | null, filename: string) => void,
			) {
				const { originalname } = file;
				const format = originalname.substring(originalname.lastIndexOf('.') + 1);
				callback(null, `${uuid()}.${format}`);
			},
		});

		this.upload = multer({ storage });
	}

	array(fieldName: string): RequestHandler {
		return this.upload.array(fieldName);
	}
}
