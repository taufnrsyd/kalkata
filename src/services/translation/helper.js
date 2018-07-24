import cx from 'classnames'
import { numbers } from './dictionary'

/**
 * Wrap the text in HTML element of choice.
 * @param {string} text - Target text
 * @param {object} className - Optional classes
 */
export const wrapText = (text, className) => {
  const classes = cx(className || 'num')
  return `<span class="${classes}">${text}</span>`
}

/** Boolean check on dataset */
export const is = {
  /**
   * Check if text is directly translatable from dictionary.
   * @param {number} num - Number input
   */
  directlyTranslatable: num => typeof numbers[num] !== 'undefined',

  /**
   * Check if text is equal to zero.
   * @param {string} text - Number input
   */
  nil: text => text === 'nol',

  /**
   * Check if number is infinity.
   * @param {string} num - Number input
   */
  infinity: num => num === 'Infinity' || num === 'NaN',
}

/** Translate `foo` item to something else */
export const to = {
  /**
   * Translate text to number.
   * @param {string} text - Number text
   */
  number: text => parseInt(text, 10),

  /**
   * Translate single digit number to hundreds.
   * @param {number} num - Number digit
   */
  hundred: num => to.number(num) * 100,

  /**
   * Translate single digit number to tens.
   * @param {number} num - Number digit
   */
  ten: num => to.number(num) * 10,

  /**
   * Translate single digit number to thousands.
   * @param {string} numtext - Number text
   */
  thousand: numtext => {
    if (is.nil(numtext)) return ''
    // this looks ridiculous but it's the simplest quick hack for casing
    else if (numtext === 'Satu') return 'Seribu'
    else if (numtext === 'satu') return 'seribu'
    else return `${numtext} ribu`
  },

  /**
   * Translate single digit number to millions.
   * @param {string} numtext - Number text
   */
  million: numtext => is.nil(numtext) ? '' : `${numtext} juta`,

  /**
   * Translate single digit number to billions.
   * @param {string} numtext - Number text
   */
  billion: numtext => is.nil(numtext) ? '' : `${numtext} miliar`,

  /**
   * Translate single digit number to trillions.
   * @param {string} numtext - Number text
   */
  trillion: numtext => is.nil(numtext) ? 'triliun' : `${numtext} triliun`,
}
