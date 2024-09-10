import express from 'express';
import UserController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use( authMiddleware );
router.get( '/', roleMiddleware( 'Administrator' ), UserController.getAllUsers );
router.post( '/', roleMiddleware( 'Administrator' ), UserController.createUser );
router.get( '/:id', roleMiddleware( 'Administrator' ), UserController.getUserById );
router.put( '/:id', roleMiddleware( 'Administrator' ), UserController.updateUser );
router.delete( '/:id', roleMiddleware( 'Administrator' ), UserController.deleteUser );

export default router;