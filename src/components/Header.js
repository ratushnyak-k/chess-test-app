import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'
import { ChromePicker } from 'react-color'
import Dropdown, {
  DropdownTrigger,
  DropdownContent,
} from 'react-simple-dropdown'


@inject('board')
@inject('game')
@observer
class Header extends React.Component {

  static propTypes = {
    board: PropTypes.shape({
      setColor: PropTypes.func.isRequired,
      black: PropTypes.string.isRequired,
      white: PropTypes.string.isRequired,
    }),
    game: PropTypes.shape({
      moveState: PropTypes.string.isRequired,
    }),
  }

  constructor(props) {
    super(props)
    this.setBlackColor = props.board.setColor.bind(this, 'black')
    this.setWhiteColor = props.board.setColor.bind(this, 'white')
  }

  render() {
    const {game, board} = this.props

    return (
      <div className="header">
        <Dropdown>
          <DropdownTrigger>
            <button>
              Change black squares
            </button>
          </DropdownTrigger>
          <DropdownContent>
            <ChromePicker
              disableAlpha={true}
              color={board.black}
              onChangeComplete={this.setBlackColor}
            />
          </DropdownContent>
        </Dropdown>

        <h3
          style={{
            backgroundColor: game.moveState,
            color: game.moveState === 'black' ? 'white' : 'black',
          }}
        >
          {game.moveState} to move!
        </h3>

        <Dropdown>
          <DropdownTrigger>
            <button>
              Change white squares
            </button>
          </DropdownTrigger>
          <DropdownContent className="right">
            <ChromePicker
              disableAlpha={true}
              color={board.white}
              onChangeComplete={this.setWhiteColor}
            />
          </DropdownContent>
        </Dropdown>
      </div>
    )
  }
}

Header.propTypes = {
  // optionalString: React.PropTypes.string,
}

Header.defaultProps = {}

export default Header
