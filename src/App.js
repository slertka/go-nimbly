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
      // use sample data while CORS is blocked locallys
      location: [
        {
          title: "San Francisco",
          location_type: "City",
          woeid: 2487956,
          latt_long: "37.777119, -122.41964"
        },
        {
          title: "San Diego",
          location_type: "City",
          woeid: 2487889,
          latt_long: "32.715691,-117.161720"
        },
        {
          title: "San Jose",
          location_type: "City",
          woeid: 2488042,
          latt_long: "37.338581,-121.885567"
        },
        {
          title: "San Antonio",
          location_type: "City",
          woeid: 2487796,
          latt_long: "29.424580,-98.494614"
        },
        {
          title: "Santa Cruz",
          location_type: "City",
          woeid: 2488853,
          latt_long: "36.974018,-122.030952"
        },
        {
          title: "Santiago",
          location_type: "City",
          woeid: 349859,
          latt_long: "-33.463039,-70.647942"
        },
        {
          title: "Santorini",
          location_type: "City",
          woeid: 56558361,
          latt_long: "36.406651,25.456530"
        },
        {
          title: "Santander",
          location_type: "City",
          woeid: 773964,
          latt_long: "43.461498,-3.810010"
        },
        {
          title: "Busan",
          location_type: "City",
          woeid: 1132447,
          latt_long: "35.170429,128.999481"
        },
        {
          title: "Santa Cruz de Tenerife",
          location_type: "City",
          woeid: 773692,
          latt_long: "28.46163,-16.267059"
        },
        {
          title: "Santa Fe",
          location_type: "City",
          woeid: 2488867,
          latt_long: "35.666431,-105.972572"
        }
      ],
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

  getWOEID = e => {
    e.preventDefault();
    // Check if input contains space
    const locationString = this.state.locationQuery.split(" ").join("+");
    // Location Search
    const locationUrl = `https://www.metaweather.com/api/location/search?query=${locationString}`;
    // set WOEID
    fetch(locationUrl)
      .then(res => res.json())
      .then(resj => {
        this.setState({ location: resj });
      });
    // .then(() =>
    // this.state.location.forEach(loc =>
    //   this.getWeather(loc.woeid, this.state.dateQuery)
    // )
    // );
    this.state.location.forEach(loc =>
      this.getWeather(loc.woeid, this.state.dateQuery)
    );
  };

  // get consolidated weather
  getWeather = (woeid, date) => {
    let year = date.substr(0, 4);
    let month = date.substr(5, 2);
    let day = date.substr(8, 2);

    // Weather Search
    const weatherUrl = `https://www.metaweather.com/api/location/${woeid}/${year}/${month}/${day}`;
    fetch(weatherUrl)
      .then(res => res.json())
      .then(resj =>
        this.setState({
          weather: resj[0][0]
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
        <WeatherResults />
      </div>
    );
  }
}

export default App;
