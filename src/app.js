import React, { Component } from 'react'
import { TranslationOutput, UserInput } from './components'
import translation from './services/translation'
import './app.css'

class App extends Component {
  state = {
    /** User input value */
    input: '',

    /** Words-translated input */
    output: '',
  }

  /**
   * Input change event handler.
   * @param {object} e - Synthetic event
   */
  handleInputChange(e) {
    const input = e.target.value

    translation.make(input).then(
      () => this.setState({
        input,
        output: translation.value(),
      })
    )
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
