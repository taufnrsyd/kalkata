import { numbers } from './dictionary'

/**
 * Check if text is directly translatable from dictionary.
 * @param {number} num - Number input
 */
export const isDirectlyTranslatable = num => typeof numbers[num] !== 'undefined'

/**
 * Check if text is equal to zero.
 * @param {string} text - Number input
 */
export const isNil = text => text === 'nol'

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
    if (isNil(numtext)) return ''
    else if (numtext === 'satu') return 'seribu'
    else return `${numtext} ribu`
  },

  /**
   * Translate single digit number to millions.
   * @param {string} numtext - Number text
   */
  million: numtext => isNil(numtext) ? '' : `${numtext} juta`,

  /**
   * Translate single digit number to billions.
   * @param {string} numtext - Number text
   */
  billion: numtext => isNil(numtext) ? '' : `${numtext} miliar`,

  /**
   * Translate single digit number to trillions.
   * @param {string} numtext - Number text
   */
  trillion: numtext => isNil(numtext) ? 'triliun' : `${numtext} triliun`,
}
