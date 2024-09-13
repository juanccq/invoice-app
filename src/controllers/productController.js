import fs from 'fs';
import ProductService from '../services/productService.js';

class ProductController {
  async createProduct( req, res ) {
    try {
      const image = req.file ? req.file.filename : null;
      const product = await ProductService.createProduct( { ...req.body, image } );
      res.status( 201 ).json( { message: 'Product created successfully', product } );
    } catch (error) {
      // If image was uploaded, remove it
      if( req.file ) { fs.unlinkSync( req.file.path ); }

      console.error( 'Create Product error:', error.message );
      res.status( 400 ).json( { message: error.message } );
    }
  }

  async getAllProducts( req, res ) {
    const { page = 1, limit = 10, sortBy = 'name', order = 'asc', category, minPrice, maxPrice, search } = req.query; // Default to page1 and 10 reports per page

    const filters = {};
    if( category ) { filters.category = category; }
    if( minPrice || maxPrice ) {
      filters.price = {};
      if( minPrice ) { filters.price.$gte = Number( minPrice ); }
      if( maxPrice ) { filters.price.$lte = Number( maxPrice ); }
    }


    try {
      const products = await ProductService.getAllProducts( {
        page: Number( page ), 
        limit: Number( limit ),
        sortBy,
        order,
        filter: filters,
        search
      } );

      res.status( 200 ).json( products );
    } catch (error) {
      console.error( 'Get all Products error: ', error.message );
      res.status( 500 ).json( { message: 'Server error' } );
    }
  }

  async getProductById( req, res ) {
    try {
      const product = await ProductService.getProductById( req.params.id );
      res.status( 200 ).json( product );
    } catch (error) {
      console.error( 'Get Product by ID error: ', error.message );
      res.status( 404 ).json( { message: error.message } );
    }
  }

  async updateProduct( req, res ) {
    try {
      const image = req.file ? req.file.filename : null;
      const updates = image ? { ...req.body, image } : req.body;
      const product = await ProductService.updateProduct( req.params.id, updates );
      res.status( 200 ).json( { message: 'Product updated successfully', product } );
    } catch (error) {
      // Delete image if it was uploaded
      if( req.file ) { fs.unlinkSync( req.file.path ); }

      console.error( 'Update Product error:', error.message);
      res.status( 404 ).json( { message: error.message } );
    }
  }

  async deleteProduct( req, res ) {
    try {
      await ProductService.deleteProduct( req.params.id );
      res.status( 200 ).json( { message: 'Product deleted successfully' } );
    } catch (error) {
      console.error( 'Delete Product error:', error.message );
      res.status( 404 ).json( { message: error.message } );
    }
  }
}

export default new ProductController();