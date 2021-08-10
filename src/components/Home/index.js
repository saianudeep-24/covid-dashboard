import {Component} from 'react'

import StateItem from '../StateItem'

import StateDataBox from '../StateDataBox'

import Footer from '../Footer'

import './index.css'
import EachState from '../EachState'

class Home extends Component {
  state = {
    searchInput: '',
    stateCode: '',
    suggestions: false,
    box: false,
    homeData: '',
    totalConfirmed: 0,
    totalActive: 0,
    totalRecovered: 0,
    totalDeceased: 0,
    state: true,
  }

  componentDidMount() {
    this.fetchingData()
  }

  fetchingData = async () => {
    const response = await fetch(
      'https://api.covid19india.org/v4/min/data.min.json',
    )
    const data = await response.json()
    this.setState({homeData: data, box: true})
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
    if (event.target.value.length > 0) {
      this.setState({
        suggestions: true,
      })
    } else {
      this.setState({
        suggestions: false,
      })
    }
  }

  updateSearchInput = (name, code) => {
    this.setState({
      searchInput: name,
      suggestions: false,
      stateCode: code,
      state: false,
    })
  }

  counting = (value1, value2, value3, value4) => {
    this.setState(prevState => ({
      totalConfirmed: prevState.totalConfirmed + value1,
      totalActive: prevState.totalActive + value2,
      totalRecovered: prevState.totalRecovered + value3,
      totalDeceased: prevState.totalDeceased + value4,
    }))
  }

  backPage = value => {
    this.setState({state: value, searchInput: ''})
  }

  render() {
    const {statesList} = this.props
    const {
      searchInput,
      suggestions,
      stateCode,
      homeData,
      box,
      totalConfirmed,
      totalActive,
      totalRecovered,
      totalDeceased,
      state,
    } = this.state
    const searchResults = statesList.filter(eachSuggestion =>
      eachSuggestion.state_name
        .toLowerCase()
        .startsWith(searchInput.toLowerCase()),
    )
    console.log(stateCode)
    console.log(Intl.NumberFormat().format(totalConfirmed))
    return (
      <>
        {state ? (
          <div className="bg-container">
            <div className="input-bar">
              <img
                src="https://res.cloudinary.com/deqohhami/image/upload/v1624025781/search-3_lihgsr.png"
                alt="search"
                className="color"
              />
              <input
                type="search"
                className="search-bar"
                name="search-bar"
                placeholder="Enter The State"
                autoComplete="off"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
            {suggestions ? (
              <ul className="searching-states">
                {searchResults.map(eachState => (
                  <StateItem
                    key={eachState.state_code}
                    eachState={eachState}
                    updateSearchInput={this.updateSearchInput}
                  />
                ))}
              </ul>
            ) : null}
            <div className="stats">
              <div className="confirmed card">
                <p className="p1">Confirmed</p>
                <img
                  src="https://res.cloudinary.com/deqohhami/image/upload/v1624008273/check-mark_1-5_uij39a.png"
                  alt="Confirmed"
                />
                <p className="p2">
                  {Intl.NumberFormat('en-IN').format(totalConfirmed)}
                </p>
              </div>
              <div className="active card">
                <p className="p1">Active</p>
                <img
                  src="https://res.cloudinary.com/deqohhami/image/upload/v1624008278/protection_1_dv4xk0.png"
                  alt="Active"
                />
                <p className="p2">
                  {Intl.NumberFormat('en-IN').format(totalActive)}
                </p>
              </div>
              <div className="recovered card">
                <p className="p1">Recovered</p>
                <img
                  src="https://res.cloudinary.com/deqohhami/image/upload/v1624008279/recovered_1-4_k4rujs.png"
                  alt="Recovered"
                />
                <p className="p2">
                  {Intl.NumberFormat('en-IN').format(totalRecovered)}
                </p>
              </div>
              <div className="deceased card">
                <p className="p1">Deceased</p>
                <img
                  src="https://res.cloudinary.com/deqohhami/image/upload/v1624008272/breathing_1-5_ouqpcv.png"
                  alt="Deceased"
                />
                <p className="p2">
                  {Intl.NumberFormat('en-IN').format(totalDeceased)}
                </p>
              </div>
            </div>
            <div className="box">
              <div className="column">
                <p className="column-name">States/UT </p>
                <span className="p-column-first"> Confirmed</span>
                <span className="p-column"> Active</span>
                <span className="p-column"> Recovered</span>
                <span className="p-column"> Deceased</span>
                <span className="p-column"> Population</span>
              </div>

              <hr className="hr" />
              {box ? (
                <ul className="box-data">
                  {statesList.map(each => (
                    <StateDataBox
                      each={each}
                      key={each.state_code}
                      homeData={homeData[each.state_code]}
                      counting={this.counting}
                    />
                  ))}
                </ul>
              ) : null}
            </div>
            <Footer />
          </div>
        ) : (
          <EachState
            stateData={homeData[stateCode]}
            searchInput={searchInput}
            stateCode={stateCode}
            backPage={this.backPage}
          />
        )}
      </>
    )
  }
}
export default Home
