import React, { Component } from 'react'
import { TranslationOutput, UserInput } from './components'
import './app.css'

class App extends Component {
  state = {
    /** User input value */
    input: 0,

    /** Words-translated input */
    output: '',
  }

  /**
   * Input change event handler.
   * @param {object} e - Synthetic event
   */
  handleInputChange(e) {
    this.setState({
      input: e.target.value,
      output: e.target.value,
    })
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

        <TranslationOutput translation={this.state.output} />
      </div>
    )
  }
}

export default App
