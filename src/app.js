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
    switch (pad.type) {
      case PAD_ACTIONS.NUMBER: return this.handleNumberInput(pad)
      case PAD_ACTIONS.REMOVE: return this.handleInputRemove()
      case PAD_ACTIONS.CLEAR: return this.clearCalculation()
      default: return
    }
  }

  /**
   * Handle number input tap.
   * @param {object} pad - Pad data
   */
  handleNumberInput(pad) {
    const input = `${this.state.input}${pad.key}`

    translation.make(input).then(
      () => this.setState({
        input,
        output: translation.value()
      })
    )
  }

  /**
   * Handle number input removal.
   */
  handleInputRemove() {
    let { input } = this.state

    input = input.slice(0, input.length - 1)

    translation.make(input).then(
      () => this.setState({
        input,
        output: translation.value()
      })
    )
  }

  /**
   * Clear the whole calculation.
   */
  clearCalculation() {
    this.setState({
      input: '',
      output: ''
    })
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
