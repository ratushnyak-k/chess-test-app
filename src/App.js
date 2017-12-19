import React from 'react'
import PropTypes from 'prop-types'
import {
  observer,
  inject,
} from 'mobx-react'
import ReactAlert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css'


import Header from './components/Header'
import Footer from './components/Footer'
import ChessBoard from './components/ChessBoard'
import Form from './components/Form'

@inject('board')
@observer
class App extends React.Component {

  static propTypes = {
    board: PropTypes.shape({
      setupBoard: PropTypes.func.isRequired,
      getCurrentStateInJSONFormat: PropTypes.array.isRequired,
    }),
  }

  constructor(props) {
    super(props)
    props.board.setupBoard()
  }

  render() {
    return (
      <div>
        <Header />
        <ReactAlert stack={{limit: 3}} />
        <ChessBoard />
        <Form />
        <Footer
          getCurrentStateInJSONFormat={this.props.board.getCurrentStateInJSONFormat}
        />
      </div>
    )
  }
}

export default App
