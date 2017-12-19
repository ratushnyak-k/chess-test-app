import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

import Game from './stores/GameStore'
import Board from './stores/BoardStore'

import App from './App'
import './styles/index.styl'

ReactDOM.render(
  <Provider
    game={Game}
    board={Board}
  >
    <App />
  </Provider>
  , document.getElementById('root'),
)
