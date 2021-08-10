import {Link} from 'react-router-dom'

import {Component} from 'react'

import './index.css'

class NavBar extends Component {
  render() {
    return (
      <div className="nav">
        <h1 className="heading">
          COVID19<span className="heading-span">INDIA</span>
        </h1>
        <div className="links">
          <Link className="link1" to="/">
            Home
          </Link>
          <Link className="link2" to="/about">
            About
          </Link>
        </div>
      </div>
    )
  }
}
export default NavBar
