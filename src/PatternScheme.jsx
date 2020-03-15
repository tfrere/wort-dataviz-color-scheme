import React, { Component } from "react";

import { patterns } from "./patterns.js";

export default class PatternScheme extends Component {
  render() {
    const list = this.props.patterns.map((pattern, i) => {
      return (
        <g key={"pattern" + i}>
          <title>{pattern.id}</title>
          <rect
            key={pattern.id + i}
            width="40"
            height="40"
            transform={`translate(${i * 50}, 0)`}
            fill={this.props.color}
            rx={5}
            ry={5}
            stroke={"black"}
          />
          <rect
            key={pattern.id + i}
            width="30"
            height="30"
            x={5}
            y={5}
            transform={`translate(${i * 50}, 0)`}
            fill={`url(#${pattern.id})`}
          />
        </g>
      );
    });

    return (
      <svg
        viewbox={`0 0 ${list.length * 50} ${40}`}
        width={"100%"}
        height={"40px"}
      >
        {patterns()}
        {list}
      </svg>
    );
  }
}
