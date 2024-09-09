import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from '../models/User.js';
import Role from '../models/Role.js';

dotenv.config();

async function seedUsers() {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Get the Administration role
    const role = await Role.findOne( { name: 'Administrator' } );
    if( !role ) {
      throw new Error( 'Invalid role name' );
    }

    const user = new User( {
      name: "admin",
      email: "admin@mail.com",
      password: "admin123",
      role: role._id
    } );
    
    // Clear existing usrs
    await User.deleteMany({});
    console.log('Existing users removed');

    await user.save();
    console.log('Users have been seeded successfully');

    // Disconnect from the database
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding users:', error);
    mongoose.disconnect();   
  }
};

export default seedUsers;