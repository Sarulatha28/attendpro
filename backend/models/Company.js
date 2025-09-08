import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
  type: { type: String, enum: ["Point"], default: "Point" },
  coordinates: { type: [Number], default: [0, 0] } // [lng, lat]
});

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyId: { type: String, required: true, unique: true },
  geofence: {
    center: { // store as [lng, lat]
      type: [Number],
      default: [0, 0]
    },
    radiusMeters: { type: Number, default: 100 } // geofence radius in meters
  }
});

export default mongoose.model("Company", companySchema);
