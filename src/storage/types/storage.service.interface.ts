export interface UploadedImage {
	id: string;
	url: string;
}

export interface IStorageService {
	uploadImagesToStorage(
		data: Express.Multer.File[] | { [p: string]: Express.Multer.File[] } | undefined,
	): Promise<UploadedImage[]>;
	deleteFileLocation(fileName?: string): Promise<void>;
}
