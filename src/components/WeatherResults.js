import React from "react";
import "./WeatherResults.css";

export default class WeatherResults extends React.Component {
  render() {
    const weather = this.props.weather.weather_state_name
      ? this.props.weather.weather_state_name
          .split(" ")
          .map(char => char.charAt(0).toLowerCase() + char.slice(1))
          .join(" ")
      : "";

    return (
      <div className="results">
        <p>
          In {this.props.weather.title}, this alien decided the weather shall
          have {weather}.
        </p>
        <div className="weather-alien">
          <img
            src={`https://www.metaweather.com/static/img/weather/png/${
              this.props.weather.weather_state_abbr
            }.png`}
            alt={`Weather icon for ${
              this.props.weather.weather_state_name
            } in ${this.props.weather.title}`}
            className="weather-icon"
          />
          <img
            src={`https://robohash.org/${this.props.weather.woeid}+${
              this.props.weather.applicable_date
            }+${this.props.weather.weather_state_abbr}.png`}
            alt={`Robohash alien for ${this.props.weather.title} and ${
              this.props.weather.weather_state_name
            }`}
            className="alien"
          />
        </div>
      </div>
    );
  }
}
