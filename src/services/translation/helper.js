import { numbers } from './dictionary'

/**
 * Check if text is directly translatable from dictionary.
 * @param {number} num - Number input
 */
export const isDirectlyTranslatable = num => typeof numbers[num] !== 'undefined'

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
    if (numtext === 'nol') return ''
    else if (numtext === 'satu') return 'seribu'
    else return `${numtext} ribu`
  },

  /**
   * Translate single digit number to millions.
   * @param {string} numtext - Number text
   */
  million: numtext => `${numtext} juta`,
}
