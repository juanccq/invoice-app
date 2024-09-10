import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function authMiddleware( req, res, next ) {
  const token = req.headers[ 'authorization' ];

  if( !token ) {
    return res.status( 401 ).json( { message: 'Access denied. No token provided' } );
  }

  try {
    const decoded = jwt.verify( token.split( ' ' )[1], process.env.JWT_SECRET );
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth verification error:', error.message);
    res.status( 401 ).json( { message: 'Invalid token' } );
  }
}

export default authMiddleware;