// models/contactModel.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  group: { type: String } // Optional - for bonus filter feature
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
