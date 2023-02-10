import style_midikeys_keymap from "./keyMaps/midikeys.js";
import style_automk2_keymap from "./keyMaps/automk2.js";

import style_1keyHandler from "./keyHandlers/style1.js";
import youtube_style_keyHandler from "./keyHandlers/youtube.js";
import midiKeys_style_keyHandler from "./keyHandlers/midiKeys.js";

let notes = document.getElementById("notes");
export let now_octave = 4;
let is_midi_mode = false;
let has_midi_access = false;

const sampler_settings = {
  urls: {
    C4: "c4.mp3",
    D4: "d4.mp3",
    E4: "e4.mp3",
    F4: "f4.mp3",
    G4: "g4.mp3",
    A4: "a4.mp3",
    B4: "b4.mp3",
    C5: "c5.mp3",
    D5: "d5.mp3",
    E5: "e5.mp3",
  },
  baseUrl: "https://oein.github.io/Riano/audio/konuri/",
  onload: () => {
    console.log("Loaded!");
  },
};

const sampler = new Tone.Sampler(sampler_settings).toDestination();

let playings = [];

function deleteInArray(array, element) {
  let index = array.indexOf(element);
  if (index != -1) array.splice(index, 1);
  return array;
}

function shOctaContainer(state) {
  let opa = "0";
  let trans = "translateY(-1.2rem)";
  let poi = "none";
  let mh = "0px";
  if (state) {
    opa = "1";
    trans = "translateY(0px)";
    poi = "";
    mh = "3rem";
  }

  let elements = [
    document.getElementById("octaContainer"),
    document.getElementById("keyStyleWarp"),
  ];
  elements.forEach((e) => {
    e.style.opacity = opa;
    e.style.transform = trans;
    e.style.pointerEvents = poi;
    e.style.maxHeight = mh;
  });
}

function midiUseHandler(use) {
  shOctaContainer(!use);
  is_midi_mode = use;

  if (!use) return;
  removeAllNotes();
  requestMidiAccess();
}

function showOctave() {
  document.getElementById("octa").innerText = now_octave;
}

function pitchToName(pitch) {
  let kx = {
    0: "C",
    1: "C#",
    2: "D",
    3: "D#",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "G#",
    9: "A",
    10: "A#",
    11: "B",
  };

  let octa = Math.floor(pitch / 12);
  let pit = kx[pitch % 12];

  return `${pit}${octa}`;
}

export function addPlayElement(keyPitch) {
  let di = document.createElement("div");
  di.innerText = pitchToName(keyPitch);
  di.id = `play-${keyPitch}`;
  di.className = "playing";
  di.setAttribute("data-pwo", keyPitch % 12);
  notes.appendChild(di);
  playings.push(keyPitch);
  sampler.triggerAttack(pitchToName(keyPitch));
}

export function removePlayElement(keyPitch) {
  document.getElementById(`play-${keyPitch}`)?.remove();
  playings = deleteInArray(playings, keyPitch);
  sampler.triggerRelease(pitchToName(keyPitch));
}

export function removeAllNotes() {
  for (let i = 0; i < 2; i++) playings.forEach(removePlayElement);
}

function konuri_mk2_style_keyHandler(key, kick) {
  if (typeof style_automk2_keymap[key] == "undefined") return;
  let pitch = style_automk2_keymap[key] + now_octave * 12;
  if (kick) addPlayElement(pitch);
  else removePlayElement(pitch);
}

function keyHandler(e, t) {
  console.log(e);
  if (is_midi_mode) return;
  if (e == "Space") return removeAllNotes();
  switch (document.getElementById("keyStyle").value) {
    case "yt":
      now_octave = 4;
      showOctave();
      return youtube_style_keyHandler(e, t);
    case "ri":
      now_octave = 4;
      showOctave();
      return style_1keyHandler(e, t);
    case "mk":
      now_octave = 3;
      showOctave();
      return midiKeys_style_keyHandler(e, t);
  }
}

function midiRequestErorHandler(e) {
  console.error(e);
  toastr.error("MIDI 권한을 얻지 못했어요..");
}

function onMIDIdeviceMessage(e) {
  if (!is_midi_mode) return;
  let dat = e.data;

  let isNoteOn = dat[0] == 144;
  let key = Number(dat[1]);
  let vol = Number(dat[2]);

  if (isNoteOn) addPlayElement(key);
  else removePlayElement(key);
}

function midiEventHandler(midiAccess, e) {
  console.log("MIDI", e);
  if (e?.port?.state == "disconnected") {
    toastr.warning(
      `MIDI 장치가 연결이 해제되었어요. / ${
        e?.port?.name || e?.port?.manufacturer || e?.port?.id
      }`
    );
  }
  for (var input of midiAccess.inputs.values()) {
    toastr.info(
      `새로운 MIDI 장치가 발견되었어요! / ${
        input.name || input.manufacturer || input.id
      }`
    );
    input.onmidimessage = onMIDIdeviceMessage;
  }
}

/**
 * @param {MIDIAccess} midiAccess
 */
function midiRequestSuccessHandler(midiAccess) {
  console.log("Success!");
  has_midi_access = true;
  midiAccess.addEventListener("statechange", (e) =>
    midiEventHandler(midiAccess, e)
  );
  midiEventHandler(midiAccess);
}

function requestMidiAccess() {
  if (has_midi_access) return;
  console.log("Requesting midi access");
  navigator
    .requestMIDIAccess()
    .catch(midiRequestErorHandler)
    .then(midiRequestSuccessHandler);
}

document.addEventListener(
  "keydown",
  (e) => !e.repeat && keyHandler(e.code, true)
);
document.addEventListener("keyup", (e) => keyHandler(e.code, false));
document
  .getElementById("midiuse")
  .addEventListener("change", (e) => midiUseHandler(e.target.checked));

shOctaContainer(true);

export default {};