import React, { Component } from "react";

import { LinePattern, CirclePattern } from "./patterns.js";

export default class PatternScheme extends Component {
  render() {
    let newList = new Array(this.props.numberOfPatterns);

    [...newList.keys()].forEach(i => {
      if (this.props.type === "line") {
        newList[i] = new LinePattern(
          i,
          this.props.backgroundColor,
          this.props.patternColor
        );
      }
      if (this.props.type === "circle") {
        newList[i] = new CirclePattern(
          i,
          this.props.backgroundColor,
          this.props.patternColor
        );
      }
    });

    let svgDefinitions = newList.map(item => {
      return item.getSvgDefinition();
    });

    let list = newList.map((pattern, i) => {
      return (
        <g key={"pattern" + i}>
          <title>{pattern.id}</title>
          <rect
            key={pattern.id + "-rect-holder-" + i}
            width="50"
            height="40"
            transform={`translate(${i * 60}, 0)`}
            fill={this.props.backgroundColor}
            rx={5}
            ry={5}
          />
          <rect
            key={pattern.id + "-rect-" + i}
            width="40"
            height="30"
            x={5}
            y={5}
            transform={`translate(${i * 60}, 0)`}
            fill={`url(#${newList[i].getName()})`}
          />
        </g>
      );
    });

    return (
      <svg
        viewBox={`0 0 ${list.length * 60} ${40}`}
        width={"100%"}
        height={"40px"}
      >
        {svgDefinitions}
        {list}
      </svg>
    );
  }
}
