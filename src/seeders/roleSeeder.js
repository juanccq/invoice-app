import mongoose from "mongoose";
import dotenv from "dotenv";
import Role from '../models/Role.js';

dotenv.config();

const roles = [
  {
    name: 'Administrator',
    permissions: ['create_invoice', 'view_reports', 'manage_users', 'edit_products']
  },
  {
    name: 'Accountant',
    permissions: ['view_reports', 'manage_invoicese']
  },
  {
    name: 'Seller',
    permissions: ['create_invoice', 'view_own_sales']
  }
];

async function seedRoles() {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Clear existing roles
    await Role.deleteMany({});
    console.log('Existing roles removed');

    // Inser predefined roles
    await Role.insertMany(roles);
    console.log('Roles have been seeded successfully');
    
    // Disconnect from the database
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding roles:', error);
    mongoose.disconnect();
  }
}

export default seedRoles;