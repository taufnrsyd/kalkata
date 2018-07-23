const assert = require('assert')
const constant = require('../config/constant')
const perform = require('./perform')

const questions = [{
  // 5 + 12 / 4 * 3 - 9 + 2 + 15 / 5 * 4
  // 5 + 9 - 9 + 2 + 12
  // 19
  equation: [
    '5',
    constant.ADDITION,
    '12',
    constant.DIVISION,
    '4',
    constant.MULTIPLICATION,
    '3',
    constant.SUBTRACTION,
    '9',
    constant.ADDITION,
    '2',
    constant.ADDITION,
    '15',
    constant.DIVISION,
    '5',
    constant.MULTIPLICATION,
    '4'
  ],
  answer: 19
}, {
  // 16 + 0 - 20 + 5 * 4 / 2 - 12
  // 16 + 0 - 20 + 10 - 12
  // -6
  equation: [
    '16',
    constant.ADDITION,
    '0',
    constant.SUBTRACTION,
    '20',
    constant.ADDITION,
    '5',
    constant.MULTIPLICATION,
    '4',
    constant.DIVISION,
    '2',
    constant.SUBTRACTION,
    '12'
  ],
  answer: -6
}, {
  // 45 * 12 / 3 + 100 - 4 / 2 * 9 + 156
  // 180 + 100 - 18 + 156
  // 418
  equation: [
    '45',
    constant.MULTIPLICATION,
    '12',
    constant.DIVISION,
    '3',
    constant.ADDITION,
    '100',
    constant.SUBTRACTION,
    '4',
    constant.DIVISION,
    '2',
    constant.MULTIPLICATION,
    '9',
    constant.ADDITION,
    '156'
  ],
  answer: 418
}, {
  // 4186017 + 421500 - 23314 / 4
  // 4186017 + 421500 - 5828.5
  // 4601688
  equation: [
    '4186017',
    constant.ADDITION,
    '421500',
    constant.SUBTRACTION,
    '23314',
    constant.DIVISION,
    '4'
  ],
  answer: 4601689
}]

describe('CALC', function () {
  it('perform calculation correctly', function () {
    questions.forEach(q => {
      assert.equal(perform.calculateResult(q.equation), q.answer)
    })
  })
})
