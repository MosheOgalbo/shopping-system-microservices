import { Schema, model } from 'mongoose';


const nameRegex = /^[A-Za-z\u0590-\u05FF ]+$/; // עברית/אנגלית ורווחים בלבד


const userSchema = new Schema({
firstName: {
    type: String,
    required: true,
    minlength: [2, 'First name must be at least 2 characters'],
    match: [nameRegex, 'First name contains invalid characters'],
    trim: true
  },
   lastName: {
    type: String,
    required: true,
    minlength: [2, 'Last name must be at least 2 characters'],
    match: [nameRegex, 'Last name contains invalid characters'],
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Email must be valid'],
    lowercase: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    minlength: [5, 'Address must be at least 5 characters'],
    trim: true
  }
});

export const User = model('User', userSchema);
