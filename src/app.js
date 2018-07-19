import React, { Component } from 'react'
import { UserInput } from './components'
import './app.css'

class App extends Component {
  state = {
    input: 0,
  }

  /**
   * Input change event handler.
   * @param {object} e - Synthetic event
   */
  handleInputChange(e) {
    console.log('Input changed', e.target.value)
    this.setState({ input: e.target.value })
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <UserInput
          onChange={this.handleInputChange.bind(this)}
          value={this.state.input}
        />
      </div>
    )
  }
}

export default App
