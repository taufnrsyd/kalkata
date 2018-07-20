import { numbers } from './dictionary'
import { isDirectlyTranslatable } from './helper'
import {
  groupNumberToThrees,
  translateGroupOfThrees,
  translateUnitLevel,
} from './make'

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
      resolve({ input, translation: numbers[input] })

    } else {
      const threes = groupNumberToThrees(input)
      const hundreds = translateGroupOfThrees(threes)
      const translation = translateUnitLevel(hundreds)

      resolve({ input, translation })
    }
  }),
}
