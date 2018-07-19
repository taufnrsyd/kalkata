import { numbers } from './dictionary'
import { isDirectlyTranslatable, isNil, to } from './helper'

/**
 * Translate the group of threes into text.
 * @param {array} threes - Grouped number
 */
export const translateGroupOfThrees = threes => threes.map(group => {
  const num = to.number(group.join(''))

  if (isDirectlyTranslatable(num)) {
    // number is directly translatable, just return from the dictionary
    return numbers[num]

  } else if (num % 100 < 20) {
    // the last two digits of the number is in `belasan`,
    // directly translate the last two digits
    const hundred = to.hundred(group[0])
    const tens = to.number(`${group[1]}${group[2]}`)

    return `${numbers[hundred]} ${numbers[tens]}`.trim()
  }

  // otherwise, translate each digit on the number based on its position
  return group.map((raw, i) => {
    const num = to.number(raw)

    // `0` means empty string
    if (num < 1) return ''

    switch (i) {
      case 0: return numbers[to.hundred(num)]
      case 1: return numbers[to.ten(num)]
      default: return numbers[num]
    }
  }).join(' ').trim()
})

/**
 * Translate the unit level of groups of threes.
 * @param {array} hundreds - Translated groups
 */
export const translateUnitLevel = hundreds => hundreds.map((unit, i) => {
  switch (true) {
    case i % 4 === 1: return to.thousand(unit)
    case i % 4 === 2: return to.million(unit)
    case i % 4 === 3: return to.billion(unit)
    case i % 4 === 0 && i > 0: return to.trillion(unit)
    default: return isNil(unit) ? '' : unit
  }
}).reverse().filter(text => text !== '').join(' ').trim()

/**
 * Group the number's digits into group of threes.
 * @param {string} num - Number input
 */
export function groupNumberToThrees(num) {
  let numberGroups = []
  let ng = []

  // slice the number into group of threes
  // this is to handle: thousands, millions, etc unit cases
  for (let i = num.length - 1; i >= 0; i--) {
    ng.unshift(num.charAt(i))

    if (ng.length > 2 || i < 1) {
      // ensure the group has length of three
      while (ng.length < 3) {
        ng.unshift('0')
      }

      numberGroups.push(ng)
      ng = []
    }
  }

  return numberGroups
}
