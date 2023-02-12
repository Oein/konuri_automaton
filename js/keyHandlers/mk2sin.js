import { addPlayElement, now_octave, removeAllNotes } from "../index.js";
import style_mk2_keymap from "../keyMaps/mk2.js";

function mk2sin_style_keyHandler(key, kick) {
  if (!kick) return;
  if (typeof style_mk2_keymap[key] == "undefined") return;
  let pitch = style_mk2_keymap[key] + now_octave * 12;
  removeAllNotes();
  if (kick) addPlayElement(pitch);
}

export default mk2sin_style_keyHandler;
