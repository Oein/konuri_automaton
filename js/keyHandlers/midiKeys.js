import style_midikeys_keymap from "../keyMaps/midikeys.js";
import khn from "./main.js";

function midiKeys_style_keyHandler(key, kick) {
  khn(style_midikeys_keymap, key, kick, false);
}

export default midiKeys_style_keyHandler;
