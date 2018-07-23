import { groupNumberToThrees } from './translation/make'

/**
 * Format the number to Indonesian format.
 * @param {string} num - Number text
 */
export const formatNumber = num => groupNumberToThrees(num)
  .map(group => group.join(''))
  .reverse()
  .join('.')
  // see comments at
  // https://stackoverflow.com/a/6676526/2189848
  .replace(/^0+(?=\d)/, '')

/**
 * Capitalize first letter of text.
 * @param {string} text - Text string
 */
export const capitalizeText = text =>
  text.charAt(0).toUpperCase() + text.slice(1)
