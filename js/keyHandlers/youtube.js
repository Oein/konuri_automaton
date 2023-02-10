import { addPlayElement, now_octave, removeAllNotes } from "../index.js";
import style_123_keymap from "../keyMaps/k123.js";

function youtube_style_keyHandler(key, kick) {
  if (!kick) return;
  if (typeof style_123_keymap[key] == "undefined") return;
  let pitch = style_123_keymap[key] + now_octave * 12;
  removeAllNotes();
  if (kick) addPlayElement(pitch);
}

export default youtube_style_keyHandler;
