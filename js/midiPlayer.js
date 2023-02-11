import sampler_settings from "./samplerSettings.js";

const playBtn = document.querySelector("#player");
const file = document.querySelector("#mfilein");

let currentMidi = null;
let playing = false;

function stopit() {
  playBtn.textContent = "재생";
  while (synths.length) {
    const synth = synths.shift();
    synth.dispose();
  }
  synths = [];
}

function parseFile(file) {
  //read the file
  const reader = new FileReader();
  reader.onload = function (e) {
    currentMidi = new Midi(e.target.result);
  };
  reader.readAsArrayBuffer(file);
}

file.addEventListener("change", (e) => {
  if (file.files.length == 0) return;
  parseFile(file.files[0]);
  stopit();
});

let synths = [];

playBtn.addEventListener("click", async (e) => {
  playing = !playing;
  if (playing && currentMidi) {
    Tone.start();
    playBtn.textContent = "로딩중";

    const trackCount = currentMidi.tracks.length;
    let loadedSamples = 0;

    for (let i = 0; i < trackCount; i++) {
      let synth = new Tone.Sampler({
        ...sampler_settings,
        onload: async () => {
          loadedSamples++;
        },
      }).toDestination();

      synths.push(synth);
      Tone.Transport.start();
    }

    const wait_all_loaded = () => {
      return new Promise((resolve, reject) => {
        let inter = null;
        inter = setInterval(() => {
          if (!playing) return resolve(false);
          if (loadedSamples < trackCount) return;
          clearInterval(inter);
          resolve(true);
        }, 100);
      });
    };

    if (!(await wait_all_loaded())) return;

    let now_t = Tone.now();

    currentMidi.tracks.forEach((track, i) => {
      track.notes.forEach((note) => {
        synths[i].triggerAttackRelease(
          note.name,
          note.duration,
          note.time + now_t + 0.1,
          note.velocity
        );
      });
    });

    playBtn.textContent = "정지";
    Tone.Transport.start();
  } else stopit();
});

const volset = (e) => {
  let vol = e.target.value;
  synths.forEach((syh) => {
    syh.volume.value = vol;
  });
};

document.getElementById("vol").addEventListener("change", volset);
document.getElementById("vol").addEventListener("mousemove", volset);

export default {};
