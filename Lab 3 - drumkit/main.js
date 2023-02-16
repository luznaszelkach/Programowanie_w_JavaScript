document.addEventListener("keypress", onKeyPress);
const recordedSounds = document.querySelector('.recordedSounds');
const recordButton = document.querySelector('.drumkit__recordButton');
const playButton = document.querySelector('.drumkit__playButton');
const playSelectednoises = document.querySelector('.play_recordedSounds');
const RECORDING_KEY = "82";
const PLAYING_KEY = "32";
const records = [];
let isRecording = false;
let isPlaying = false;



document.addEventListener("keydown", (e) => {
  let audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
  let noise = document.querySelector(`.noise[data-key='${e.keyCode}']`);
  if (noise != null) {
    noise.classList.add("playing");
    audio.currentTime = 0;
    if (audio != null) audio.play();

    setTimeout(function () {
      noise.classList.remove("playing");
    }, 100);
  }
});

function startRecording() {
  currentRecording.notes = [];
  currentRecording.startTime = Date.now();
}

function endRecording() {
  currentRecording.endTime = Date.now();

  if (currentRecording.notes.length > 0) {
    const recordingWithTimeStamps = [];

    for (let i = 0; i < currentRecording.notes.length; i++) {
      recordingWithTimeStamps.push([
        currentRecording.notes[i][0],
        currentRecording.notes[i][1] - currentRecording.startTime,
      ]);
    }

    records.push(recordingWithTimeStamps);
    displayRecord(records.length);
  }
}

function recordSound(sound) {
  currentRecording.notes.push([sound, Date.now()]);
}

function onKeyPress(e) {
  const sound = document.querySelector(`audio[data-key='${e.keyCode}']`);
  if (sound && isRecording) 
    recordSound(sound);

  const play = document.querySelector(`audio[data-key='${e.keyCode}']`);
  if(play){
    console.log(play)
  }

}

function displayRecord(record) {
  const track = document.createElement('div');
  track.classList.add('track')
  track.innerHTML = 
  `<div>Track ${record}
      <span class="play">▶</div>
  </div>`

  const playTrack = track.querySelector('.play');
  playTrack.addEventListener('click', () => {
    isPlaying = true;
    playTrack.textContent = '⏸'
    playSingleRecord(record);
    isPlaying = false;
    playTrack.textContent = '▶'
    
  })
  recordedSounds.appendChild(track);
}

function recordingControl(event) {
  if (event.keyCode === Number(RECORDING_KEY)) {
    if (!isRecording) {
      isRecording = true;
      recordButton.textContent = 'Zakoncz Nagrywanie "R"'
      startRecording();
    } else {
      isRecording = false;
      recordButton.textContent = 'Nagraj "R"'
      endRecording();
    }
  }
}

function playRecord(){
  for(const [record, timeout] of records.flat()){
    setTimeout(() => {
      record.currentTime = 0;
      record.play();
    }, timeout);
  }
}

function playRecordOnKey(e){
  if(e.keyCode === Number(PLAYING_KEY)){
    console.log(e)
    playRecord();
  }
}

function playSingleRecord(selectedRecord) {
  const singleRecord = records[selectedRecord - 1]
  for(const [record, timeout] of singleRecord){
    setTimeout(() => {
      record.currentTime = 0;
      record.play();
    }, timeout);
  }
}

const currentRecording = {
  startTime: 0,
  endTime: 0,
  notes: [],
};


window.addEventListener("keydown", recordingControl);
window.addEventListener("keydown", playRecordOnKey);