import {
  observable,
  computed,
  action,
} from 'mobx'

import Game from '../stores/GameStore'
import Board from '../stores/BoardStore'
import Piece, { pieceConstants } from './PieceModel'

const rangeOfFiles = ['a', 'c', 'e', 'g']

class Square {
  code
  file
  rank
  coordinates
  @observable.ref piece = {}

  constructor(code, coordinates, pieceCode) {
    this.code = code
    const codeArr = code.split('')

    this.file = codeArr[0]
    this.rank = codeArr[1]
    this.coordinates = coordinates

    if (pieceCode) {
      this.piece = new Piece(pieceCode, coordinates)
    }
  }

  @computed
  get color() {
    if (this.rank % 2) {
      return rangeOfFiles.includes(this.file) ? Board.black : Board.white
    } else {
      return rangeOfFiles.includes(this.file) ? Board.white : Board.black
    }
  }

  @computed
  get canMoveTo() {
    const {x, y} = Game.fromSquare.coordinates
    const {color, formattedCode} = Game.fromSquare.piece
    const dx = this.coordinates.x - x
    const dy = this.coordinates.y - y

    return (
      color !== this.piece.color &&
      pieceConstants[formattedCode].allowedMoves(dx, dy, Game.fromSquare, this)
    )
  }

  @action
  setNewPiece = (piece) => {
    piece.updatePosition(this.coordinates)
    this.piece = piece
  }

  @action
  removePiece = () => {
    this.piece = {}
  }
}

export default Square