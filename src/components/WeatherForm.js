import React from "react";

export default class WeatherForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.getWOEID}>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          name="location"
          placeholder="ex. San Francisco"
          onChange={this.props.setLocation}
        />
        <label htmlFor="date">Date:</label>
        <input type="date" name="date" onChange={this.props.setDate} />
        <input type="submit" />
      </form>
    );
  }
}
