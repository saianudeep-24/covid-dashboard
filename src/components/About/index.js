import {Component} from 'react'

import Loader from 'react-loader-spinner'

import EachQuestion from '../EachQuestion'

import './index.css'

class About extends Component {
  state = {AboutData: [], isLoading: true}

  componentDidMount() {
    this.fetchAboutData()
  }

  fetchAboutData = async () => {
    const response = await fetch(
      'https://api.covid19india.org/website_data.json',
    )
    const data = await response.json()
    this.setState({AboutData: data.faq, isLoading: false})
  }

  render() {
    const {AboutData, isLoading} = this.state
    return (
      <div className="about-bg-container">
        {isLoading ? (
          <div testid="loader" className="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <div>
            <p className="about-heading">About</p>
            <p className="about-para">
              COVID-19 vaccines be ready for distribution
            </p>
            <ul className="about-ul">
              {AboutData.map(all => (
                <EachQuestion all={all} key={all.question} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default About
