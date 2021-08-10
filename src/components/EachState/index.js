import {Component} from 'react'

import TopDistricts from '../TopDistricts'

import Graphs from '../Graphs'

import './index.css'

class EachState extends Component {
  state = {districts: [], dates: [], go: false}

  componentDidMount() {
    this.fetchAboutData()
    const {stateData} = this.props
    const allDistricts = stateData.districts
    const allDistrictsList = Object.entries(allDistricts).map(e => ({
      district: e[0.0],
      conformed: e[1].total.confirmed,
    }))
    allDistrictsList.sort((a, b) => (b.conformed > a.conformed ? 1 : -1))
    this.setState({districts: allDistrictsList})
  }

  fetchAboutData = async () => {
    const {stateCode} = this.props
    const response = await fetch(
      `https://api.covid19india.org/v4/min/timeseries-${stateCode}.min.json`,
    )
    const data = await response.json()

    const fourMonths = []
    const n = 90

    ;[...Array(n)].map((elementInArray, index) =>
      fourMonths.push(
        Object.entries(data[stateCode].dates)[
          Object.entries(data[stateCode].dates).length - index
        ],
      ),
    )

    fourMonths.shift()
    fourMonths.shift()
    const datesList = fourMonths.map(e => ({
      date: e[0],
      conformed: e[1].delta.confirmed,
      deceased: e[1].delta.deceased,
      recovered: e[1].delta.recovered,
      tested: e[1].delta.tested,
      vaccinated1: e[1].delta.vaccinated1,
    }))
    this.setState({dates: datesList, go: true})
  }

  render() {
    const {districts, dates, go} = this.state
    const {stateData, searchInput, backPage} = this.props
    const goBack = () => {
      backPage(true)
    }
    return (
      <div className="bg-container">
        <button className="button" type="button" onClick={goBack}>
          Back
        </button>
        <div className="Each-state-stateName">
          <div className="each-state-name">
            <div className="name-back">
              <p className="Each-state-state-name">{searchInput}</p>
            </div>
            <p className="each-state-para">
              Last update on
              <span className="last-update">{stateData.meta.tested.date}</span>
            </p>
          </div>
          <div className="each-state-name2">
            <p className="Each-state-tested">Tested</p>
            <p className="each-state-tested-number">
              {Intl.NumberFormat('en-IN').format(stateData.total.tested)}
            </p>
          </div>
        </div>
        <div className="stats">
          <div className="confirmed card">
            <p className="p1">Confirmed</p>
            <img
              src="https://res.cloudinary.com/deqohhami/image/upload/v1624008273/check-mark_1-5_uij39a.png"
              alt="Confirmed"
            />
            <p className="p2">
              {Intl.NumberFormat('en-IN').format(stateData.total.confirmed)}
            </p>
          </div>
          <div className="active card">
            <p className="p1">Active</p>
            <img
              src="https://res.cloudinary.com/deqohhami/image/upload/v1624008278/protection_1_dv4xk0.png"
              alt="Active"
            />
            <p className="p2">
              {Intl.NumberFormat('en-IN').format(
                stateData.total.confirmed - stateData.total.recovered,
              )}
            </p>
          </div>
          <div className="recovered card">
            <p className="p1">Recovered</p>
            <img
              src="https://res.cloudinary.com/deqohhami/image/upload/v1624008279/recovered_1-4_k4rujs.png"
              alt="Recovered"
            />
            <p className="p2">
              {Intl.NumberFormat('en-IN').format(stateData.total.recovered)}
            </p>
          </div>
          <div className="deceased card">
            <p className="p1">Deceased</p>
            <img
              src="https://res.cloudinary.com/deqohhami/image/upload/v1624008272/breathing_1-5_ouqpcv.png"
              alt="Deceased"
            />
            <p className="p2">
              {Intl.NumberFormat('en-IN').format(stateData.total.deceased)}
            </p>
          </div>
        </div>
        <div className="top-districts">
          <p className="top-districts-heading">Top Districts</p>
          <ul className="top-districts-ul">
            {districts.map(one => (
              <TopDistricts one={one} key={one.district} />
            ))}
          </ul>
        </div>
        {go ? (
          <div className="">
            <Graphs dates={dates} />
          </div>
        ) : null}
        <button className="button" type="button" onClick={goBack}>
          Back
        </button>
      </div>
    )
  }
}
export default EachState
