import {Component} from 'react'

import './index.css'

class EachQuestion extends Component {
  render() {
    const {all} = this.props
    console.log(all)
    return (
      <li className="About-li">
        <p className="question">{all.question}</p>
        <p className="answer">{all.answer}</p>
      </li>
    )
  }
}

export default EachQuestion
