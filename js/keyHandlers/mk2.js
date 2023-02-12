import khn from "./main.js";
import style_mk2_keymap from "../keyMaps/mk2.js";

function mk2_style_keyHandler(key, kick) {
  khn(style_mk2_keymap, key, kick, false);
}

export default mk2_style_keyHandler;
