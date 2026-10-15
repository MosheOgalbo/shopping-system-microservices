import { Schema, model } from 'mongoose';
import { ADDRESS_PATTERN, NAME_PATTERN } from '../validation/patterns';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: 50,
    match: [NAME_PATTERN, 'First name contains invalid characters'],
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: [2, 'Last name must be at least 2 characters'],
    maxlength: 50,
    match: [NAME_PATTERN, 'Last name contains invalid characters'],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    maxlength: 200,
  },
  address: {
    type: String,
    required: true,
    minlength: [5, 'Address must be at least 5 characters'],
    maxlength: 300,
    match: [ADDRESS_PATTERN, 'Address contains invalid characters'],
    trim: true,
  },
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });

export const User = model('User', userSchema);
