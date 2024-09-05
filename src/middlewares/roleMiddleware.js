const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if(!req.user) {
      return res.status( 401 ).json( { message: 'Unauthorized. No user information found.' } );
    }

    if( req.user.role !== requiredRole ) {
      return res.status( 403 ).json( { message: 'Forbidden. You do not have permission to access this resource.' } );
    }

    next();
  };
};

export default roleMiddleware;