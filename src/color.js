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
  //console.log(color);
  color = updateColorForDarkMode(isDarkMode, color);
  const colorAngle = 180 / numberOfolors;
  const isOdd = numberOfolors % 2 == 1 ? true : false;
  const complementColor = chroma(color).set("hsl.h", "+" + 180 / 2);
  let left = chroma
    .bezier([color, complementColor])
    .scale()
    .correctLightness()
    .colors(numberOfolors / 2);
  let right = chroma
    .bezier([
      chroma(color).set("hsl.h", "+" + 180 / 2),
      chroma(color).set("hsl.h", "+" + 180)
    ])
    .scale()
    .correctLightness()
    .colors(numberOfolors / 2 + (isOdd ? 1 : 0));
  //console.log(left);
  //console.log(right);
  if (isOdd) {
    right.pop();
  }

  /*
  return (
    chroma
      .scale("RdYlBu")
      //.scale([color, chroma(color).set("hsl.h", "+" + amplitude)])
      .padding(-0.15)
      .colors(numberOfolors)
  );
  */

  //chroma.scale('#RdYlBu');
  let newColors = left.concat(right);
  return newColors;
};
