import React from 'react'
import { string } from 'prop-types'
import { formatNumber } from '../../services/utils'
import './index.css'

/**
 * Display UI for the calculation.
 * @param {string} calculation - Calculation text
 */
const CalculationDisplay = ({ calculation }) => (
  <div className="kk calc">
    <div className="kk cltx">
      <p>{formatNumber(calculation)}</p>
    </div>
  </div>
)

CalculationDisplay.propTypes = {
  /** The calculation to be displayed */
  calculation: string.isRequired,
}

export default CalculationDisplay
