import React, { Component } from "react";
import html2canvas from "html2canvas";

export default class Body extends Component {
  constructor() {
    super();
    this.state = {
      isAddingColor: true,
      isAddingRange: false,
      colorToAdd: "",
    };
  }

  addingOneColor = () => {
    this.setState({
      isAddingColor: true,
      isAddingRange: false,
    });
  };

  addingRangeColor = () => {
    this.setState({
      isAddingColor: false,
      isAddingRange: true,
    });
  };

  colorNumberChangeHandler = (event) => {
    this.setState({
      colorToAdd: event.target.value,
    });
  };
  colorSetSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Submitting color:", this.state.colorToAdd);
  };

  downloadImage = () => {
    console.log("clicked");
    html2canvas(document.querySelector("#capture")).then((canvas) => {
      document.body.appendChild(canvas);
    });
    const myCanvas = document.querySelector("canvas");
  };
  render() {
    return (
      <div className="container">
        <h1>String2Image</h1>
        <h3>Do you want to add one color or a range?</h3>
        <button onClick={this.addingOneColor}>One</button>
        <button onClick={this.addingRangeColor}>Two</button>

        <p>isAddingColor: {String(this.state.isAddingColor)}</p>
        <p>isAddingRange: {String(this.state.isAddingRange)}</p>

        <form onSubmit={this.colorSetSubmitHandler}>
          {this.state.isAddingColor ? (
            <>
              <p>Choose color number</p>
              <input
                id="colorNumber"
                type="number"
                placeholder="Enter the color number you want to set"
                onChange={this.colorNumberChangeHandler}
              />
              <input id="colorPicker" value="#0028FFFF" data-jscolor="{}" />
            </>
          ) : (
            <></>
          )}
          {this.state.isAddingRange ? <p>Choose range of colors</p> : <></>}
        </form>
        {/* <div id="capture">
          <h4>Hello world!</h4>
          <button onClick={this.downloadImage}>downloadImage</button>
        </div> */}
      </div>
    );
  }
}
