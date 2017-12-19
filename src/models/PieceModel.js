import {
  observable,
  action,
  computed,
} from 'mobx'
import ReactAlert from 'react-s-alert'

import Game from '../stores/GameStore'
import Board from '../stores/BoardStore'

export default class Piece {
  color
  code
  icon
  @observable position

  constructor(code, position) {
    if (typeof code === 'string') {
      this.code = code
      this.formattedCode = code.toLowerCase()
    } else {
      ReactAlert.error('Upload correctly formatted JSON, please!', {
        position: 'bottom-right',
        timeout: 5000,
      })
      return
    }

    if (!pieceConstants[this.formattedCode]) {
      alert(`"${this.code}" encoding does not exist. Please, check your JSON.`)
      return
    }

    this.color = code === code.toUpperCase() ? 'w' : 'b'

    this.icon = pieceConstants[this.formattedCode].icon[this.color]
    this.position = position
  }

  @action
  updatePosition = (position) => {
    this.position = position
  }

  @computed
  get isMyMove() {
    return Game.move === this.color
  }
}

const staticURL = `${process.env.PUBLIC_URL}static/icons/`
export const pieceConstants = {
  'p': {
    icon: {
      'b': `${staticURL}Chess_Black_Pawn.svg`,
      'w': `${staticURL}Chess_White_Pawn.svg`,
    },
    allowedMoves: (dx, dy, fromSquare, toSquare) => {
      const {coordinates: {x}} = fromSquare

      const {color: fromColor, position: fromPosition} = fromSquare.piece
      const {position: toPosition, color: toColor} = toSquare.piece

      const checkAttack = () => {
        if (!toPosition) {
          return dy === 0
        }

        if (fromColor !== toColor &&
          Math.abs(fromPosition.x - toPosition.x) === 1 &&
          Math.abs(fromPosition.y - toPosition.y) === 1) {
          return dy === -1 || dy === 1
        }
      }

      if (fromColor === 'w') {
        const isPieceInFront = Object.keys(Board.initBoard[fromPosition.x - 1][fromPosition.y].piece).length
        return (x === 6 ? (isPieceInFront ? dx === 0 : dx > -3) : dx === -1) && checkAttack()
      } else {
        const isPieceInFront = Object.keys(Board.initBoard[fromPosition.x + 1][fromPosition.y].piece).length
        return (x === 1 ? (isPieceInFront ? dx === 0 : dx < 3) : dx === 1) && checkAttack()
      }
    },
  },
  'n': {
    icon: {
      'b': `${staticURL}Chess_Black_Knight.svg`,
      'w': `${staticURL}Chess_White_Knight.svg`,
    },
    allowedMoves: (dx, dy) => {
      return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
        (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    },
  },
  'r': {
    icon: {
      'b': `${staticURL}Chess_Black_Rook.svg`,
      'w': `${staticURL}Chess_White_Rook.svg`,
    },
    allowedMoves: () => {
    },
  },
  'b': {
    icon: {
      'b': `${staticURL}Chess_Black_Bishop.svg`,
      'w': `${staticURL}Chess_White_Bishop.svg`,
    },
    allowedMoves: () => {
    },
  },
  'k': {
    icon: {
      'b': `${staticURL}Chess_Black_King.svg`,
      'w': `${staticURL}Chess_White_King.svg`,
    },
    allowedMoves: () => {
    },
  },
  'q': {
    icon: {
      'b': `${staticURL}Chess_Black_Queen.svg`,
      'w': `${staticURL}Chess_White_Queen.svg`,
    },
    allowedMoves: () => {
    },
  },
}
