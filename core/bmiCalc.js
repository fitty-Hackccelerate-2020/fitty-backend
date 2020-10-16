const IDEAL_BMR_LOWER_BOUND = 18.5;
const IDEAL_BMR_UPPER_BOUND = 24.9;

/**
 *
 * @param {{
 *  weight: number,
 *  height: number,
 * }} p
 * @returns {number}
 */
const bmiCalc = ({ weight, height }) => {
  return weight / (height * height);
};

/**
 *
 * @param {{
 *  height: number,
 * }} param0
 * @returns {Array<number, number>} [min-weight, max-weight] range
 */
const weightRange = ({ height }) => {
  const heightSquare = height * height;
  return [
    Math.round(IDEAL_BMR_LOWER_BOUND * heightSquare),
    Math.round(IDEAL_BMR_UPPER_BOUND * heightSquare),
  ];
};

module.exports = {
  bmiCalc,
  weightRange,
};
