import fs from 'fs';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import config from '../config/config.js';

const uploadDir = config.uploadDir;

class ProductService {
  async createProduct( { name, image, price, discount, categoryId, description, stock } ) {
    const category = await Category.findById( categoryId );
    if(!category) {
      throw new Error( 'Category not found' );
    }

    const product = new Product( {
      name,
      image,
      price,
      discount,
      category: categoryId,
      description,
      stock
    } );

    await product.save();
    return product;
  }

  async getAllProducts() {
    return await Product.find().populate( 'category' );
  }

  async getProductById( productId ) {
    const product = await Product.findById( productId ).populate( 'category' );
    if( !product ) {
      throw new Error( 'Product not found' );
    }

    return product;
  }

  async updateProduct( productId, updates ) {
    const oldProduct = await Product.findById( productId );
    const product = await Product.findByIdAndUpdate( productId, updates, { new: true } ).populate( 'category' );
    if(!product) {
      throw new Error('Product not found');
    }

    // Remove the old image
    if( oldProduct.image !== product.image ) {
      if( oldProduct.image ) {
        fs.unlinkSync( `${uploadDir}/${oldProduct.image}` );
      }
    }

    return product;
  }

  async deleteProduct( productId ) {
    const product = await Product.findByIdAndDelete( productId );
    if( !product ) {
      throw new Error( 'Product not found' );
    }

    // Delete the uploaded image
    if( product.image ) {
      fs.unlinkSync( `${uploadDir}/${product.image}` );
    }

    return product;
  }
}

export default new ProductService();