export const PAD_ACTIONS = {
  NUMBER: 'PAD_ADD_NUMBER',
  OPERAND: 'PAD_SELECT_OPERAND',
  SIGN: 'PAD_TOGGLE_SIGN',
  RESULT: 'PAD_CALCULATE_RESULT',
  TOGGLE: 'PAD_TOGGLE_TRANSLATION',
  REMOVE: 'PAD_REMOVE_NUMBER',
  CLEAR: 'PAD_CLEAR_CALCULATION',
}

export const NUMBER_PADS = [
  /** First row */
  [{
    text: 'AC',
    className: 'alclr',
    type: PAD_ACTIONS.CLEAR,
    key: false,
  }, {
    text: '+/-',
    className: 'sign',
    type: PAD_ACTIONS.SIGN,
    key: false,
  }, {
    text: '%',
    className: 'op-mod',
    type: PAD_ACTIONS.OPERAND,
    key: '%',
  }, {
    text: '/',
    className: 'op-div',
    type: PAD_ACTIONS.OPERAND,
    key: '/',
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
    text: 'X',
    className: 'op-mul',
    type: PAD_ACTIONS.OPERAND,
    key: '*',
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
    text: '-',
    className: 'op-sub',
    type: PAD_ACTIONS.OPERAND,
    key: '-',
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
    text: '+',
    className: 'op-add',
    type: PAD_ACTIONS.OPERAND,
    key: '+',
  }],

  /** Fifth row */
  [{
    text: '0',
    className: 'num-0',
    type: PAD_ACTIONS.NUMBER,
    key: 0,
  }, {
    text: 'C',
    className: 'rmcr',
    type: PAD_ACTIONS.REMOVE,
    key: false,
  }, {
    text: 'T',
    className: 'rstg',
    type: PAD_ACTIONS.TOGGLE,
    key: false,
  }, {
    text: '=',
    className: 'rsex',
    type: PAD_ACTIONS.RESULT,
    key: false,
  }],
]
