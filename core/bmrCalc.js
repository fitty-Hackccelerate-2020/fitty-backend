/**
 * https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation
 * @param {{
 *  weight: Number,
 *  height: Number,
 *  age: Number,
 *  gender: 'M' | 'F'
 * }} param0
 */
const calculateBMR = ({ weight, height, age, gender }) => {
  if (gender === 'M') {
    return 66 + 6.2 * weight + 12.7 * height - 6.76 * age;
  } else {
    return 655.1 + 4.35 * weight + 4.7 * height - 4.7 * age;
  }
};

module.exports = calculateBMR;
