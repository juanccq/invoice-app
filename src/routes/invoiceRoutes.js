import express from 'express';
import InvoiceController from '../controllers/invoiceController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use( authMiddleware );
router.post( '/', roleMiddleware(['Accountant', 'Administrator']), InvoiceController.createInvoice );
router.get( '/', roleMiddleware(['Accountant', 'Administrator']), InvoiceController.getAllInvoices );
router.get( '/:id', roleMiddleware(['Accountant']), InvoiceController.getInvoiceById );
router.put( '/:id', roleMiddleware(['Accountant']), InvoiceController.updateInvoice );
router.delete( '/:id', roleMiddleware(['Accountant']), InvoiceController.deleteInvoice );

export default router;