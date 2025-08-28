import express from 'express';
import { addGalleryItem, listGallery, deleteGalleryItem } from '../controllers/galleryController.js';

const galleryRouter = express.Router();

galleryRouter.post('/', addGalleryItem);
galleryRouter.get('/', listGallery);
galleryRouter.delete('/:id', deleteGalleryItem);

export default galleryRouter;


