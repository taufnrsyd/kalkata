import React, { Component } from 'react'

import translation from './services/translation'
import { NUMBER_PADS, PAD_ACTIONS } from './config/constant'
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
   * Number pad tap event handler.
   * @param {object} pad - Pad data
   */
  handleNumberPadTap(pad) {
    if (pad.type === PAD_ACTIONS.NUMBER) {
      let input = `${this.state.input}${pad.key}`

      translation.make(input).then(
        () => {
          this.setState({
            input,
            output: translation.value()
          })
          console.log(this.state.input)
          console.log(this.state.output)
        }
      )
    }
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
