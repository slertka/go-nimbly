import React from "react";
import "./App.css";

// Components
import WeatherForm from "./components/WeatherForm";
import WeatherResults from "./components/WeatherResults";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationQuery: "",
      dateQuery: "",
      location: {},
      weather: {},
      fetchingData: false,
      fetchError: false,
      fetchErrMessage: "",
      fetchSuccess: false
    };
  }

  setLocation = e => {
    this.setState({
      locationQuery: e.target.value
    });
  };

  setDate = e => {
    this.setState({
      dateQuery: e.target.value
    });
  };

  // get where on earth ID
  getWOEID = e => {
    e.preventDefault();

    // Clear existing data in state
    this.setState({
      fetchingData: true,
      fetchError: false,
      fetchSuccess: false,
      fetchErrMessage: ""
    });

    // Check if input contains space
    const locationString = this.state.locationQuery.split(" ").join("+");
    // Location Search
    const locationUrl = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search?query=${locationString}`;

    // set WOEID
    fetch(locationUrl)
      .then(res => {
        this.setState({
          fetchingData: true,
          fetchError: false,
          location: {},
          weather: {}
        });
        return res.json();
      })
      .then(resj => {
        // verify response
        if (resj.length === 0) {
          this.setState({
            fetchingData: false,
            fetchError: true,
            fetchErrMessage: "Could not find location, please try again."
          });
        } else if (resj.length > 1) {
          this.setState({
            fetchingData: false,
            fetchError: true,
            fetchErrMessage:
              "Location returned multiple results. Please be more specific to see the Weather Alien."
          });
        } else {
          this.setState({ location: resj[0] });
        }
      })
      .then(() => {
        this.getWeather(
          this.state.location.woeid,
          this.state.dateQuery,
          this.state.location.title
        );
      })
      .catch(
        this.setState({
          fetchingData: false
        })
      );
  };

  // get consolidated weather
  getWeather = (woeid, date, title) => {
    let year = date.substr(0, 4);
    let month = date.substr(5, 2);
    let day = date.substr(8, 2);

    // Weather Search
    const weatherUrl = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/${year}/${month}/${day}`;
    fetch(weatherUrl)
      .then(res => res.json())
      .then(resj => {
        // check if date is valid
        if (resj.length === 0) {
          this.setState({
            fetchingData: false,
            fetchError: true,
            fetchErrMessage:
              "No weather data for date choosen. Please select another date."
          });
        } else {
          this.setState({
            weather: { ...resj[0], title, woeid },
            fetchingData: false,
            fetchSuccess: true
          });
        }
      })
      .catch(() => {
        this.setState({
          fetchingData: false
        });
      });
  };

  render() {
    return (
      <div className="App">
        <h1>Which Alien Ruled the Weather?</h1>
        <WeatherForm
          setLocation={e => this.setLocation(e)}
          setDate={e => this.setDate(e)}
          getWOEID={e => this.getWOEID(e)}
        />
        {this.state.fetchError ? (
          <div className="error">{this.state.fetchErrMessage} </div>
        ) : (
          ""
        )}
        {this.state.fetchingData ? (
          <div className="error">Looking for Aliens...</div>
        ) : (
          ""
        )}
        {this.state.fetchSuccess ? (
          <WeatherResults
            weather={this.state.weather}
            className={this.state.fetchingData ? "hidden" : ""}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
