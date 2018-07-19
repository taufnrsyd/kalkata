import React, { Component } from 'react'

import translation from './services/translation'
import { NUMBER_PADS } from './config/constant'
import {
  NumberPad,
  // TranslationOutput,
  // UserInput,
} from './components'
import './app.css'

class App extends Component {
  state = {
    /** User input value */
    input: '',

    /** Words-translated input */
    output: '',

    /** List of buttons on number pad */
    pads: NUMBER_PADS,
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
   * Number pad tap event handler.
   * @param {object} pad - Pad data
   */
  handleNumberPadTap(pad) {
    console.log('Pad clicked', pad)
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div className="the-app">
        {/*
        <UserInput
          onChange={this.handleInputChange.bind(this)}
          value={this.state.input}
        />
        <TranslationOutput translation={this.state.output} />
        */}

        <div className="display-area"></div>

        <NumberPad
          pads={this.state.pads}
          onClick={this.handleNumberPadTap.bind(this)}
        />
      </div>
    )
  }
}

export default App
