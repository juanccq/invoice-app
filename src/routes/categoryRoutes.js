import express from 'express';
import CategoryController from '../controllers/categoryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use( authMiddleware );
router.post( '/', CategoryController.createCategory );
router.get( '/', CategoryController.getAllCategories );
router.get( '/:id', CategoryController.getCategoryById );
router.put( '/:id', CategoryController.updateCategory );
router.delete( '/:id', CategoryController.deleteCategory );

export default router;