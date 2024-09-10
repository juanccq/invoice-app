import invoiceService from '../services/invoiceService.js';

class InvoiceController {
  async createInvoice( req, res ) {
    try {
      const createdBy = req.user.userId;
      const invoice = await invoiceService.createInvoice( { ...req.body, createdBy } );
      res.status( 201 ).json( { message: 'Invoice created successfully', invoice } );
    } catch (error) {
      console.error( 'Create Invoice error:', error.message );
      res.status( 400 ).json( { message: error.message } );
    }
  }

  async getAllInvoices( req, res ) {
    try {
      const invoices = await invoiceService.getAllInvoices();
      res.status( 200 ).json( invoices );
    } catch (error) {
      console.error( 'Get all Invoices error:', error.message );
      res.status( 500 ).json( { message: 'Server error' } );
    }
  }

  async getInvoiceById( req, res) {
    try {
      const invoice = await invoiceService.getInvoiceById( req.params.id );
      res.status( 200 ).json( invoice );
    } catch (error) {
      console.error( 'Get Invoice by ID error:', error.message );
      res.status( 404 ).json( { message: error.message } );
    }
  } 

  async updateInvoice( req, res ) {
    try {
      const updatedBy = req.user.userId;
      const invoice = await invoiceService.updateInvoice( req.params.id, { ...req.body, updatedBy } );
      res.status( 200 ).json( { message: 'Invoice updated successfully', invoice } );
    } catch (error) {
      console.error( 'Update Invoice error:', error.message );
      res.status( 400 ).json( { message: error.message } );
    }
  }

  async deleteInvoice( req, res ) {
    try {
      const invoice = await invoiceService.deleteInvoice( req.params.id );
      res.status( 200 ).json( { message: 'Invoice deleted successfully', invoice } );
    } catch (error) {
      console.error( 'Delete Invoice error:', error.message );
      res.status( 400 ).json( { message: error.message } );
    }
  }
}

export default new InvoiceController();