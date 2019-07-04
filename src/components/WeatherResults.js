import React from "react";

export default class WeatherResults extends React.Component {
  render() {
    const results = this.props.weather.map(loc => {
      return (
        <li>
          <p>location: {loc.title}</p>
          <p>Weather: {loc.weather_state_name}</p>
          <p>
            Alien:{" "}
            <img
              src={`https://robohash.org/${loc.woeid}+${loc.applicable_date}+${
                loc.weather_state_abbr
              }.png`}
            />
          </p>
        </li>
      );
    });

    return (
      <div>
        <ul>{results}</ul>
      </div>
    );
  }
}
