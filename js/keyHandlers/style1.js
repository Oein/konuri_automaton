import { addPlayElement, now_octave, removePlayElement } from "../index.js";
import style_123_keymap from "../keyMaps/k123.js";

function style_1keyHandler(key, kick) {
  if (typeof style_123_keymap[key] == "undefined") return;
  let pitch = style_123_keymap[key] + now_octave * 12;
  if (kick) addPlayElement(pitch);
  else removePlayElement(pitch);
}

export default style_1keyHandler;
