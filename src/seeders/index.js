import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRoles from './roleSeeder.js';

dotenv.config();

async function runSeeders() {
  try {
    await mongoose.connect( process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } );

    console.log('Connected to MongoDB');

    // Run each seeder
    await seedRoles();

    console.log('Seeding complete');
    
    // Disconnect from the database
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Seeding error:', error);
    mongoose.disconnect();
  }
}

runSeeders();