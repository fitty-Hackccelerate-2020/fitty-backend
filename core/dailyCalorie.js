// https://bodymatters.com.au/wp-content/uploads/2010/11/How-much-should-I-be-eating-to-put-on-weight.docx-1.pdf
const CALORIES_TO_INCREASE_ONE_KG = 7000;

/**
 * @param {number} perWeekWeightGoal
 * @returns {number} should consume daily calories to react week goal
 */
const countDailyCalorieConsumption = ({ perWeekWeightGoal }) => {
  return (CALORIES_TO_INCREASE_ONE_KG * perWeekWeightGoal) / 7;
};

module.exports = countDailyCalorieConsumption;
