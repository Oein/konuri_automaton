import { addPlayElement, now_octave, removePlayElement } from "../index.js";
import style_mk2_keymap from "../keyMaps/mk2.js";

function mk2_style_keyHandler(key, kick) {
  if (typeof style_mk2_keymap[key] == "undefined") return;
  let pitch = style_mk2_keymap[key] + now_octave * 12;
  if (kick) addPlayElement(pitch);
  else removePlayElement(pitch);
}

export default mk2_style_keyHandler;
