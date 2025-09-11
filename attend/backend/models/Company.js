import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
  radius: Number, // meters
});

export default mongoose.model('Company', companySchema);
