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

  async getAllProducts( { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = {}, search = '' } ) {
    const skip = ( page -1 ) * limit;
    const sortOrder = order === 'desc' ? -1 : 1;

    // Add search filter for product name
    if( search ) {
      filter.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }
    

    // Fetch products with pagination
    const products = await Product.find( filter )
      .skip( skip )
      .limit( limit )
      .sort( { [sortBy]: sortOrder } );

    // count total products in the collection
    const totalRecords = await Product.countDocuments( filter );

    // Return products and metadata for pagination
    return {
      products,
      totalRecords, 
      totalPages: Math.ceil( totalRecords / limit ),
      currentPage: page
    };
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