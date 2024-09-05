import Category from '../models/Category.js';

class CategoryService {
  async createCategory( { name, description } ) {
    const category = new Category( {
      name, 
      description
    } );

    await category.save();

    return category;
  }

  async getAllCategories() {
    return await Category.find();
  }

  async getCategoryById( categoryId ) {
    const category = await Category.findById( categoryId );

    if( !category ) {
      throw new Error( 'Category not found' );
    }

    return category;
  }

  async updateCategory( categoryId, updates ) {
    const category = await Category.findByIdAndUpdate( categoryId, updates, { new: true } );

    if( !category ) {
      throw new Error( 'Category not found' );
    }

    return category;
  }

  async deleteCategory( categoryId ) {
    const category = await Category.findByIdAndDelete( categoryId );

    if( !category ) {
      throw new Error( 'Category not found' );
    }

    return category;
  }
}

export default new CategoryService();