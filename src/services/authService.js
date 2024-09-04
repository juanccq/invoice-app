import User from '../models/User.js';
import Role from '../models/Role.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class AuthService {
  async registerUser( { name, email, password, roleName } ) {
    // Check if the email is already taken
    const existingUser = await User.findOne( { email } );
    if( existingUser ) {
      throw new Error( 'Email already exists' );
    }

    // Find the role by name
    const role = await Role.findOne( { name: roleName } );
    if( !role ) {
      throw new Error( 'Invalid role name' );
    }

    // Create a new user with the role
    const user = new User( {
      name,
      email,
      password,
      role: role._id
    } );

    // Save the user to the database
    await user.save();
    return user;
  }

  async loginUser( { email, password } ) {
    // Find the user by email
    const user = await User.findOne( { email } ).populate( 'role' );
    if( !user ) {
      throw new Error( 'Invalid email or password' );
    }

    // Compare the password 
    const isMatch = await user.comparePassword( password );
    if( !isMatch ) {
      throw new Error( 'Invalid email or password' );
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return { token, user };
  };
}

export default new AuthService();