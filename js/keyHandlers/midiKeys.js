import { addPlayElement, now_octave, removePlayElement } from "../index.js";
import style_midikeys_keymap from "../keyMaps/midikeys.js";

function midiKeys_style_keyHandler(key, kick) {
  if (typeof style_midikeys_keymap[key] == "undefined") return;
  let pitch = style_midikeys_keymap[key] + now_octave * 12;
  if (kick) addPlayElement(pitch);
  else removePlayElement(pitch);
}

export default midiKeys_style_keyHandler;
