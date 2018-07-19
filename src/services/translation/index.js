import { numbers } from './dictionary'
import { isDirectlyTranslatable } from './helper'
import {
  groupNumberToThrees,
  translateGroupOfThrees,
  translateUnitLevel,
} from './make'

/** Holds singleton data for the translation service */
const state = {
  /** Latest translated text */
  translation: ''
}

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
      state.translation = ''
      resolve()
    } else if (isDirectlyTranslatable(input)) {
      state.translation = numbers[input]
      resolve()
    } else {
      const threes = groupNumberToThrees(input)
      const hundreds = translateGroupOfThrees(threes)
      const translated = translateUnitLevel(hundreds)

      state.translation = translated
      resolve()
    }
  }),

  /**
   * Get the current translation result.
   */
  value: () => state.translation,
}
