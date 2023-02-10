const playBtn = document.querySelector("#player");
const file = document.querySelector("#mfilein");
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
};

let currentMidi = null;
let playing = false;

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
});

let synths = [];
let loops = [];

playBtn.addEventListener("click", async (e) => {
  playing = !playing;
  if (playing && currentMidi) {
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
          note.time + now_t,
          note.velocity
        );
      });
    });

    playBtn.textContent = "정지";
  } else {
    playBtn.textContent = "재생";
    while (synths.length) {
      const synth = synths.shift();
      synth.dispose();
    }
    synths = [];
  }
});
