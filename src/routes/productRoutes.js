import express from 'express';
import ProductController from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.use( authMiddleware );
router.post( '/', roleMiddleware('Administrator'), uploadMiddleware.single( 'image' ), ProductController.createProduct );
router.get( '/', ProductController.getAllProducts );
router.get( '/:id', ProductController.getProductById );
router.put( '/:id', roleMiddleware('Administrator'), uploadMiddleware.single( 'image' ), ProductController.updateProduct );
router.delete( '/:id', roleMiddleware('Administrator'), ProductController.deleteProduct );

export default router;