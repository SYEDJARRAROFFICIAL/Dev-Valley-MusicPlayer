let progress = document.getElementById("progress")
let songs = document.getElementById("songs")
let playPause = document.getElementById("play-pause")
let back = document.getElementById("back")
let forward = document.getElementById("forward")
let sources = songs.querySelectorAll("source")
let songsArray = Array.from(sources).map(source => source.src)
let currentSongIndex = 0
let button = document.getElementById("theme");
const body = document.body;
let isDarkTheme = false;

const toggleTheme = () => {
  isDarkTheme = !isDarkTheme;
  if (isDarkTheme) {
    document.documentElement.style.setProperty('--primary-bg', 'linear-gradient(to right, rgb(45, 52, 75), rgb(60, 60, 65))');
    document.documentElement.style.setProperty('--secondary-bg', '#333');
    document.documentElement.style.setProperty('--text-color', '#fff');
    document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.1)');
    document.documentElement.style.setProperty('--border-color', '#444');
    document.documentElement.style.setProperty('--hover-bg', 'rgba(255, 255, 255, 0.2)');
  } else {
    document.documentElement.style.setProperty('--primary-bg', 'linear-gradient(to right, rgb(119, 149, 195), rgb(165, 162, 160))');
    document.documentElement.style.setProperty('--secondary-bg', '#f0f0f0');
    document.documentElement.style.setProperty('--text-color', '#000');
    document.documentElement.style.setProperty('--card-bg', 'rgba(0, 0, 0, 0.1)');
    document.documentElement.style.setProperty('--border-color', '#ddd');
    document.documentElement.style.setProperty('--hover-bg', 'rgba(0, 0, 0, 0.1)');
  }
};

button.addEventListener("click", toggleTheme);



songs.addEventListener("loadedmetadata",() => {
  progress.max  = songs.duration
  progress.value= songs.currentTime
})
playPause.addEventListener("click",()=>{
  if(songs.paused){
    songs.play()
playPause.innerHTML=`<i class="fa-solid fa-pause"></i>`
  }
  else{
    songs.pause()
    playPause.innerHTML=`<i class="fa-solid fa-play"></i>`
  }
})

songs.addEventListener("timeupdate",()=>{
 progress.value=songs.currentTime
})
progress.addEventListener("input",()=>{
  songs.currentTime=progress.value
})
function loadSong(index){
  songs.src = songsArray[index] 
  songs.load()
}
forward.addEventListener("click", ()=>{
    currentSongIndex++
    if(currentSongIndex >= songsArray.length){
        currentSongIndex=0
    }
        loadSong(currentSongIndex)
        songs.play()
        playPause.innerHTML=`<i class="fa-solid fa-pause"></i>`
    
})
back.addEventListener("click",()=>{
  currentSongIndex--
  if(currentSongIndex < 0){
    currentSongIndex=songsArray.length-1
  }
  loadSong(currentSongIndex)
  songs.play()
   playPause.innerHTML=`<i class="fa-solid fa-pause"></i>`
})
songs.addEventListener("ended",()=>{
  forward.click()
})

