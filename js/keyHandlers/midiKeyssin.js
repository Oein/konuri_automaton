import style_midikeys_keymap from "../keyMaps/midikeys.js";
import khn from "./main.js";

function smidiKeys_style_keyHandler(key, kick) {
  khn(style_midikeys_keymap, key, kick, true);
}

export default smidiKeys_style_keyHandler;
