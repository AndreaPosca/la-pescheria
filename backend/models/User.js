import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    // required: true,
  },
  cognome: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  googleId: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    trim: true,
  }
}, {
  timestamps: true,
});


const User = mongoose.model('User', userSchema);
export default User;
