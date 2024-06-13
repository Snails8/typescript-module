import * as dotenv from 'dotenv'
dotenv.config()

export const PROJECT_ID = process.env.PROJECT_ID ?? '';
export const BUCKET_NAME = PROJECT_ID + process.env.BUCKET_NAME ?? '';
export const FILE_NAME = process.env.FILE_NAME ?? '';