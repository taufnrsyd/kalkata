import React from 'react'
import { string } from 'prop-types'
// import { capitalizeText } from '../../services/utils'
import './index.css'

/**
 * Translation output display.
 * @param {string} translation - Translated content
 */
const TranslationDisplay = ({ translation }) => (
  <div className="kk trns">
    <div className="kk trtx">
      <p dangerouslySetInnerHTML={{__html: translation}} />
    </div>
  </div>
)

TranslationDisplay.propTypes = {
  /** Final translation to be displayed */
  translation: string,
}

export default TranslationDisplay
