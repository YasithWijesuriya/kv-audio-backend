import express from 'express';
import { createPresignedUpload } from '../controllers/uploadController.js';

const uploadRouter = express.Router();

uploadRouter.post('/presign', createPresignedUpload);

export default uploadRouter;


