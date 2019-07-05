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

    // format date
    let date;
    let year = this.props.weather.applicable_date.substr(0, 4);
    let month = this.props.weather.applicable_date.substr(5, 2);
    let day = this.props.weather.applicable_date.substr(8, 2);

    switch (month) {
      case "01":
        month = "January";
        break;
      case "02":
        month = "February";
        break;
      case "03":
        month = "March";
        break;
      case "04":
        month = "April";
        break;
      case "05":
        month = "May";
        break;
      case "06":
        month = "June";
        break;
      case "07":
        month = "July";
        break;
      case "08":
        month = "August";
        break;
      case "09":
        month = "September";
        break;
      case "10":
        month = "October";
        break;
      case "11":
        month = "November";
        break;
      default:
        month = "December";
        break;
    }

    date = `${month} ${day}, ${year}`;

    return (
      <div className="results">
        <p>
          In {this.props.weather.title}, this alien decided the weather shall
          have {weather} on {date}.
        </p>
        <img
          src={`https://www.metaweather.com/static/img/weather/png/${
            this.props.weather.weather_state_abbr
          }.png`}
          alt={`Weather icon for ${this.props.weather.weather_state_name} in ${
            this.props.weather.title
          }`}
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
    );
  }
}
