const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema(
  {
    whoseTask: {
      type: mongoose.Schema.ObjectId,
      ref: 'Users',
      required: true,
    },
    goalWeight: {
      type: Number,
      required: true,
    },
    perWeekWeightGoal: {
      type: Number,
      required: true,
    },
    dailyCalorieConsumption: {
      type: Number,
      required: true,
    },
    todayTask: {
      type: mongoose.Schema.ObjectId,
      ref: 'DailyTask',
      required: true,
    },
    history: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'DailyTask',
      },
    ],
    // make sure to disable this once task is completed
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Tasks', TasksSchema);
