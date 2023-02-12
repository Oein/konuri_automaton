import khn from "./main.js";
import style_123_keymap from "../keyMaps/k123.js";

function youtube_style_keyHandler(key, kick) {
  khn(style_123_keymap, key, kick, true);
}

export default youtube_style_keyHandler;
