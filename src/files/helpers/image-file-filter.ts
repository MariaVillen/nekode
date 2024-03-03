import { Request } from 'express';

export const imageFileFilter = (
  _req: Request,
  file: { originalname: string },
  callback: (error: Error, match: boolean) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};
