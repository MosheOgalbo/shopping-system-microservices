import { Schema, model } from 'mongoose';

const nameRegex = /^[\p{L}\s'-]+$/u;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: 50,
    match: [nameRegex, 'First name contains invalid characters'],
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: [2, 'Last name must be at least 2 characters'],
    maxlength: 50,
    match: [nameRegex, 'Last name contains invalid characters'],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 200,
  },
  address: {
    type: String,
    required: true,
    minlength: [5, 'Address must be at least 5 characters'],
    maxlength: 300,
    trim: true,
  },
});

export const User = model('User', userSchema);
