import React, { Component } from "react";
import { ChromePicker } from "react-color";

export default class Body extends Component {
  constructor() {
    super();
    this.state = {
      isAddingColor: true,
      isAddingRange: false,
      background: "#fff",
      colors: [],
      string: "",
      strings: [],
    };
  }

  componentDidMount = () => {};

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

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

  createPixel = () => {
    // const rootElement = document.getElementById("results");
    // const element = React.createElement("div", null, "Hello World");
    // ReactDOM.render(element, rootElement);
  };

  createImage = () => {
    console.log("test");
    this.createPixel();
  };

  createPixels = () => {
    this.state.strings.map((pixel) => {
      console.log("creating");
      <div id="pixel">{pixel}</div>;
    });
  };

  colorSetSubmitHandler = (event) => {
    event.preventDefault();
    const stringClean = this.state.string.split("\n");
    this.setState({
      [this.state.colorNumber]: this.state.colorHex,
      strings: stringClean,
    });
    console.log("your number", this.state.colorNumber);
    console.log("Submitting color:", this.state.colorHex);
    // this.createImage();
    this.createPixels();
  };

  downloadImage = () => {
    console.log("clicked");
    // html2canvas(document.querySelector("#capture")).then((canvas) => {
    //   document.body.appendChild(canvas);
    // });
    const myCanvas = document.querySelector("canvas");
  };
  render() {
    return (
      <div className="container">
        <h1>String2Image</h1>
        <section>
          <h3>Do you want to add one color or a range?</h3>
          <button onClick={this.addingOneColor}>One</button>
          <button onClick={this.addingRangeColor}>Two</button>

          <p>isAddingColor: {String(this.state.isAddingColor)}</p>
          <p>isAddingRange: {String(this.state.isAddingRange)}</p>
        </section>

        <section></section>

        <section>
          <form onSubmit={this.colorSetSubmitHandler}>
            <ChromePicker
              color={this.state.background}
              onChangeComplete={this.handleChangeComplete}
            />
            {this.state.isAddingColor ? (
              <>
                <textarea
                  name="string"
                  value={this.state.string}
                  onChange={this.handleChange}
                />

                <p>Choose color number</p>

                <input
                  id="colorHex"
                  type="colorNumber"
                  name="colorNumber"
                  placeholder="Enter the color number you want to set"
                  onChange={this.handleChange}
                />
                <input
                  id="colorHex"
                  name="colorHex"
                  placeholder="Enter the colorHex"
                  onChange={this.handleChange}
                />
                <input type="submit" value="Add Color" />
              </>
            ) : (
              <></>
            )}
            {this.state.isAddingRange ? <p>Choose range of colors</p> : <></>}
          </form>
        </section>

        <section className="results" id="results">
          {this.state.strings.length ? (
            this.state.strings.map((pixel) => {
              console.log("creating");

              return <div id="pixel">{pixel}</div>;
            })
          ) : (
            <p>smt will come here</p>
          )}
        </section>

        {/* <div id="capture">
          <h4>Hello world!</h4>
          <button onClick={this.downloadImage}>downloadImage</button>
        </div> */}
      </div>
    );
  }
}
