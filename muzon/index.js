let playpause_btn = document.querySelectorAll('.start');
let current_time = document.querySelectorAll('.current_time');
let total_duration = document.querySelectorAll('.total_duration');
let audio = document.createElement('audio');
let seek_slider = document.querySelectorAll('.seek_slider');
let rotate = document.querySelector('.rotate');
let stop = document.querySelectorAll('.playing__bar');
let volume = document.querySelector('.volum');
let minute_audio;
let second_audio;
let minute = 0;
let second = 0;
let isPlaying = false;
let timer_and = 0;
let volumeaudio = 0.5;
const music_list = [
    {
        img : 'img/maxresdefault.jpg',
        artist : 'College & Electric Youth',
        name : 'A Real Hero',
        music : 'music/College_Electric_Youth_-_A_Real_Hero_48050452.mp3'
    },
    {
        img : 'img/24053.jpg',
        artist : 'PlayboiCarti',
        name : '9am slowed_ reverb',
        music : 'music/Playboi_Carti_-_9am_in_calabasas_slowed_reverb.mp3'
    },
    {
        img : 'img/artworks-9QLjAjaAyjpmKqmF-4WmIAA-t500x500.jpg',
        artist : 'Destroy Lonely',
        name : 'if looks could kill',
        music : 'music/Destroy_Lonely_-_if_looks_could_kill_75548581.mp3' 
    },
    {
        img : 'img/max.jpg',
        artist : '$uicideboy$',
        name : 'Hot Razor',
        music : 'music/$uicideboy$ - Hot Razor.mp3'
    },
    {
        img : 'img/a2a.jpg',
        artist : 'lil peep',
        name : 'beat it',
        music : 'music/lil peep - beat it.mp3'
    },
    {
        img : 'img/m1000x1000.jpg',
        artist : 'Bearded Legend & Gizmo ',
        name : 'RESTART',
        music : 'music/Bearded Legend, Gizmo - RESTART.mp3'
    }
];

audio.src = music_list[0].music;

let mass = document.querySelectorAll(".track_name_avtor");

function Volume(){
    volumeaudio = volume.value;
    if(volumeaudio <= 9){
        volumeaudio = "0.0" + volume.value;
    }
    else{
        volumeaudio = "0." + volume.value; 
    }
    if(volume.value == 100){
        volumeaudio = 1;
    }
    audio.volume = volumeaudio;
}
let clearTime = 0; 
for (let i = 0; i < mass.length; i++) {
    mass[i].addEventListener("click", function() {    
    for (let j = 0; j < mass.length; j++) {
        mass[j].classList.remove("active");
    }
    this.classList.add("active");
    track_index = i;
    loadTrack(track_index);
    });
    
}
function loadTrack(track_index){
    if(isPlaying == false){
        playTrack();
    }
    audio.src = music_list[track_index].music;
    NameArtist = music_list[track_index].name;
    ImgArtist = music_list[track_index].img;

    document.querySelector(".name_audio").innerHTML = NameArtist;
    document.querySelector(".rotate").src = ImgArtist;
    
    clearInterval(tim);
    minute = 0;
    second = 0;
    for (let i = 0; i < current_time.length; i++) {
        if(minute < 10 && second != 60){
            current_time[i].innerHTML = "0" + minute + ":" + second;
            if(second < 10){
                current_time[i].innerHTML = "0" + minute + ":" +"0"+ second;
            }
        }
        else{
            current_time[i].innerHTML = minute + ":" + second;
        }
    }
    clearTime = clearTime + 1;
     if(clearTime == 1){
    setTimeout(playTrack, 1000);
    }
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
    audio.volume = volumeaudio;
}
function playTrack(){
    clearTime = 0;
    audio.play();
    rotate.classList.remove("paused");
    for (let i = 0; i < stop.length; i++) {
        stop[i].classList.remove("stop");
    }
    isPlaying = true;
    for (let i = 0; i < playpause_btn.length; i++) {
        playpause_btn[i].style.borderLeft = '22px solid #7A66CC';
    }
    minute_audio = Math.floor(audio.duration / 60);
    second_audio = Math.floor(audio.duration - (minute_audio * 60));
    if(minute_audio < 10){
        minute_audio = "0" + minute_audio;
    }
    else{
        minute_audio = minute_audio;
    }
    if(second_audio < 10){
        second_audio = "0" + second_audio;
    }
    else{
        second_audio = second_audio;
    }
    for (let i = 0; i < total_duration.length; i++) {
        total_duration[i].innerHTML = minute_audio + ":" + second_audio;
    }
    tim = setInterval(timer, 1000);
    animation = setInterval(animation, 1000);
}

