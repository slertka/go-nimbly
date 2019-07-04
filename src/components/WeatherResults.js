import React from "react";

export default class WeatherResults extends React.Component {
  displayResults = weather => {
    weather.map(loc => <li>loc.weather_state_name</li>);
  };

  render() {
    return <div>results</div>;
  }
}
