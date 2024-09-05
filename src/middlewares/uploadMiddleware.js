import multer from 'multer';
import path from 'path';
import config from '../config/config.js';

const uploadDir = config.uploadDir;

const storage = multer.diskStorage( {
  destination: function (req, file, cb) {
    cb( null, uploadDir );
  },
  filename: function( req, file, cb ) {
    cb( null, `${Date.now()}-${file.originalname}` );
  }
} );

function fileFilter( req, file, cb ) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test( path.extname( file.originalname ).toLowerCase() );
  const mimetype = filetypes.test( file.mimetype );

  if( mimetype && extname ) {
    return cb( null, true );
  }
  else {
    cb( new Error( 'Only images are allowed' ) );
  }
}

const upload = multer( {
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
} );

export default upload;