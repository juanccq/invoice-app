import mongoose from "mongoose";
import Role from "./Role.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  }
}, {
  timestamps: true
});

userSchema.pre( 'save', async function (next) {
  if( !this.isModified('password') ) return next();

  try {
    const bcrypt = await import('bcrypt');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash( this.password, salt );
    next();
  } catch (error) {
    next(error);
  }
} );

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

// Compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  const bcrypt = await import('bcrypt');
  return await bcrypt.compare( candidatePassword, this.password );
};

// Method to check if the user has a specific permission
userSchema.methods.hasPermission = async function (permission) {
  const role = await Role.findById( this.role );
  return role.permissions.includes( permission );
};

const User = mongoose.model( 'User', userSchema );
export default User;