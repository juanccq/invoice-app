import express from 'express';
import ReportController from '../controllers/reportController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get( '/sales-report', authMiddleware, roleMiddleware(['Administrator']), ReportController.getSalesReport );

export default router;