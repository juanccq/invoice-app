import Invoice from '../models/Invoice.js';

class InvoiceService {
  async createInvoice( invoiceData) {
    const invoice = new Invoice( invoiceData );
    await invoice.save();
    return invoice;
  }

  async getAllInvoices() {
    return await Invoice.find();
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