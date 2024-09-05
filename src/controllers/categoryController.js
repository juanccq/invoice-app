import CategoryService from '../services/categoryService.js';

class CategoryController {
  async createCategory( req, res ) {
    try {
      const category = await CategoryService.createCategory( req.body );
      res.status( 201 ).json( { message: 'Category created successfully', category } );
    } catch (error) {
      console.error( 'Create Category error:', error.message );
      res.status( 400 ).json( { message: error.message } );
    }
  }

  async getAllCategories( req, res ) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.status( 200 ).json( { categories } );
    } catch (error) {
      console.error( 'Get All Categories error:', error.message );
      res.status( 500 ).json( { message: 'Server error' } );
    }
  }

  async getCategoryById( req, res ) {
    try {
      const category = await CategoryService.getCategoryById( req.params.id );
      res.status( 200 ).json( category );
    } catch (error) {
      console.error( 'Get Category By ID error:', error.message );
      res.status( 404 ).json( { message: error.message } );
    }
  }

  async updateCategory( req, res ) {
    try {
      const category = await CategoryService.updateCategory( req.params.id, req.body );
      res.status( 200 ).json( { message: 'Category updated successfully', category } );
    } catch (error) {
      console.error( 'Update Category error:', error.message );
      res.status( 404 ).json( { message: error.message } );
    }
  }

  async deleteCategory( req, res ) {
    try {
      await CategoryService.deleteCategory( req.params.id );
      res.status( 200 ).json( { message: 'Category deleted successfully' } );
    } catch (error) {
      console.error( 'delete Category error:', error.message );
      res.status( 404 ).json( { message: error.message } ); 
    }
  }
}

export default new CategoryController();