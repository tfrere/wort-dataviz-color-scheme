// For more informations
// https://www.vis4.net/blog/2013/09/mastering-multi-hued-color-scales/#how-to-use-these-features-in-chromajs

import chroma from "chroma-js";

const updateColorForDarkMode = (isDarkMode, color) => {
  if (isDarkMode) {
    return chroma(color)
      .brighten(0.1)
      .hex();
  } else {
    return color;
  }
};

// Categorical
// chroma.deltaE('#ededee', '#edeeed');
// utiliser delta E pour évaluer si les couleurs ont bien un minimum
// de distance entre elles, sinon faire varier l'amplitude

const amplitude = 220;

export const generateCategoricalColorPalette = (
  isDarkMode,
  numberOfolors,
  color
) => {
  color = updateColorForDarkMode(isDarkMode, color);

  return chroma
    .scale([color, chroma(color).set("hsl.h", "-" + amplitude)])
    .mode("lch")
    .colors(numberOfolors);
};

// Heatmap

export const generateHeatMapColorPalette = (
  isDarkMode,
  numberOfolors,
  color
) => {
  color = updateColorForDarkMode(isDarkMode, color);

  let newColors = new Array(numberOfolors);

  if (isDarkMode) {
    [...newColors.keys()].forEach(i => {
      newColors[i] = chroma(color)
        .desaturate(i / 8)
        .darken(i / 2)
        .hex();
    });
  } else {
    [...newColors.keys()].forEach(i => {
      newColors[i] = chroma(color)
        .brighten(i / 2)
        .desaturate(i / 8)
        .hex();
    });
  }

  return newColors.reverse();
};

// Versus

export const generateVersusColorPalette = (
  isDarkMode,
  numberOfolors,
  color
) => {
  color = updateColorForDarkMode(isDarkMode, color);

  return chroma
    .bezier([color, "white", chroma(color).set("hsl.h", "+" + 180)])
    .scale()
    .padding(-0.15)
    .colors(numberOfolors);
};

const generateContrastedColor = (color, operator) => {
  let newColor = color;
  let index = 0;
  const max_iterations = 30;
  while (chroma.contrast(color, newColor) < 4 && index < max_iterations) {
    newColor = chroma(newColor).set("hsl.l", operator + "0.1");
    newColor = chroma(newColor).set("hsl.s", operator + "0.1");
    index++;
  }
  return newColor;
};

export const generateContrastedColorPalette = colors => {
  let newColors = colors.map(color => {
    let newColor = null;
    if (chroma(color).get("hsl.l") >= 0.5) {
      newColor = generateContrastedColor(color, "-");
    } else {
      newColor = generateContrastedColor(color, "+");
    }
    return newColor;
  });
  return newColors;
};
