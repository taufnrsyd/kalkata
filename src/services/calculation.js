import { to } from './translation/helper'

/**
 * Check whether operand is of high priority.
 * @param {object} operand - Operand data
 */
const operandIsHigh = operand =>
  typeof operand === 'undefined' ? false : operand.priority > 2

/**
 * Operate with the given equation.
 * @param {number} left - First number
 * @param {string} key - Operation type
 * @param {number} right - Second number
 */
function operate(left, key, right) {
  switch (key) {
    case '/': return left / right
    case '*': return left * right
    case '-': return left - right
    case '+': return left + right
    default: return null
  }
}

/**
 * Simplify the current equation by eliminating multiplications and divisions.
 * @param {array} toSolve - Original equation
 */
function simplifyEquation(toSolve) {
  let simplified = []
  let leftRef = null

  // The idea is to complete the multiplication and division operations first
  // so that we can find the answer easily by doing
  // simple addition and subtraction later
  for (let i = 1; i < toSolve.length; i += 2) {
    const operand = toSolve[i]
    const left = toSolve[i - 1]
    const right = toSolve[i + 1]
    // flag that operand to the left is of high priority
    const prevIsHigh = operandIsHigh(toSolve[i - 2])
    // flag that operand to the right is of high priority
    const nextIsHigh = operandIsHigh(toSolve[i + 2])

    // the current operand is of high priority
    // operate on it first
    if (operandIsHigh(operand)) {
      if (leftRef === null) {
        // referenced left side number is not defined
        // use the left side number from array instead
        leftRef = operate(left, operand.key, right)
      } else {
        // referenced left side number is defined
        // use it instead of the number from array
        leftRef = operate(leftRef, operand.key, right)
      }

      // If next operand is still of high priority,
      // we will keep on operating on them.
      // Otherwise, we immediately put the result into the simplified equation
      // and then rinse the left referenced number `leftRef`
      if ( ! nextIsHigh) {
        simplified.push(leftRef)
        leftRef = null
      }
    }

    // the current operand is NOT of high priority
    // put it onto simplified equation
    else {
      // when the operand to the left is of high priority,
      // we would not care about the number to the left of this operand
      // since it's already operated on by the higher priority operand.
      if (prevIsHigh) simplified.push(operand)
      else simplified = simplified.concat([ left, operand ])

      // ensure the `leftRef` is rinsed
      leftRef = null
      // if we have reached the end of the array,
      // immediately include the right side number to the simplified equation
      if (i + 2 >= toSolve.length) simplified.push(right)
    }
  }

  return simplified
}

/**
 * Calculate the result of the given equation
 * @param {array} equation - The question
 */
function calculateResult(equation) {
  // create a copy of the equation to avoid modifying the original object
  const toSolve = equation.map(
    item => typeof item === 'object' ? {...item} : to.number(item)
  )
  const simplified = simplifyEquation(toSolve)
  let answer = simplified[0]

  // Iterate through the simplified equation to find the final answer
  for (let i = 1; i < simplified.length; i += 2) {
    const operand = simplified[i]
    const right = simplified[i + 1]

    // simply add or subtract based on the operand key
    answer += operand.key === '+' ? right : -right
  }

  // return a rounded answer since we are not aiming for full accuracy
  // the demo is much more about the translation
  // instead of full blown calculator
  return Math.round(answer)
}

export default {
  /**
   * Perform the calculation based on supplied data
   * @param {array} data - Calculation data
   */
  perform: data => new Promise(resolve => {
    // Immediately resolve result to `0` if calculation is not complete
    // A complete calculation has 3 elements: 2 numbers and 1 operands
    if (data.length < 3) resolve({ data, result: 0 })
    // Otherwise calculate the result for the app
    else resolve({ data, result: calculateResult(data) })
  }),
}
