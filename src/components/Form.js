import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'
import ReactAlert from 'react-s-alert'

@inject('board')
@observer
class UploadForm extends React.Component {
  static propTypes = {
    board: PropTypes.shape({
      setupBoard: PropTypes.func.isRequired,
      saveToStorage: PropTypes.func.isRequired,
      resetBoard: PropTypes.func.isRequired,
    }),
  }

  onChange = (e) => {
    if (!e.target.files.length) {
      return false
    }
    const arrayName = e.target.files[0].name.split('.')
    const {length} = arrayName

    if (!(arrayName[length - 1].toLowerCase() === 'json')) {
      ReactAlert.error('Only JSON type files are allowed to upload', {
        position: 'bottom-right',
        timeout: 5000,
      })
      return
    }

    const fr = new FileReader()
    fr.onload = (e) => {
      const result = JSON.parse(e.target.result)
      this.props.board.setupBoard(result)
    }
    fr.readAsText(e.target.files[0])
  }

  render() {
    return (
      <div className="form">

        <label className="label" htmlFor="file">
          Upload JSON
          <input
            id="file"
            className="file"
            type="file"
            onChange={this.onChange}
          />
        </label>

        <a
          className="label"
          href={`${process.env.PUBLIC_URL}init.json`}
          download={true}
        >
          Download example
        </a>

        <button
          className="label"
          onClick={this.props.board.saveToStorage}
        >
          Save
        </button>

        <button
          className="label"
          onClick={this.props.board.resetBoard}
        >
          Reset
        </button>
      </div>
    )
  }
}

UploadForm.propTypes = {
  // optionalString: React.PropTypes.string,
}

UploadForm.defaultProps = {}

export default UploadForm
