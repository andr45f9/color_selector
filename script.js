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
  const hexValue = HTML.colorInput.value.substring(1); //we take the color input and turns it into a hex string.
  console.log(hexValue);

  const rgbValue = convertToRGB(hexValue);
  console.log(rgbValue);

  const hslValue = convertToHSL(rgbValue);
  console.log(hslValue);

  displayAllValues(hexValue, rgbValue, hslValue);
  displaySelectedColor(hexValue); //Sends the value of hexValue to the mentioned function, so we can change the background color.
}

//Convert the hex value to rgb.
function convertToRGB(hex) {
  //console.log(hex);

  const red = parseInt("0x" + hex.substring(0, 2));
  const green = parseInt("0x" + hex.substring(2, 4));
  const blue = parseInt("0x" + hex.substring(4, 6));

  return { red, green, blue };
}

//Convert the hex value to hsl.
function convertToHSL(rgb) {
  const r = rgb.red / 255;
  const g = rgb.green / 255;
  const b = rgb.blue / 255;

  //hue, saturation, luminance
  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  switch (max) {
    //if max === min
    case min:
      h = 0;
      break;

    //if max === r
    case r:
      h = 60 * (0 + (g - b) / (max - min));
      break;

    //if max === g
    case g:
      h = 60 * (2 + (b - r) / (max - min));
      break;

    //if max === b
    case b:
      h = 60 * (4 + (r - g) / (max - min));
      break;
  }

  //cycle between 0 to 360 degrees
  if (h < 0) {
    h = h + 360;
  }

  //calculate luminance
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

  return { h, s, l };
}

//Displays the rgb, hex and hsl value in the document.
function displayAllValues(hex, rgb, hsl) {
  HTML.hexOutPut.textContent = `${hex}`; //adding the color value/text to the span element.
  HTML.rgbOutPut.textContent = `${rgb.red}, ${rgb.green}, ${rgb.blue}`;
  HTML.hslOutPut.textContent = `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
}

//Displays the slected color in the color circle.
function displaySelectedColor(hex) {
  HTML.colorCircle.style.backgroundColor = `#${hex}`;
}
