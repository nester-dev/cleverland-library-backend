import multer, { Multer } from 'multer';
import { injectable } from 'inversify';
import { RequestHandler } from 'express';

@injectable()
export class MulterService {
	upload: Multer;
	constructor() {
		const storage = multer.memoryStorage();

		this.upload = multer({ storage });
	}

	array(fieldName: string): RequestHandler {
		return this.upload.array(fieldName);
	}
}
