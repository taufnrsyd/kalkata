export const PAD_ACTIONS = {
  NUMBER: 'PAD_ADD_NUMBER',
  OPERAND: 'PAD_SELECT_OPERAND',
  RESULT: 'PAD_CALCULATE_RESULT',
  REMOVE: 'PAD_REMOVE_NUMBER',
  CLEAR: 'PAD_CLEAR_CALCULATION',
}

export const DIVISION = {
  text: '/',
  className: 'op-div',
  type: PAD_ACTIONS.OPERAND,
  key: '/',
  priority: 4,
}

export const MULTIPLICATION = {
  text: 'X',
  className: 'op-mul',
  type: PAD_ACTIONS.OPERAND,
  key: '*',
  priority: 3,
}

export const SUBTRACTION = {
  text: '-',
  className: 'op-sub',
  type: PAD_ACTIONS.OPERAND,
  key: '-',
  priority: 2,
}

export const ADDITION = {
  text: '+',
  className: 'op-add',
  type: PAD_ACTIONS.OPERAND,
  key: '+',
  priority: 1,
}

export const NUMBER_PADS = [
  /** First row */
  [{
    text: 'AC',
    className: 'alclr',
    type: PAD_ACTIONS.CLEAR,
    key: false,
  }, {
    text: 'C',
    className: 'rmcr',
    type: PAD_ACTIONS.REMOVE,
    key: false,
  }, {
    ...DIVISION
  }],

  /** Second row */
  [{
    text: '7',
    className: 'num-7',
    type: PAD_ACTIONS.NUMBER,
    key: 7,
  }, {
    text: '8',
    className: 'num-8',
    type: PAD_ACTIONS.NUMBER,
    key: 8,
  }, {
    text: '9',
    className: 'num-9',
    type: PAD_ACTIONS.NUMBER,
    key: 9,
  }, {
    ...MULTIPLICATION
  }],

  /** Third row */
  [{
    text: '4',
    className: 'num-4',
    type: PAD_ACTIONS.NUMBER,
    key: 4,
  }, {
    text: '5',
    className: 'num-5',
    type: PAD_ACTIONS.NUMBER,
    key: 5,
  }, {
    text: '6',
    className: 'num-6',
    type: PAD_ACTIONS.NUMBER,
    key: 6,
  }, {
    ...SUBTRACTION
  }],

  /** Fourth row */
  [{
    text: '1',
    className: 'num-1',
    type: PAD_ACTIONS.NUMBER,
    key: 1,
  }, {
    text: '2',
    className: 'num-2',
    type: PAD_ACTIONS.NUMBER,
    key: 2,
  }, {
    text: '3',
    className: 'num-3',
    type: PAD_ACTIONS.NUMBER,
    key: 3,
  }, {
    ...ADDITION
  }],

  /** Fifth row */
  [{
    text: '0',
    className: 'num-0',
    type: PAD_ACTIONS.NUMBER,
    key: 0,
  }, {
    text: '=',
    className: 'rsex',
    type: PAD_ACTIONS.RESULT,
    key: '=',
  }],
]
