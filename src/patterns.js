import React from "react";

import { PatternLines, PatternCircles, PatternWaves } from "@vx/pattern";

// eslint-disable-next-line
const defaultTypes = ["patternLines", "patternWaves", "patternCircles"];

// USAGE
// let pattern = new CirclePattern(3, "blue", "red");
// console.log(pattern.getSvgDefinition()); => svg definition
// console.log(pattern.getName()); => name to use for fill

const defaultTypesComponents = {
  patternLines: PatternLines,
  patternCircles: PatternCircles,
  patternWaves: PatternWaves
};

class Pattern {
  constructor() {
    this.pattern = { id: "", type: "" };
  }
  getSvgDefinition() {
    return (
      <>
        {React.createElement(
          defaultTypesComponents[this.pattern.type],
          this.pattern
        )}
      </>
    );
  }

  getName() {
    return this.pattern.id;
  }
}

export class LinePattern extends Pattern {
  constructor(index, backgroundColor, patternColor) {
    super();

    this.pattern = {
      type: "patternLines",
      key: `pattern-line-${index}`,
      id: `pattern-line-${index}`,
      width: 6 + index,
      height: 6 + index,
      stroke: patternColor,
      strokeWidth: index + 1,
      fill: backgroundColor,
      orientation: "diagonal"
    };
  }
}

export class CirclePattern extends Pattern {
  constructor(index, backgroundColor, patternColor) {
    super();
    this.pattern = {
      type: "patternCircles",
      key: `pattern-circle-${index}`,
      id: `pattern-circle-${index}`,
      width: 6 + index,
      height: 6 + index,
      strokeWidth: 0,
      stroke: backgroundColor,
      fill: patternColor,
      radius: (index + 2) / 2,
      complement: true
    };
  }
}
