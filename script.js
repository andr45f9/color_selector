"use strict";

const HTML = [];

document.addEventListener("DOMContentLoaded", start);

function start() {
  //console.log("ready!");
  HTML.colorInput = document.querySelector("#color_picker"); //color input element.
  HTML.colorCircle = document.querySelector(".color_circle"); //Color circle element.
  HTML.hexOutPut = document.querySelector(".hex_value"); //hex value will be displayed in the span element.
  HTML.rgbOutPut = document.querySelector(".rgb_value"); //rgb value will be displayed in the span element.
  HTML.hslOutPut = document.querySelector(".hsl_value"); //hsl value will be displayed in the span element.

  //Add an eventlistener to the input field so we know what color has been picked, then make a function reffrence to the next function.
  HTML.colorInput.addEventListener("input", getSelectedColor);
}

//Gets the selected color form the input field and reads it in the different color values.
function getSelectedColor() {
  const hexValue = HTML.colorInput.value.substring(HTML.colorInput.value.lenght); //we take the color input and turns it into a hex string.
  console.log(hexValue);

  const rgbValue = convertToRGB(hexValue);
  console.log(rgbValue);

  const hslValue = convertToHSL(hexValue);
  console.log(hslValue);

  displayAllValues(hexValue, rgbValue, hslValue);
}

//Convert the hex value to rgb.
function convertToRGB(hex) {
  //console.log(hex);

  const red = parseInt("0x" + hex.substring(0, 2));
  const green = parseInt("0x" + hex.substring(2, 4));
  const blue = parseInt("0x" + hex.substring(4, 6));

  const rgb = `${red}, ${green}, ${blue}`;

  return rgb;
}

//Convert the hex value to hsl.
function convertToHSL(hex) {
  //console.log(hex);

  const red = parseInt("0x" + hex.substring(0, 2)) / 255;
  const green = parseInt("0x" + hex.substring(2, 4)) / 255;
  const blue = parseInt("0x" + hex.substring(4, 6)) / 255;

  let h, s, l;

  const min = Math.min(red, green, blue);
  const max = Math.max(red, green, blue);

  switch (max) {
    case min:
      h = 0;
      break;

    case red:
      h = 60 * (0 + (green - blue) / (max - min));
      break;

    case green:
      h = 60 * (2 + (blue - red) / (max - min));
      break;

    case blue:
      h = 60 * (4 + (red - green) / (max - min));
      break;
  }

  if (h < 0) {
    h = h + 360;
  }

  //calculate luminance/brightness
  l = (min + max) / 2;

  //calculate saturation
  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }

  //convert value to percent
  s *= 100;
  l *= 100;

  //round values
  h = Math.round(h);
  s = Math.round(s);
  l = Math.round(l);

  const hsl = `${h}°, ${s}%, ${l}%`;

  return hsl;
}

//Displays the color in the different color values aswell as showing the color in the color circle.
function displayAllValues(hex, rgb, hsl) {
  HTML.hexOutPut.textContent = `#${hex}`; //adding the color value/text to the span element.
  HTML.rgbOutPut.textContent = `${rgb}`;
  HTML.hslOutPut.textContent = `${hsl}`;

  HTML.colorCircle.style.backgroundColor = hex;
}
