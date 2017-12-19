import {
  action,
  computed,
  observable,
  toJS,
} from 'mobx'
import ReactAlert from 'react-s-alert'

import Storage from '../utils/Storage'
import Square from '../models/SquareModel'


const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1']
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const initData = {
  'a8': 'r',
  'b8': 'n',
  'c8': 'b',
  'd8': 'k',
  'e8': 'q',
  'f8': 'b',
  'g8': 'n',
  'h8': 'r',
  'a7': 'p',
  'b7': 'p',
  'c7': 'p',
  'd7': 'p',
  'e7': 'p',
  'f7': 'p',
  'g7': 'p',
  'h7': 'p',

  'a1': 'R',
  'b1': 'N',
  'c1': 'B',
  'd1': 'K',
  'e1': 'Q',
  'f1': 'B',
  'g1': 'N',
  'h1': 'R',
  'a2': 'P',
  'b2': 'P',
  'c2': 'P',
  'd2': 'P',
  'e2': 'P',
  'f2': 'P',
  'g2': 'P',
  'h2': 'P',
}
const chessKey = 'chessKey'

class Board {
  initData = Storage.get(chessKey) || initData
  @observable.ref initBoard = []

  @observable black = '#802020'
  @observable white = '#fff'

  @action
  setupBoard = (data = this.initData) => {
    let tempBoard = []
    RANKS.forEach((rank, x) => {
      let row = []
      FILES.forEach((file, y) => {
        const squareCode = file + rank

        row = [...row, new Square(squareCode, {x, y}, data[squareCode])]
      })
      tempBoard = [...tempBoard, row]
    })
    this.initBoard = tempBoard
  }

  @action
  setColor = (type, {hex}) => {
    const otherType = type === 'white' ? 'black' : 'white'
    if (this[otherType] === hex) return

    this[type] = hex
  }

  @computed
  get getCurrentStateInJSONFormat() {
    return toJS(this.initBoard).map(row => row.map(square => {
      return {
        [square.code]: square.piece.code,
      }
    }))
  }

  @action
  resetBoard = () => {
    this.setupBoard(initData)
  }

  saveToStorage = () => {
    let tempObject = {}
    this.getCurrentStateInJSONFormat.forEach(row => row.forEach(square => {
      const key = Object.keys(square)[0]
      tempObject[key] = square[key]
    }))
    Storage.set(chessKey, tempObject)
    ReactAlert.success('Saved!', {
      position: 'bottom-right',
      timeout: 5000,
    })
  }
}

export default new Board()