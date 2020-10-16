/**
 * Task model contains todayTask.
 * It is required to replace that column with new value
 * & place old value to Task's history
 */

const cron = require('node-cron');

const logger = require('../setup/logger');
const Tasks = require('../models/Tasks');
const DailyTask = require('../models/DailyTask');

cron
  .schedule('0 0 * * * *', async () => {
    logger.info('Starting cron job..');
    try {
      const activeTasks = await Tasks.find({ active: true });

      activeTasks.forEach(async (activeTask) => {
        const yesterdaysTask = activeTask.todayTask;
        const newTask = await DailyTask.create({
          caloriesToConsume: activeTask.dailyCalorieConsumption,
        });

        await Tasks.findOneAndUpdate(
          { _id: activeTask._id },
          {
            todayTask: newTask,
            $push: {
              history: yesterdaysTask,
            },
          }
        );
      });
    } catch (e) {
      logger.error(e);
    } finally {
      logger.info('Cron job done.');
    }
  })
  .start();
