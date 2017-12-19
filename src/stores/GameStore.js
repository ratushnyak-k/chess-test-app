import {
  observable,
  action,
  computed,
} from 'mobx'



export class Game {

  @observable pieceColors = {
    w: 'white',
    b: 'black',
  }
  @observable move = 'w'

  @action
  giveMove = () => {
    this.move = this.move === 'w' ? 'b' : 'w'
  }

  @observable isDragStart = false

  @action
  setDragStatus = (status) => {
    this.isDragStart = status
  }

  @observable draggedPiece

  @action
  setFromSquare = (square) => {
    this.fromSquare = square
  }

  @computed
  get moveState() {
    return this.pieceColors[this.move]
  }

}

export default new Game()

