import React from 'react'
import {} from 'semantic-ui-react'
import { func, object } from 'prop-types'

import './pad.css'

/**
 * Pad item for the number pad.
 * @param {object} data - Pad data
 * @param {function} onClick - Click handler
 */
const Pad = ({ data, onClick }) => (
  <button
    className={`kk pad ${data.className}`}
    onClick={() => onClick(data)}
    type="button"
  >
    {data.text}
  </button>
)

Pad.propTypes = {
  /** Object data for the pad item */
  data: object.isRequired,

  /** Handler for tap on pad */
  onClick: func.isRequired,
}

export default Pad
