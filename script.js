console.log("Welcome to the spotify")

let songIndex = 0;
let audioElement = new Audio('song/1.mp3')
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let masterSong = document.getElementById('masterSong');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs =[
    {songname: "Perfect- Ed sheeran", filepath:"song/1.mp3",coverpath:"poster/1.jpg"},
    {songname: "Let me love u - justin beiber", filepath:"song/2.mp3",coverpath:"poster/2.jpg"},
    {songname: "Teesri Manzil - Divine", filepath:"song/3.mp3",coverpath:"poster/3.jpg"},
    {songname: "Calm Down - Selena Gomez", filepath:"song/4.mp3",coverpath:"poster/4.jpg"},
    {songname: "O re Piya", filepath:"song/5.mp3",coverpath:"poster/5.jpg"},
   
]
songItems.forEach((element,i)=>{
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
})

masterPlay.addEventListener('click',()=>{
     if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate');
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    // console.log(progress)
    progressBar.value = progress 
})

progressBar.addEventListener('change',()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')

    })

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src =`song/${songIndex+1}.mp3`;
        masterSong.innerText = songs[songIndex].songname;
        // console.log(masterSong.innerText);
        audioElement.currentTime = 0
        audioElement.play()
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>4){
        songIndex == 0
    }
    else{
        songIndex += 1;
    }
    masterSong.innerText = songs[songIndex].songname;
    audioElement.src =`song/${songIndex+1}.mp3`;
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex == 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src =`song/${songIndex+1}.mp3`;
    masterSong.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})