import style_midikeys_keymap from "../keyMaps/midikeys.js";
import khn from "./main.js";

function midiKeys_style_keyHandler(key, kick, type) {
  khn(style_midikeys_keymap, key, kick, type);
}

export default midiKeys_style_keyHandler;
