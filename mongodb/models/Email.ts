import mongoose from 'mongoose';

const EmailSchema = new mongoose.Schema({
  email: String,
}, {
  timestamps: true
});

export default mongoose.models.Email || mongoose.model('Email', EmailSchema);