import mongoose from "mongoose";
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';
import Invoice from './src/models/Invoice.js';
import Role from './src/models/Role.js';
import User from './src/models/User.js';
import Category from './src/models/Category.js';

dotenv.config();

mongoose.connect( process.env.MONGO_URL, {} )
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


async function seedUsers() {
  const role = await Role.findOne( { name: 'Administrator' } );
  if( !role ) {
    throw new Error( 'Invalid role name' );
  }

  const user = new User( {
    name: 'dummy-user',
    email: 'dummy@mail.com',
    password: '123456',
    role: role._id
  } );

  await user.save();
  console.log( 'User seeded' );
}

async function seedCategories() {
  const categories = [];

  for( let i = 0; i < 15; i++ ) {
    const category = new Category( {
      name: faker.commerce.department(),
      description: faker.word.words(10)
    } );

    categories.push( category );
  }

  const filtered = categories.filter( (item, index, self) => {    
    return index === self.findIndex( (t) => (
      t.name === item.name
    ));
  } );

  await Category.insertMany( filtered );
  console.log( 'Category seeded' );
}

async function seedProducts() {
  const products = [];
  const categories = await Category.find();

  const categoriesId = categories.map( (item) => item._id );
  
  for( let i = 0; i < 50; i++ ) {
    const product = new Product( {
      name: faker.commerce.productName(),
      price: faker.commerce.price( 10, 1000 ),
      category: categoriesId[ Math.floor( Math.random() * categoriesId.length ) ],
      description: faker.commerce.productDescription(),
      stock: faker.helpers.rangeToNumber( { min: 1, max: 100 } )
    } );

    products.push( product );
  }

  await Product.insertMany( products );
  console.log( 'Products seeded' );
}


async function seedDatabase() {
  try {
    await seedUsers();
    await seedCategories();
    await seedProducts();
  } catch (error) {
    console.error( 'Error seeding database:', error );
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();