import React, { Component } from "react";
import "./styles/styles.scss";

import chroma from "chroma-js";

import {
  generateHeatMapColorPalette,
  generateCategoricalColorPalette,
  generateVersusColorPalette,
  generateContrastedColorPalette
} from "./colors.js";

import { linePatternList, circlePatternList } from "./patterns.js";

import Slider from "rc-slider";
import { HuePicker } from "react-color";

import ColorScheme from "./ColorScheme.jsx";
import PatternScheme from "./PatternScheme.jsx";

const editionColors = [
  { lang: "fr", color: "#db1e45" },
  { lang: "de", color: "#0f9cd8" },
  { lang: "pt", color: "#cd1719" },
  { lang: "en", color: "#ffc000" }
];

const n = 7;
const color = editionColors[1].color;
const isDark = false;

export class App extends Component {
  state = {
    darkMode: isDark,
    currentColor: color,
    numberOfColors: n,
    currentEdition: "de",
    currentColorFilter: "normal"
  };

  handleColorChangeComplete = color => {
    this.setState({
      currentColor: color.hex
    });
  };

  handleEditionChange = e => {
    const actualEdition = e.target.value;
    this.setState(
      {
        currentEdition: actualEdition
      },
      () => {
        editionColors.forEach(editionColor => {
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

  render() {
    let appClass = `app ${this.state.darkMode ? "dark" : "light"}`;

    const categoricalColorScheme = generateCategoricalColorPalette(
      this.state.darkMode,
      this.state.numberOfColors,
      this.state.currentColor
    );

    const heatMapColorScheme = generateHeatMapColorPalette(
      this.state.darkMode,
      this.state.numberOfColors,
      this.state.currentColor
    );

    const versusColorScheme = generateVersusColorPalette(
      this.state.darkMode,
      this.state.numberOfColors,
      this.state.currentColor
    );

    return (
      <div className={appClass}>
        <div className="content">
          <div className="nav">
            <div className="nav__entity">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: this.state.currentColor,
                  borderRadius: "3px"
                }}
              />
              {Math.floor(chroma(this.state.currentColor).get("hsl.s"))}
              {Math.floor(chroma(this.state.currentColor).get("hsl.l"))}
            </div>
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
                <option value="protanopia">{"protanopia < 2%"}</option>
                <option value="deuteranopia">{"deuteranopia < 2%"}</option>
                <option value="tritanopia">{"tritanopia < 0.1%"}</option>
                <option value="monochromacy">{"monochromacy < 0.1%"} </option>
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
          <h5>Categorical</h5>
          <p>
            Usefull for good category distinction in a legend or grouping things
            together. Max of 6.
          </p>
          <ColorScheme
            colors={categoricalColorScheme}
            contrastedColors={generateContrastedColorPalette(
              categoricalColorScheme
            )}
          />
          <h5>Sequential</h5>
          <p>Useful for heatmaps.</p>
          <ColorScheme
            colors={heatMapColorScheme}
            contrastedColors={generateContrastedColorPalette(
              heatMapColorScheme
            )}
          />
          <h5>Versus</h5>
          <p>
            Useful for ranges that have two extremes with a baseline in the
            middle or dealing with negative values.{" "}
          </p>
          <ColorScheme
            colors={versusColorScheme}
            contrastedColors={generateContrastedColorPalette(versusColorScheme)}
          />
          <h2>Patterns</h2>
          <p>
            Useful to highlight something in a already colored chart. Could also
            be used for complete colorblind.
          </p>
          <h5>Lines</h5>
          <PatternScheme
            color={this.state.currentColor}
            patterns={linePatternList}
          />
          <h5>Circles</h5>
          <PatternScheme
            color={this.state.currentColor}
            patterns={circlePatternList}
          />
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
