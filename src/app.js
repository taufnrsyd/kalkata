import React, { Component } from 'react'

import translation from './services/translation'
import { NUMBER_PADS, PAD_ACTIONS } from './config/constant'
import {
  CalculationDisplay,
  NumberPad,
  TranslationDisplay,
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
        () => this.setState({
          input,
          output: translation.value()
        })
      )
    }
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div className="the-app">
        <div className="display-area">
          <TranslationDisplay translation={this.state.output} />
          <CalculationDisplay calculation={this.state.input} />
        </div>

        <NumberPad
          pads={this.state.pads}
          onClick={this.handleNumberPadTap.bind(this)}
        />
      </div>
    )
  }
}

export default App
