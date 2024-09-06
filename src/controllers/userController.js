import UserService from '../services/userService.js';

class UserController {
  async createUser( req, res ) {
    try {
      const user = await UserService.registerUser( req.body );
      res.status( 201 ).json( { message: 'User created successfully', user } );
    } catch (error) {
      console.error( 'Create User error:', error.message );
      res.status( 400 ).json( { message: error.message } );
    }
  }

  async getAllUsers( req, res ) {
    try {
      const users = await UserService.getAllUsers();
      res.status( 200 ).json( users );
    } catch (error) {
      console.error( 'Get all Users error:', error.message );
      res.status( 500 ).json( { message: 'Server error' } );
    }
  }

  async getUserById( req, res ) {
    try {
      const user = await UserService.findUserById( req.params.id );
      res.status( 200 ).json( user );
    } catch (error) {
      console.error( 'Get User by ID error:', error.message );
      res.status( 404 ).json( { message: error.messaeg } );
    }
  }

  async updateUser( req, res ) {
    try {
      const user = await UserService.updateUser( req.params.id, req.body );
      res.status( 200 ).json( { message: 'User updated successfully', user } );
    } catch (error) {
      console.error( 'Update User error:', error.message );
      res.status( 404 ).json( { message: error.message } );
    }
  }

  async deleteUser( req, res ) {
    try {
      const user = await UserService.deleteUser( req.params.id );
      res.status( 200 ).json( { message: 'User deleted successfully', user } );
    } catch (error) {
      console.error( 'Delete User error:', error.message );
      res.status( 200 ).json( { message: error.message } );
    }
  }
}

export default new UserController();