import React, { Component } from "react";
import "./styles.scss";

import {
  generateHeatMapColorPalette,
  generateDissociativeColorPalette,
  generateVersusColorPalette
} from "./colors.js";

import { linePatternList, circlePatternList, patterns } from "./patterns.js";

import Slider from "rc-slider";
import { HuePicker } from "react-color";

const editionColors = [
  { lang: "fr", color: "#db1e45" },
  { lang: "de", color: "#0f9cd8" },
  { lang: "pt", color: "#cd1719" },
  { lang: "en", color: "ffc000" }
];

const n = 8;
const color = editionColors[1].color;
const isDark = false;

export class App extends Component {
  state = {
    darkMode: isDark,
    currentColor: color,
    dissociativeColors: generateDissociativeColorPalette(isDark, n, color),
    associativeColors: generateHeatMapColorPalette(isDark, n, color),
    versusColors: generateVersusColorPalette(isDark, n, color),
    numberOfColors: n,
    currentEdition: "de",
    currentColorFilter: "normal"
  };

  handleColorChangeComplete = color => {
    this.setState({
      currentColor: color.hex,
      dissociativeColors: generateDissociativeColorPalette(
        this.state.darkMode,
        this.state.numberOfColors,
        color.hex
      ),
      associativeColors: generateHeatMapColorPalette(
        this.state.darkMode,
        this.state.numberOfColors,
        color.hex
      ),
      versusColors: generateVersusColorPalette(
        this.state.darkMode,
        this.state.numberOfColors,
        color.hex
      )
    });
  };

  handleEditionChange = e => {
    const actualEdition = e.target.value;
    this.setState(
      {
        currentEdition: actualEdition
      },
      () => {
        editionColors.map(editionColor => {
          if (editionColor.lang === actualEdition) {
            this.handleColorChangeComplete({ hex: editionColor.color });
          }
        });
      }
    );
  };

  handleColorFilterChange = e => {
    document.body.classList.remove(this.state.currentColorFilter);
    this.setState(
      {
        currentColorFilter: e.target.value
      },
      () => {
        document.body.classList.add(this.state.currentColorFilter);
      }
    );
  };

  changeNumberOfColors = n => {
    this.setState(
      {
        numberOfColors: n
      },
      () => {
        this.handleColorChangeComplete({ hex: this.state.currentColor });
      }
    );
  };

  toggleColorMode = () => {
    this.setState(
      {
        areColorsDissociative: !this.state.areColorsDissociative
      },
      () => {
        this.handleColorChangeComplete({ hex: this.state.currentColor });
      }
    );
  };

  updateColors = (colors, darkMode) => {
    //const newGrey = darkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)";
    this.setState({ colors: colors });
  };

  render() {
    let appClass = `app ${this.state.darkMode ? "dark" : "light"}`;

    let associativeColorSchemeRepresentation = this.state.associativeColors.map(
      (color, i) => {
        return (
          <div
            key={color + i}
            style={{
              display: "inline-block",
              marginRight: "10px",
              width: "40px",
              height: "40px",
              backgroundColor: color
            }}
          />
        );
      }
    );

    let dissociativeColorSchemeRepresentation = this.state.dissociativeColors.map(
      (color, i) => {
        return (
          <div
            key={color + i}
            style={{
              display: "inline-block",
              marginRight: "10px",
              width: "40px",
              height: "40px",
              backgroundColor: color
            }}
          />
        );
      }
    );

    let versusColorSchemeRepresentation = this.state.versusColors.map(
      (color, i) => {
        return (
          <div
            key={color + i}
            style={{
              display: "inline-block",
              marginRight: "10px",
              width: "40px",
              height: "40px",
              backgroundColor: color
            }}
          />
        );
      }
    );

    let linePatternListRepresentation = linePatternList.map((pattern, i) => {
      return (
        <g>
          <title>{pattern.id}</title>
          <rect
            key={pattern.id + i}
            width="40"
            height="40"
            transform={`translate(${i * 50}, 0)`}
            fill={`url(#${pattern.id})`}
            stroke={"black"}
          />
        </g>
      );
    });

    let circlePatternListRepresentation = circlePatternList.map(
      (pattern, i) => {
        return (
          <g>
            <title>{pattern.id}</title>
            <rect
              key={pattern.id + i}
              width="40"
              height="40"
              transform={`translate(${i * 50}, 0)`}
              fill={`url(#${pattern.id})`}
              stroke={"black"}
            />
          </g>
        );
      }
    );

    return (
      <div className={appClass}>
        <div className="content">
          <div className="nav">
            <div className="nav__entity">
              <h5>Dark mode </h5>
              <button
                onClick={() => {
                  this.setState(
                    {
                      darkMode: !this.state.darkMode
                    },
                    () => {
                      this.handleColorChangeComplete({
                        hex: this.state.currentColor
                      });
                    }
                  );
                }}
              >
                {this.state.darkMode ? "true" : "false"}
              </button>
            </div>
            <div className="nav__entity">
              {" "}
              <h5>Editions colors</h5>
              <select
                id="editionColor"
                onChange={this.handleEditionChange}
                value={this.state.currentEdition}
              >
                <option value="fr">FR</option>
                <option value="en">EN</option>
                <option value="pt">PT</option>
                <option value="de">DE</option>
              </select>
            </div>
            <div className="nav__entity">
              <h5>Color defficiencies</h5>
              <select
                id="colorFilter"
                onChange={this.handleColorFilterChange}
                value={this.state.currentColorFilter}
              >
                <option value="normal">none</option>
                <option value="protanopia">protanopia</option>
                <option value="deuteranopia">deuteranopia</option>
                <option value="tritanopia">tritanopia</option>
                <option value="monochromacy">monochromacy</option>
              </select>
            </div>
            <div className="nav__entity">
              <h5>Current primary color</h5>

              <div className="hue-picker-holder">
                <div>
                  <HuePicker
                    height={"16px"}
                    width={"100px"}
                    color={this.state.currentColor}
                    onChangeComplete={this.handleColorChangeComplete}
                  />
                </div>
              </div>
            </div>
          </div>
          <h2>Color schemes</h2>
          <h5>HeatMap</h5>
          {associativeColorSchemeRepresentation}
          <h5>Dissociative</h5>
          {dissociativeColorSchemeRepresentation}
          <h5>Versus</h5>
          {versusColorSchemeRepresentation}
          <h2>Patterns</h2>
          <h5>Lines</h5>
          <svg width={linePatternList.length * 50} height={40}>
            {patterns()}
            {linePatternListRepresentation}
          </svg>
          <h5>Circles</h5>
          <svg width={circlePatternList.length * 50} height={40}>
            {patterns()}
            {circlePatternListRepresentation}
          </svg>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
