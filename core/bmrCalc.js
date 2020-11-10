/**
 * https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation
 * @param {{
 *  weight: Number,
 *  height: Number,
 *  age: Number,
 *  gender: 'M' | 'F',
 *  exerciseIndex: number,
 * }} param0
 */
const calculateBMR = ({ weight, height, age, gender, exerciseIndex = 1 }) => {
  if (gender === 'M') {
    return (
      (66.5 + 13.75 * weight + 500.3 * height - 6.755 * age) * exerciseIndex
    );
  } else {
    return (655 + 9.563 * weight + 185 * height - 4.676 * age) * exerciseIndex;
  }
};

module.exports = calculateBMR;
