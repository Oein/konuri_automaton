import khn from "./main.js";
import style_mk2_keymap from "../keyMaps/mk2.js";

function mk2sin_style_keyHandler(key, kick) {
  khn(style_mk2_keymap, key, kick, true);
}

export default mk2sin_style_keyHandler;
