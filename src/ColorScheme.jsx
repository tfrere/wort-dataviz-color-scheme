import React, { Component } from "react";

export default class ColorScheme extends Component {
  render() {
    const width = 100 / this.props.colors.length;

    const gradientPercent = 100 / (this.props.colors.length - 1);
    let cssGradientSteps = "";
    this.props.colors.forEach((color, i) => {
      cssGradientSteps += `, ${color} ${gradientPercent * i}%`;
    });
    const cssGradient = `linear-gradient(90deg ${cssGradientSteps})`;

    let colors = this.props.colors.map((color, i) => {
      return (
        <div
          key={color + i}
          style={{
            margin: "0px",
            padding: "0px",
            width: width + "%",
            height: "100%",
            backgroundColor: color,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <span style={{ color: this.props.contrastedColors[i] }}>●</span>
        </div>
      );
    });

    return (
      <div>
        <div
          style={{
            width: "100%",
            height: "40px",
            borderRadius: "3px",
            marginBottom: "10px",
            overflow: "hidden"
          }}
        >
          {colors}
        </div>
        <div
          style={{
            width: "100%",
            height: "40px",
            borderRadius: "3px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              display: "inline-block",
              margin: "0px",
              padding: "0px",
              width: "100%",
              height: "40px",
              background: cssGradient
            }}
          />
        </div>
      </div>
    );
  }
}
