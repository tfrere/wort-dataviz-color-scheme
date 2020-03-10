import React from "react";

import { PatternLines, PatternCircles, PatternWaves } from "@vx/pattern";

const Components = {
  patternLines: PatternLines,
  patternCircles: PatternCircles,
  patternWaves: PatternWaves
};

const color = "rgba(0,0,0,0.4)";
const type = "patternLines"; // patternWaves patternCircles
const orientations = ["diagonal"]; // ["diagonal", "horizontal", "vertical"]

const numberOfPattern = 9;

export let linePatternList = [];

for (let i = 1; i < numberOfPattern; i++) {
  linePatternList.push({
    type: type,
    id: `pattern-line-${i}`,
    width: 5 + i,
    height: 5 + i,
    stroke: color,
    strokeWidth: i,
    fill: "transparent",
    orientation: orientations
  });
}

export let circlePatternList = [];

for (let i = 1; i < numberOfPattern; i++) {
  circlePatternList.push({
    type: "patternCircles",
    id: `pattern-circle-${i}`,
    width: 5 + i,
    height: 5 + i,
    stroke: color,
    strokeWidth: i,
    fill: "transparent",
    orientation: orientations
  });
}

export const patterns = () => {
  return (
    <defs>
      {linePatternList.map((pattern, i) => {
        return React.createElement(Components[pattern.type], pattern);
      })}
      {circlePatternList.map((pattern, i) => {
        console.log(pattern);
        return React.createElement(Components[pattern.type], pattern);
      })}
    </defs>
  );
};