function pauseTrack(){
    rotate.classList.add("paused");
    for (let i = 0; i < stop.length; i++) {
        stop[i].classList.add("stop");
    }
    audio.pause();
    isPlaying = false;
    for (let i = 0; i < playpause_btn.length; i++) {
        playpause_btn[i].style.borderLeft = '22px solid #FFFFFF';
    }
    clearInterval(tim);
}

function timer(){
    second++;
    timer_and++;
    if(second == 60){
        minute++; 
        second = 0;
    }
    for (let i = 0; i < current_time.length; i++) {
        if(minute < 10 && second != 60){
                current_time[i].innerHTML = "0" + minute + ":" + second;
            if(second < 10){
                current_time[i].innerHTML = "0" + minute + ":" +"0"+ second;
            }
        }
        else{
            current_time[i].innerHTML = minute + ":" + second;
        }
    }
    if(parseInt(audio.duration) == timer_and){
        clearInterval(tim);
        console.log(timer_and);
        timer_and = 0;
        minute = 0;
        second = 0;
        rotate.classList.add("paused");
        for (let i = 0; i < stop.length; i++) {
            stop[i].classList.add("stop");
        }
        isPlaying = false;
        for (let i = 0; i < playpause_btn.length; i++) {
            playpause_btn[i].style.borderLeft = '22px solid #FFFFFF';
        }
    }
}

function animation(){
    let seekPosition = 0;
    seekPosition = (audio.currentTime /  audio.duration) * 100;
    for (let i = 0; i < seek_slider.length; i++) {
        seek_slider[i].value = seekPosition;
        document.getElementById('width').style.width = seek_slider[i].value +'%';
    }
    if(parseInt(audio.duration) == timer_and){
        clearInterval(animation);
    }
}

function seekTo(){
    document.getElementById('width').style.width = seek_slider[0].value +'%';
    let seekto = (audio.duration * seek_slider[0].value) / 100;
    timer_and = Math.floor(seekto);
    minute = Math.floor(seekto  / 60);
    second = Math.floor(seekto  - (minute * 60));
    for (let i = 0; i < current_time.length; i++) {
        if(minute < 10 && second != 60){
            current_time[i].innerHTML = "0" + minute + ":" + second;
            if(second < 10){
                current_time[i].innerHTML = "0" + minute + ":" +"0"+ second;
            }
        }
        else{
            current_time[i].innerHTML = minute + ":" + second;
        }
    }
    audio.currentTime = seekto;
}

function seekTo1(){
    let seekto = (audio.duration * seek_slider[1].value) / 100;
    timer_and = Math.floor(seekto);
    minute = Math.floor(seekto  / 60);
    second = Math.floor(seekto  - (minute * 60));
    for (let i = 0; i < current_time.length; i++) {
        if(minute < 10 && second != 60){
            current_time[i].innerHTML = "0" + minute + ":" + second;
            if(second < 10){
                current_time[i].innerHTML = "0" + minute + ":" +"0"+ second;
            }
        }
        else{
            current_time[i].innerHTML = minute + ":" + second;
        }
    }
    audio.currentTime = seekto;
}