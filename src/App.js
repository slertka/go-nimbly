import React from "react";
import "./App.css";
import moment from "moment";

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

  // set state based on user input to use in fetch
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
      fetchErrMessage: "",
      location: {},
      weather: {}
    });

    // Check if input contains space to create string query
    const locationString = this.state.locationQuery.split(" ").join("+");
    // Location Search
    const locationUrl = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search?query=${locationString}`;

    // set WOEID in state
    fetch(locationUrl)
      .then(res => res.json())
      .then(resj => {
        // verify data was returned from the response; otherwise, send an error
        if (resj.length === 0) {
          this.setState({
            fetchingData: false,
            fetchError: true,
            fetchErrMessage: "Could not find location, please try again."
          });
        } else if (resj.length > 1) {
          // verify only one location was found based on user search query; otherwise, send error
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
        // get the weather from the woeid and date from user
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
    // break out dateQuery to use in fetch URL
    let year = moment(date).format("YYYY");
    let month = moment(date).format("MM");
    let day = moment(date).format("DD");

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
