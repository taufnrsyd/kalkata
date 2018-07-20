import { groupNumberToThrees } from './translation/make'

/**
 * Format the number to Indonesian format.
 * @param {string} num - Number text
 */
export const formatNumber = num => groupNumberToThrees(num)
  .map(group => group.join(''))
  .reverse()
  .join('.')
  .replace(/^0+/, '')

/**
 * Capitalize first letter of text.
 * @param {string} text - Text string
 */
export const capitalizeText = text =>
  text.charAt(0).toUpperCase() + text.slice(1)
