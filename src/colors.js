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

// diviser 360 en x couleurs et les placer en fonction
export const generateCategoricalColorScale = (
  isDarkMode,
  numberOfolors,
  color
) => {
  color = updateColorForDarkMode(isDarkMode, color);

  const hueGap = 360 / numberOfolors;
  let newColors = new Array(numberOfolors);
  let activeColor = color;

  [...newColors.keys()].forEach(i => {
    newColors[i] = chroma(activeColor).set("hsl.h", "-" + hueGap);
    activeColor = newColors[i];
  });

  return chroma
    .scale(newColors)
    .colors(numberOfolors)
    .reverse();
};

const amplitude = 220;

// Prettier but less efficient
export const generateCategoricalColorScale2 = (
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

export const generateSequentialColorScale = (
  isDarkMode,
  numberOfolors,
  color
) => {
  color = updateColorForDarkMode(isDarkMode, color);

  let newColors = new Array(numberOfolors);

  if (isDarkMode) {
    [...newColors.keys()].forEach(i => {
      newColors[i] = chroma(color)
        .darken(i / (numberOfolors / 2))
        .desaturate(i / numberOfolors)
        .hex();
    });
  } else {
    let brightGap = chroma(color).get("hsl.l") > 0.8 ? 4 : 2;

    [...newColors.keys()].forEach(i => {
      newColors[i] = chroma(color)
        .brighten(i / (numberOfolors / 2))
        .desaturate(i / numberOfolors)
        .hex();
    });
  }

  return newColors.reverse();
};

// Versus

export const generateVersusColorScale = (isDarkMode, numberOfolors, color) => {
  color = updateColorForDarkMode(isDarkMode, color);

  return chroma
    .bezier([color, "white", chroma(color).set("hsl.h", "+" + 180)])
    .scale()
    .padding(-0.15)
    .colors(numberOfolors);
};

export const generateContrastedColor = color => {
  let newColor = color;
  let index = 0;
  const max_iterations = 30;
  const operator = chroma(color).get("hsl.l") >= 0.5 ? "-" : "+";

  while (chroma.contrast(color, newColor) < 4 && index < max_iterations) {
    newColor = chroma(newColor).set("hsl.l", operator + "0.1");
    newColor = chroma(newColor).set("hsl.s", operator + "0.1");
    index++;
  }
  return newColor;
};

export const generateContrastedColorScale = colors => {
  let newColors = colors.map(color => {
    let newColor = null;
    if (chroma(color).get("hsl.l") >= 0.5) {
      newColor = generateContrastedColor(color);
    } else {
      newColor = generateContrastedColor(color);
    }
    return newColor;
  });
  return newColors;
};
