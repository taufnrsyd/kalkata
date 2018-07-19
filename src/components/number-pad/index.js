import React from 'react'
import {} from 'semantic-ui-react'
import { array, func } from 'prop-types'

import Pad from './pad'
import './index.css'

/**
 * Clickable number pad.
 * @param {array} pads - Pads list
 * @param {function} onClick - Click handler
 */
const NumberPad = ({ pads, onClick }) => (
  <div className="kk npad">
    {pads.map((row, i) => (
      <div
        className="kk npad row"
        key={i}
      >

        {row.map((pad, i) => (
          <Pad
            data={pad}
            key={i}
            onClick={onClick}
          />
        ))}

      </div>
    ))}
  </div>
)

NumberPad.propTypes = {
  /** Handler for tap on pad */
  onClick: func.isRequired,

  /** The list of pads to be displayed */
  pads: array.isRequired,
}

export default NumberPad
