import React from 'react'
import { Card } from 'semantic-ui-react'
import { string } from 'prop-types'

/**
 * Translation output display.
 * @param {string} translation - Translated content
 */
const TranslationOutput = ({ translation }) => (
  <Card content={translation} />
)

TranslationOutput.propTypes = {
  /** Final translation to be displayed */
  translation: string,
}

export default TranslationOutput
