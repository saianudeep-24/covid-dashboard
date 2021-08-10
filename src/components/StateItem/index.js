import {Component} from 'react'

import './index.css'

class StateItem extends Component {
  render() {
    const {eachState, updateSearchInput} = this.props
    const stateData = {
      stateCode: eachState.state_code,
      stateName: eachState.state_name,
    }
    const onClickState = () => {
      updateSearchInput(stateData.stateName, stateData.stateCode)
    }
    return (
      <li className="each-state" onClick={onClickState}>
        <p className="state-name">{stateData.stateName}</p>
        <div className="state-code-dec">
          <p className="state-code">{stateData.stateCode}</p>
          <div className="symbol-border">
            <p className="symbol">&#62;</p>
          </div>
        </div>
      </li>
    )
  }
}
export default StateItem
