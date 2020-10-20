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
    totalWaterGoal: {
      type: Number,
      default: 10,
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
      type: {
        sleptAt: Number,
        wokeupAt: Number,
      },
      default: {
        sleptAt: 8,
        wokeupAt: 0,
      },
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
