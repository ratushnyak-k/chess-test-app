import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'
import ReactAlert from 'react-s-alert'

import Row from './Row'

@inject('board')
@observer
class BoardComponent extends React.Component {
  static propTypes = {
    board: PropTypes.shape({
      initBoard: PropTypes.array.isRequired,
    }),
  }

  componentDidMount() {
    ReactAlert.warning('Unfortunately, only the PAWN and KNIGHT pieces was developed :(', {
      position: 'top-right',
      timeout: 60000,
    })
  }

  render() {
    return (
      <div className="board">
        {
          this.props.board.initBoard.map((row, i) => {
            return <Row
              key={i + '-row'}
              row={row}
            />
          })
        }
      </div>
    )
  }
}

export default BoardComponent
