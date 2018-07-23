import { numbers } from './dictionary'
import { isDirectlyTranslatable, wrapText } from './helper'
import {
  groupNumberToThrees,
  translateGroupOfThrees,
  translateUnitLevel,
} from './make'
import { capitalizeText, formatNumber } from '../utils'

export default {
  /**
   * Make a new translation based on input.
   * @param {number} input - User input
   */
  make: input => new Promise(resolve => {
    // DEVELOPER NOTE
    // --------------
    // We are using promise because translation might take some time to
    // complete. If we don't use promise, there is a chance that the app would
    // retrieve the translation result before the translation process
    // is completed.

    if (input === '') {
      resolve({ input, translation: '' })

    } else if (isDirectlyTranslatable(input)) {
      resolve({ input, translation: wrapText(capitalizeText(numbers[input])) })

    } else {
      const threes = groupNumberToThrees(input)
      const hundreds = translateGroupOfThrees(threes)
      const translation = translateUnitLevel(hundreds)

      resolve({ input, translation })
    }
  }),

  /**
   * Translate the operand into text.
   * @param {string} key - Operand key
   */
  operand: key => {
    switch (key) {
      case '/': return wrapText('Dibagi', { oprd: true })
      case '*': return wrapText('Dikali', { oprd: true })
      case '-': return wrapText('Dikurang', { oprd: true })
      case '+': return wrapText('Ditambah', { oprd: true })
      default: return wrapText('', { oprd: true })
    }
  },

  /**
   * Weave the number data into human-readable text.
   * @param {array} data - Number data
   */
  weaveNumber: data => data.map(
    item => item === null ? '' :
      typeof item === 'object' ?
      item.key :
      formatNumber(item)
  ).reverse().join(' ').trim(),
}
