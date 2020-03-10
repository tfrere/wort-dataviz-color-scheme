import chroma from "chroma-js";

const amplitude = 220;

const updateColorForDarkMode = (isDarkMode, color) => {
  if (isDarkMode) {
    return chroma(color)
      .brighten()
      .hex();
  } else {
    return color;
  }
};

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
        .darken(i / 4)
        .desaturate(i / 8)
        .hex();
    });
  } else {
    [...newColors.keys()].forEach(i => {
      newColors[i] = chroma(color)
        .brighten(i / 4)
        .desaturate(i / 8)
        .hex();
    });
  }

  return newColors.reverse();
};

export const generateDissociativeColorPalette = (
  isDarkMode,
  numberOfolors,
  color
) => {
  color = updateColorForDarkMode(isDarkMode, color);

  return chroma
    .scale([color, chroma(color).set("hsl.h", "+" + amplitude)])
    .mode("lch")
    .colors(numberOfolors);
};

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