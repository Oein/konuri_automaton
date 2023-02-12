import khn from "./main.js";
import style_123_keymap from "../keyMaps/k123.js";

function style_1keyHandler(key, kick) {
  khn(style_123_keymap, key, kick, false);
}

export default style_1keyHandler;
