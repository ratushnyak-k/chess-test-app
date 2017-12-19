import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'
import SquareModel from '../models/SquareModel'

@inject('game')
@observer
class Square extends React.Component {
  static propTypes = {
    square: PropTypes.instanceOf(SquareModel),
    game: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.setDragStatusAsFalse = this.setDragStatus.bind(this, false)
  }

  prevent = (e) => {
    e.preventDefault()
  }

  onDrop = (e) => {
    this.prevent(e)
    const {square, game} = this.props
    if (square.canMoveTo) {
      square.setNewPiece(game.fromSquare.piece)
      game.fromSquare.removePiece()
      game.giveMove()
    }
    game.setDragStatus(false)
  }

  onMouseDown = () => {
    const {square, game} = this.props
    if (square.piece.isMyMove) {
      game.setFromSquare(square)
      game.setDragStatus(true)
    }
  }

  setDragStatus = (bool) => {
    this.props.game.setDragStatus(bool)
  }

  render() {
    const {square, game} = this.props
    const squareStyle = {
      background: game.isDragStart &&
      square.canMoveTo ? 'green' : square.color,
    }
    return (
      <div
        className="square"
        key={square.code}
        style={squareStyle}
        onDrop={this.onDrop}
        onMouseUp={this.setDragStatusAsFalse}
        onDragOver={this.prevent}
      >
        {
          square.piece.icon &&
          <div
            className="piece"
            style={{backgroundImage: `url(${square.piece.icon})`}}
            onMouseDown={this.onMouseDown}
            draggable={square.piece.isMyMove}
          />
        }
        <span>{square.code}</span>
      </div>
    )
  }
}

export default Square
