import khn from "./main.js";
import style_mk2_keymap from "../keyMaps/automk2.js";

function mk2_style_keyHandler(key, kick, type) {
  khn(style_mk2_keymap, key, kick, type);
}

export default mk2_style_keyHandler;
