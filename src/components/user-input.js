import React from 'react'
import { Card, Input } from 'semantic-ui-react'
import { func, number, oneOfType, string } from 'prop-types'

/**
 * User input component.
 * @param {function} onChange - onChange handler
 * @param {number} value - Input value
 */
const UserInput = ({ onChange, value }) => (
  <Card>
    <Input
      onChange={onChange}
      placeholder="Masukkan angka..."
      type="number"
      value={value}
    />
  </Card>
)

UserInput.propTypes = {
  /** Handle input change event */
  onChange: func.isRequired,

  /** Input value reference from parent component */
  value: oneOfType([ number, string ]).isRequired,
}

export default UserInput
