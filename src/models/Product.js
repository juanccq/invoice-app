import mongoose from "mongoose";

const productSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: false,
    trim: true
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
} );

const Product = mongoose.model( 'Product', productSchema );

export default Product;