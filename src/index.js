import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './register-service-worker'

import App from './app'
import './index.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
