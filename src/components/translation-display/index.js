import React, { Component } from 'react'
import { array } from 'prop-types'
import './index.css'

class TranslationDisplay extends Component {
  static propTypes = {
    /** Final translation to be displayed */
    translation: array,
  }

  /**
   * Setup constructor based on props.
   * @param {object} props - Component props
   */
  constructor(props) {
    super(props)
    this.textWrapper = React.createRef()
  }

  /**
   * Keep the view scrolled to bottom on content updated.
   */
  componentDidUpdate() {
    const element = this.textWrapper.current
    element.scrollTop = element.scrollHeight
  }

  /**
   * Render the display.
   */
  render() {
    return (
      <div className="kk trns">
        <div
          className="kk trtx"
          ref={this.textWrapper}
        >
          {this.props.translation.map((line, i) => (
            <p
              key={i}
              dangerouslySetInnerHTML={{__html: line}}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default TranslationDisplay
