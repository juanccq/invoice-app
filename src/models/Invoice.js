import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema( {
  invoiceNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: String,
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: true
    }
  }],
  totalAmount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
}, {
  timestamps: true
} );

const Invoice = mongoose.model( 'Invoice', invoiceSchema );

export default Invoice;