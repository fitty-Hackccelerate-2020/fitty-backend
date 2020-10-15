/**
 * -----------------------------
 * Health and Fitness App server
 * Hackathon: https://www.hackerearth.com/challenges/hackathon/hackccelerate-2020/
 * -----------------------------
 */

const app = require('./setup/main');
const logger = require('./setup/logger');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => logger.info(`SERVER RUNNING AT PORT ${PORT}`));
