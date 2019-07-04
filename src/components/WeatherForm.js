import React from "react";
import "./WeatherForm.css";

export default class WeatherForm extends React.Component {
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.props.getWOEID} className="weather-form">
          <p>
            Enter a location and date to see which Alien ruled the weather that
            day.
          </p>
          <div className="user-input">
            <label htmlFor="location">Location: </label>
            <input
              type="text"
              name="location"
              placeholder="ex. San Francisco"
              onChange={this.props.setLocation}
              required
            />
          </div>
          <div>
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              name="date"
              onChange={this.props.setDate}
              required
            />
          </div>
          <input type="submit" />
        </form>
      </React.Fragment>
    );
  }
}
