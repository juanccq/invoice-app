import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Role from '../models/Role.js';

dotenv.config();

class UserService {
  async registerUser( { name, email, password, roleName } ) {
    const existingUser = await User.findOne( { email } );
    if( existingUser ) {
      throw new Error( 'User already exists' );
    }

    // Find the role
    const role = await Role.findOne( { name: roleName } );
    if( !role ) {
      throw new Error( 'Invalid role name' );
    }

    // Has the password
    const hashedPassword = await bcrypt.hash( password, 10 );

    // Create and save the new user
    const user = new User( {
      name, 
      email,
      password: hashedPassword,
      role: role._id
    } );
    await user.save();

    return user;
  }

  async findUserById( userId ) {
    const user = await User.findById( userId ).populate( 'role' );
    if( !user ) {
      throw new Error( 'User not found' );
    }

    return user;
  }

  async findUserByEmail( email ) {
    const user = await User.findOne( { email } ).populate( 'role' );
    if( !user ) {
      throw new Error( 'User not found' );
    }

    return user;
  }

  async getAllUsers() {
    return await User.find().populate( 'role' );
  }

  async updateUser( userId, updates ) {
    const user = await User.findByIdAndUpdate( userId, updates, { new: true } ).populate( 'role' );
    if( !user ) {
      throw new Error( 'User not found' );
    }

    return user;
  }

  async deleteUser( userId ) {
    const user = await User.findByIdAndDelete( userId );
    if( !user ) {
      throw new Error( 'User not found' );
    }
    return user;
  }
};

export default new UserService();