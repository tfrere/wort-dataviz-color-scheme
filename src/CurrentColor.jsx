import React, { Component } from "react";
import chroma from "chroma-js";
import namer from "color-namer";

export default class CurrentColor extends Component {
  render() {
    const list = namer(this.props.color);
    return (
      <div>
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "3px",
            marginBottom: "10px",
            background: this.props.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <span style={{ color: this.props.textColor }}>
            {list.ntc[0].name}
          </span>
        </div>
        <span>
          <span style={{ opacity: 0.5 }}>H</span>{" "}
          {Math.floor(chroma(this.props.color).get("hsl.h"))}
        </span>
        {"  "}
        <span>
          <span style={{ opacity: 0.5 }}>S</span>{" "}
          {Math.floor(chroma(this.props.color).get("hsl.s") * 100) / 100}
        </span>
        {"  "}
        <span>
          <span style={{ opacity: 0.5 }}>L</span>{" "}
          {Math.floor(chroma(this.props.color).get("hsl.l") * 100) / 100}
        </span>
      </div>
    );
  }
}
