import {Component} from 'react'

import './index.css'

class About extends Component {
  render() {
    const {one} = this.props
    return (
      <li className="top-districts-li">
        <p className="top-districts-values">
          {Intl.NumberFormat('en-IN').format(one.conformed)}
        </p>
        <p className="top-districts-name">{one.district}</p>
      </li>
    )
  }
}
export default About
