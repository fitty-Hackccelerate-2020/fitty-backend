const mongoose = require('mongoose');

const DailyTaskSchema = new mongoose.Schema(
  {
    caloriesToConsume: {
      type: Number,
      required: true,
    },
    drankWater: {
      type: Number,
      default: 0,
    },
    caloriesConsumed: {
      type: Number,
      default: 0,
    },
    diet: [
      {
        foodName: String,
        quantity: String,
        caloriesGot: Number,
      },
    ],
    sleep: {
      sleptAt: Date,
      wokeupAt: Date,
    },
    workout: [
      {
        workoutName: String,
        caloriesBurnt: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('DailyTask', DailyTaskSchema);
