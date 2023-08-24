let songIndex = 0;
let songs = [
    { songName: "Sparkle", filepath: "songs/1.mp3" },
    { songName: "Nandemonia", filepath: "songs/2.mp3" },
    { songName: "The Nights", filepath: "songs/3.mp3" },
    { songName: "Who Says", filepath: "songs/4.mp3" },
];


let audioElement = new Audio(songs[songIndex].filepath);
let masterPlay = document.getElementById('masterPlay');
let ProgressBar = document.getElementById('ProgressBar');
let songClass = document.querySelector('.song-class');
let songnameElement = document.querySelector('.songname');
let currentTimeElement = document.querySelector('.current-time');
let songDurationElement = document.querySelector('.song-duration');
let heartButton = document.getElementById('heart');
let nextButton = document.getElementById('next');
let previousButton = document.getElementById('previous');

//for update thr time 
function updateTime() {
    const currentTime = Math.floor(audioElement.currentTime);
    const duration = Math.floor(audioElement.duration);
    currentTimeElement.innerText = formatTime(currentTime);
    songDurationElement.innerText = formatTime(duration);
}


ProgressBar.addEventListener('input', () => {
    const seekTime = (ProgressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});  


//update the progressBar
audioElement.addEventListener('timeupdate', () => {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    ProgressBar.value = progress;
});

//Make human Readable form
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

audioElement.addEventListener('timeupdate', updateTime);
audioElement.addEventListener('ended', () => {
    nextSong();
});

//for heart button
heartButton.addEventListener('click',()=>{
    if(heartButton.style.color == 'black'){
    heartButton.style.color = 'red';
    }
    else{
        heartButton.style.color='black';
    }
})

//Play - Pause button
function playPause() {
    masterPlay.classList.toggle('pause');
    songClass.classList.toggle('play');
    
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        songClass.classList.add('rotate');
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    } else {
        audioElement.pause();
        songClass.classList.remove('rotate');
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
}


//Next-Song
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong();
}

//Previous-song
function previousSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong();
}

//Song Loading
function loadSong() {
    audioElement.src = songs[songIndex].filepath;
    songnameElement.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
}

masterPlay.addEventListener('click', playPause);
nextButton.addEventListener('click', nextSong);
previousButton.addEventListener('click', previousSong);
