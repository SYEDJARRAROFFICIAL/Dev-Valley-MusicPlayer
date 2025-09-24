let progress = document.getElementById("progress");
let songs = document.getElementById("songs");
let playPause = document.getElementById("play-pause");
let back = document.getElementById("back");
let forward = document.getElementById("forward");
let sources = songs.querySelectorAll("source");
let playlist = document.getElementById("playlist")
let songsArray = Array.from(sources).map((source) => source.src);
let currentSongIndex = 0;

songs.addEventListener("loadedmetadata", () => {
  progress.max = songs.duration;
  progress.value = songs.currentTime;
});
playPause.addEventListener("click", () => {
  if (songs.paused) {
    songs.play();
    playPause.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  } else {
    songs.pause();
    playPause.innerHTML = `<i class="fa-solid fa-play"></i>`;
  }
});

songsArray.forEach((song, index) => {
  const div = document.createElement("div");
  div.classList.add("song-item");
  div.textContent = decodeURIComponent(song.split("/").pop().replace(".mp3", ""));
  div.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    songs.play();
    playPause.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  });

  playlist.appendChild(div); 
});


songs.addEventListener("timeupdate", () => {
  progress.value = songs.currentTime;
});
progress.addEventListener("input", () => {
  songs.currentTime = progress.value;
});
function loadSong(index) {
  songs.src = songsArray[index];
  songs.load();
}
forward.addEventListener("click", () => {
  currentSongIndex++;
  if (currentSongIndex >= songsArray.length) {
    currentSongIndex = 0;
  }
  loadSong(currentSongIndex);
  songs.play();
  playPause.innerHTML = `<i class="fa-solid fa-pause"></i>`;
});
back.addEventListener("click", () => {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songsArray.length - 1;
  }
  loadSong(currentSongIndex);
  songs.play();
  playPause.innerHTML = `<i class="fa-solid fa-pause"></i>`;
});
songs.addEventListener("ended", () => {
  forward.click();
});
