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
    const isNegativeNumber = input.charAt(0) === '-'
    const num = isNegativeNumber ? input.slice(1) : input
    const neg = wrapText('Negatif', { sgn: true })

    // DEVELOPER NOTE
    // --------------
    // We are using promise because translation might take some time to
    // complete. If we don't use promise, there is a chance that the app would
    // retrieve the translation result before the translation process
    // is completed.

    if (num === '') {
      resolve({ input, translation: '' })

    } else if (isDirectlyTranslatable(num)) {
      const text = numbers[num]
      const translation = isNegativeNumber ?
        `${neg} ${wrapText(text)}` :
        wrapText(capitalizeText(text))

      resolve({ input, translation })

    } else {
      const threes = groupNumberToThrees(num)
      const hundreds = translateGroupOfThrees(threes)
      const text = translateUnitLevel(hundreds, isNegativeNumber)
      const translation = isNegativeNumber ? `${neg} ${text}` : text

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
      case '=': return wrapText('Sama dengan', { rs: true })
      default: return wrapText('', { oprd: true })
    }
  },

  /**
   * Weave the number data into human-readable text.
   * @param {array} data - Number data
   */
  weaveNumber: data => data
    .map(item => {
      if (item === null) return ''
      else if (typeof item === 'object') return item.key

      if (item.charAt(0) === '-') {
        const formatted = formatNumber(item.slice(1))
        return `-${formatted}`
      } else {
        return formatNumber(item)
      }
    })
    .join(' ')
    .trim(),
}
