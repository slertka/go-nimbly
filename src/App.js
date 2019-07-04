import React from "react";

// Components
import WeatherForm from "./components/WeatherForm";
import WeatherResults from "./components/WeatherResults";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationQuery: "",
      dateQuery: "",
      location: [],
      weather: []
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
    // Check if input contains space
    const locationString = this.state.locationQuery.split(" ").join("+");
    // Location Search
    const locationUrl = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search?query=${locationString}`;
    // set WOEID
    fetch(locationUrl)
      .then(res => res.json())
      .then(resj => {
        this.setState({ location: resj });
        this.state.location.forEach(loc =>
          this.getWeather(loc.woeid, this.state.dateQuery, loc.title)
        );
      });
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
      .then(resj =>
        this.setState({
          weather: [...this.state.weather, { ...resj[0], title, woeid }]
        })
      );
  };

  render() {
    return (
      <div className="App">
        <h1>Which Alien Ruled the Weather?</h1>
        <p>
          Enter a location and date to see which Alien ruled the weather that
          day.
        </p>
        <WeatherForm
          setLocation={e => this.setLocation(e)}
          setDate={e => this.setDate(e)}
          getWOEID={e => this.getWOEID(e)}
        />
        <WeatherResults weather={this.state.weather} />
      </div>
    );
  }
}

export default App;
