const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    weight: Number, // kg
    height: Number, // cm
    age: Number,
    gender: {
      type: String,
      enum: ['M', 'F'],
    },
    bmi: Number,
    bmr: Number,
    exerciseIndex: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Users', UserSchema);
