import React, { Component } from "react";
import "./styles/styles.scss";

import {
  generateSequentialColorScale,
  generateCategoricalColorScale,
  generateVersusColorScale,
  generateContrastedColor,
  generateContrastedColorScale
} from "./colors.js";

import Slider from "rc-slider";
import { HuePicker } from "react-color";

import CurrentColor from "./CurrentColor.jsx";
import ColorScheme from "./ColorScheme.jsx";
import PatternScheme from "./PatternScheme.jsx";

const editionColors = [
  { lang: "fr", color: "#db1e45" },
  { lang: "de", color: "#0f9cd8" },
  { lang: "pt", color: "#cd1719" },
  { lang: "en", color: "#ffc000" }
];

export class App extends Component {
  state = {
    darkMode: false,
    currentColor: editionColors[1].color,
    numberOfColors: 6,
    currentEdition: "custom",
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
        console.log(actualEdition);
        editionColors.forEach(editionColor => {
          if (editionColor.lang === actualEdition) {
            this.handleColorChangeComplete({ hex: editionColor.color });
          }
        });
      }
    );
  };

  handleColorFilterChange = e => {
    this.content.classList.remove(this.state.currentColorFilter);
    this.setState(
      {
        currentColorFilter: e.target.value
      },
      () => {
        this.content.classList.add(this.state.currentColorFilter);
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

    const categoricalColorScheme = generateCategoricalColorScale(
      this.state.darkMode,
      this.state.numberOfColors > 6 ? 6 : this.state.numberOfColors,
      this.state.currentColor
    );

    const heatMapColorScheme = generateSequentialColorScale(
      this.state.darkMode,
      this.state.numberOfColors,
      this.state.currentColor
    );

    const versusColorScheme = generateVersusColorScale(
      this.state.darkMode,
      this.state.numberOfColors,
      this.state.currentColor
    );

    const contrastedCurrentColor = generateContrastedColor(
      this.state.currentColor
    );

    console.log(contrastedCurrentColor);

    return (
      <div className={appClass}>
        <div className="nav">
          <div className="nav__entity">
            <CurrentColor
              color={this.state.currentColor}
              textColor={contrastedCurrentColor}
            />
          </div>
          <hr />
          <div className="nav__entity">
            {" "}
            <label>Editions colors</label>
            <select
              id="editionColor"
              onChange={this.handleEditionChange}
              value={this.state.currentEdition}
            >
              <option value="fr">FR</option>
              <option value="en">EN</option>
              <option value="pt">PT</option>
              <option value="de">DE</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          {this.state.currentEdition === "custom" ? (
            <div className="nav__entity">
              <label>Current color</label>

              <div className="hue-picker-holder">
                <div>
                  <HuePicker
                    height={"16px"}
                    width={"108px"}
                    color={this.state.currentColor}
                    onChange={this.handleColorChangeComplete}
                  />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="nav__entity">
            <label>nb colors {this.state.numberOfColors}</label>
            <Slider
              width={"120px"}
              step={1}
              defaultValue={6}
              min={2}
              max={10}
              onChange={value => {
                this.setState({ numberOfColors: value });
              }}
            />
          </div>

          <hr />
          <div className="nav__entity">
            <label>Dark mode </label>
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
            <label>Defficiencies</label>
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
        </div>
        <div className="content" ref={content => (this.content = content)}>
          <h1 style={{ marginBottom: 0, lineHeight: 0.5 }}>Wort dataviz </h1>
          <small>v0.1.1</small>
          <br />
          <h2>Color scales</h2>
          <h4>Categorical</h4>
          <p>
            Usefull for good category distinction in a legend or grouping things
            together. Max of 6.
          </p>
          <ColorScheme
            colors={categoricalColorScheme}
            contrastedColors={generateContrastedColorScale(
              categoricalColorScheme
            )}
          />
          <h4>Sequential</h4>
          <p>Useful for heatmaps.</p>
          <ColorScheme
            colors={heatMapColorScheme}
            contrastedColors={generateContrastedColorScale(heatMapColorScheme)}
          />
          <h4>Versus</h4>
          <p>
            Useful for ranges that have two extremes with a baseline in the
            middle or dealing with negative values.{" "}
          </p>
          <ColorScheme
            colors={versusColorScheme}
            contrastedColors={generateContrastedColorScale(versusColorScheme)}
          />
          <h3>Usage</h3>
          <pre>
            <code>
              {`
let colorScale = generateCategorialColorScale("#1ea1dd", 2);
console.log(colorScale); // return ["#1ea1dd", "#dd5a1e"]
let contrastedColorScale = generateContrastedColorScale(colorScale);
console.log(contrastedColorScale); // return ["#FFF", "#FFF"]
            `}
            </code>
          </pre>
          <br />
          <br />
          <hr />
          <br />
          <br />
          <h2>Patterns</h2>
          <p>
            Useful to highlight something in a already colored chart. Could also
            be used for complete colorblind.
          </p>
          <h4>LinePattern</h4>
          <PatternScheme
            backgroundColor={this.state.currentColor}
            patternColor={contrastedCurrentColor}
            numberOfPatterns={9}
            type={"line"}
          />
          <h4>CirclePattern</h4>
          <PatternScheme
            backgroundColor={this.state.currentColor}
            patternColor={contrastedCurrentColor}
            numberOfPatterns={9}
            type={"circle"}
          />
          <h3>Usage</h3>
          <pre>
            <code>
              {`
let pattern = new CirclePattern(3, "blue", "red");
console.log(pattern.getDefinition()); // return svg definition
console.log(pattern.getName()); // return "circle-pattern-3"
            `}
            </code>
          </pre>
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
