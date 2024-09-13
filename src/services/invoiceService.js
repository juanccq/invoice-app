import Invoice from '../models/Invoice.js';

class InvoiceService {
  async createInvoice( invoiceData) {
    const invoice = new Invoice( invoiceData );
    await invoice.save();
    return invoice;
  }

  async getAllInvoices( { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', filter = {}, search = '' } ) {
    const skip = ( page - 1 ) * limit;
    const sortOrder = order === 'desc' ? -1 : 1;

    // Add search filter for invoice number
    if( search ) {
      filter.invoiceNumber = { $regex: search, $options: 'i' };
    }

    // Fetch invoices with pagination
    const invoices = await Invoice.find( filter )
      .skip( skip )
      .limit( limit )
      .sort( { [sortBy]: sortOrder } )
      .populate('createdBy updatedBy items.product');

    // count total invoices
    const totalRecords = await Invoice.countDocuments( filter);

    // Return invoices and pagination metadata
    return {
      invoices,
      totalRecords,
      totalPages: Math.ceil( totalRecords / limit ),
      currentPage: page
    };
  }

  async getInvoiceById( invoiceId ) {
    const invoice = await Invoice.findById( invoiceId );
    if( !invoice ) {
      throw new Error( 'Invoice not found' );
    }

    return invoice;
  }

  async updateInvoice( invoiceId, updateData ) {
    const invoice = await Invoice.findByIdAndUpdate( invoiceId, updateData, { new: true } );
    if( !invoice ) {
      throw new Error( 'Invoice not found' );
    }

    return invoice;
  }

  async deleteInvoice( invoiceId ) {
    const invoice = await Invoice.findByIdAndDelete( invoiceId );

    if( !invoice ) {
      throw new Error( 'Invoice not found' );
    }

    return invoice;
  }
}

export default new InvoiceService();