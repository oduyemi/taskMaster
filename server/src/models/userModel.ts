import mongoose, { Schema, Document } from "mongoose";
const bcrypt = require('bcrypt');

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId; 
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

const userSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: "Invalid email format",
    },
  },

  password: {
    type: String,
    required: true,
    validate: {
      validator: (password: string) => {
        // Password length should be at least 8
        // It should contain at least 1 capital letter
        // It should contain at least 1 small letter
        // It should contain at least 1 special character
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[^\s]).{8,}$/.test(password);
      },
      message: "Password must be at least 8 characters long and contain at least one capital letter, one small letter, one digit, and one special character.",
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
      return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


const User = mongoose.model<IUser>("User", userSchema);

export default User;