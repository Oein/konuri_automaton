import {
  addPlayElement,
  now_octave,
  removePlayElement,
  removeAllNotes,
} from "../index.js";

function khn(keymap, key, kick, isS) {
  if (isS) {
    if (!kick) return;
    if (typeof keymap[key] == "undefined") return;
    let pitch = keymap[key] + now_octave * 12;
    removeAllNotes();
    if (kick) addPlayElement(pitch);
    return;
  }

  if (typeof keymap[key] == "undefined") return;
  let pitch = keymap[key] + now_octave * 12;
  if (kick) addPlayElement(pitch);
  else removePlayElement(pitch);
}

export default khn;
