import React, { Component } from 'react'

import calculation from './services/calculation'
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
    /** Flag that a calculation has been performed */
    isCalculated: false,

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
      number.push(forNumber ? '' : null)
      text.push(forNumber ? '' : null)
      pointer++
    } else {
      if (pointer < 1) {
        number = ['']
        text = ['']
        pointer = 0
      } else {
        number.pop()
        text.pop()
        pointer--
      }
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
      case PAD_ACTIONS.OPERAND: return this.handleOperandInput(pad)
      case PAD_ACTIONS.RESULT: return this.performCalculation(pad)
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
    const pointed = this.state.number[this.state.pointer]
    // Wait out for pointer checker below
    const waitOut = setTimeout(() => {
      const number = this.state.number[this.state.pointer]
      const input = `${number}${pad.key}`

      clearTimeout(waitOut)
      translation.make(input).then(this.updateNumberAndText.bind(this))
    }, 50)

    if (this.state.isCalculated) {
      // if the app has completed a calculation,
      // clear up the previous one to start a new calculation
      this.clearCalculation()
    } else if (typeof pointed === 'object') {
      // if the current las item of the number is an operand
      // move the pointer forward and add a new member for number in the array
      this.movePointer({ isForward: true, forNumber: true })
    }
  }

  /**
   * Handle operand input tap.
   * @param {object} pad - Pad data
   */
  handleOperandInput(pad) {
    const pointed = this.state.number[this.state.pointer]
    // Wait out for pointer checker below
    const waitOut = setTimeout(() => {
      let number = [...this.state.number]
      let text = [...this.state.text]

      clearTimeout(waitOut)
      number[this.state.pointer] = pad
      text[this.state.pointer] = translation.operand(pad.key)
      this.setState({ number, text })
    }, 50)

    if (this.state.isCalculated) {
      // if the app has completed a calculation,
      // immediately use the result as the starting point for this calculation
      this.pickUpCalculation()
    } else if (typeof pointed === 'string') {
      // if the current las item of the number is a number
      // move the pointer forward and add a new member for operand in the array
      this.movePointer({ isForward: true, forNumber: false })
    }
  }

  /**
   * Perform the calculation based on current calculation.
   * @param {object} pad - Pad data
   */
  performCalculation(pad) {
    calculation.perform(this.state.number)
      .then(resp => translation.make(`${resp.result}`))
      .then(resp => {
        let number = [...this.state.number].concat([
          pad,
          resp.input
        ])
        let text = [...this.state.text].concat([
          translation.operand(pad.key),
          resp.translation
        ])

        this.setState({
          number,
          text,
          isCalculated: true,
        })
      })
  }

  /**
   * Handle number input removal.
   */
  handleInputRemove() {
    const currentItem = this.state.number[this.state.pointer]
    const isOperandRemoval = typeof currentItem === 'object'
    // Wait out for pointer checker below
    const waitOut = setTimeout(() => {
      const newItem = this.state.number[this.state.pointer]

      clearTimeout(waitOut)
      if ( ! isOperandRemoval && typeof newItem === 'string') {
        const sliced = newItem.slice(0, newItem.length - 1)

        if (sliced === '') {
          this.movePointer({ isForward: false })
        } else {
          translation.make(sliced).then(this.updateNumberAndText.bind(this))
        }
      }
    }, 50)

    if (this.state.isCalculated) {
      // if the app has completed a calculation,
      // immediately clear that one first
      this.clearCalculation()
    } else if (isOperandRemoval || currentItem === '') {
      // otherwise, move the pointer backward depending on the current item
      this.movePointer({ isForward: false })
    }
  }

  /**
   * Clear the whole calculation.
   */
  clearCalculation() {
    this.setState({
      number: [''],
      pointer: 0,
      text: [''],
      isCalculated: false,
    })
  }

  /**
   * Partially clear the calculation to pick up for a new one.
   */
  pickUpCalculation() {
    const pointTo = this.state.pointer + 2
    const number = [this.state.number[pointTo], null]
    const text = [this.state.text[pointTo], null]

    this.setState({
      number,
      text,
      pointer: 1,
      isCalculated: false,
    })
  }

  /**
   * Render the component.
   */
  render() {
    console.log(this.state)
    const number = translation.weaveNumber(this.state.number)

    return (
      <div className="the-app">
        <div className="display-area">
          <TranslationDisplay translation={this.state.text} />
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
