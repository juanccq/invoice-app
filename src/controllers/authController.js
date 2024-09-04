import AuthService from '../services/authService.js';

class AuthController {
  async register( req, res ) {
    const { name, email, password, roleName } = req.body;

    try {
      const user = await AuthService.registerUser( { name, email, password, roleName } );
      res.status( 201 ).json( { message: 'User registered successfully', user } );
    } catch (error) {
      console.error('Registration error:', error.message);
      res.status( 400 ).json( { message: error.message } );
    }
  };

  async login( req, res ) {
    const { email, password } = req.body;

    try {
      const { token, user } = await AuthService.loginUser( { email, password } );
      res.status( 200 ).json( { token, user, message: 'Login successful' } );
    } catch (error) {
      console.error('Login error:', error.message);
      res.status( 400 ).json( { message: error.message } );
    }
  };
}

export default new AuthController();