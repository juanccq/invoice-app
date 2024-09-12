import { describe, it, expect, vi } from 'vitest';
import CategoryService from '../../src/services/categoryService.js';
import Category from '../../src/models/Category.js';

vi.mock( '../../src/models/Category.js' );

describe( 'CategoryService', () => {
  describe( 'createCategory', () => {
    it( 'it should create a new Category', async () => {
      const mockCategoryData = {
        name: 'New Category',
        description: 'Category description'
      };

      Category.mockImplementation( () => ( {
        save: vi.fn().mockResolvedValue( mockCategoryData ),
      } ) );

      const result = await CategoryService.createCategory( mockCategoryData );

      expect( await result.save() ).toEqual( mockCategoryData );
      expect( Category ).toHaveBeenCalledWith( expect.objectContaining( mockCategoryData ));
    } );
  } );
} );