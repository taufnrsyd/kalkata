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
    number: [''],

    /** List of buttons on number pad */
    pads: NUMBER_PADS,

    /** Pointer for the calculation object to be interacted with */
    pointer: 0,

    /** Words-translated input */
    text: [''],
  }

  /**
   * Move target pointer.
   * @param {boolean} isForward - Move forward
   * @param {boolean} forNumber - Point for number
   */
  movePointer({ isForward, forNumber }) {
    let number = [...this.state.number]
    let text = [...this.state.text]
    let { pointer } = this.state

    if (isForward) {
      number.push(forNumber ? '' : {})
      text.push(forNumber ? '' : {})
      pointer++
    } else {
      number.pop()
      text.pop()
      pointer--
    }

    this.setState({ number, text, pointer })
  }

  /**
   * Callback handler for translation promise.
   * @param {object} res - Translation result
   */
  updateNumberAndText(res) {
    let number = [...this.state.number]
    let text = [...this.state.text]

    number[this.state.pointer] = res.input
    text[this.state.pointer] = res.translation
    this.setState({ number, text })
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
    let pointed = this.state.number[this.state.pointer]
    let input

    if (typeof pointed === 'object') {
      this.movePointer({ isForward: true, forNumber: true })
    }

    pointed = this.state.number[this.state.pointer]
    input = `${pointed}${pad.key}`

    translation.make(input).then(this.updateNumberAndText.bind(this))
  }

  handleOperandInput(pad) {
    //
  }

  /**
   * Handle number input removal.
   */
  handleInputRemove() {
    let pointed = this.state.number[this.state.pointer]
    let input

    if (typeof pointed === 'object') {
      this.movePointer({ isForward: false })
    }

    pointed = this.state.number[this.state.pointer]
    input = pointed.slice(0, pointed.length - 1)

    translation.make(input).then(this.updateNumberAndText.bind(this))
  }

  /**
   * Clear the whole calculation.
   */
  clearCalculation() {
    this.setState({
      number: [''],
      pointer: 0,
      text: [''],
    })
  }

  /**
   * Render the component.
   */
  render() {
    const number = this.state.number.join(' ').trim()
    const text = this.state.text.join(' ').trim()

    return (
      <div className="the-app">
        <div className="display-area">
          <TranslationDisplay translation={text} />
          <CalculationDisplay calculation={number} />
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
