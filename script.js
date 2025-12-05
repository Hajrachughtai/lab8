let db;

const request = indexedDB.open("lab8DB");

request.onupgradeneeded = function (event) {
    db = event.target.result;
    db.createobjectStore("dataStore", { keyPath: "id"});
};

request.onsuccess = function (event) {
    db = event.target.result;
    loadSavedData(); 
};

request.onerror = () => console.log("DB failed to open");


function saveData(obj) {
    const tx = db.transaction("dataStore", "readwrite");
    const store = db.objectStore("dataStore");
    store.put({id: 1, value: obj});
}

function loadSavedData() {
     const tx = db.transaction("dataStore", "readwrite");
     const store = db.objectStore("dataStore");
     const req = store.get(1);

     req.onsuccess = function () {
        if (!req.result) return;

        const saved = req.result.value;

    document.getElementById("cover").src = saved.cover;
    document.getElementById("songName").textContent = saved.songName;
    document.getElementById("albumName").textContent = saved.albumName;
    document.getElementById("audio").src = saved.audio;
    document.getElementById("flower").src = saved.flower;
     };
}

async function loadData() {

    //🎵 ASIM AZHAR SONG API
    const musicRes = await fetch("https://itunes.apple.com/search?term=asim+azhar&media=music&limit=25" );
    const musicData = await musicRes.json();
    

    const randomSong = musicData.results[Math.floor(Math.random() * musicData.results.length)];

    const cover = randomSong.artworkUrl100.replace("100x100", "300x300");
    const songName = randomSong.trackName;
    const albumName = randomSong.collectionName;
    const audio = randomSong.previewUrl;


    document.getElementById("cover").src = cover;
    document.getElementById("songName").textContent = songName;
    document.getElementById("albumName").textContent = albumName;
    document.getElementById("audio").src = audio;

document.getElementById("flower").src = "https://source.unsplash.com/random/?flower&t=" + Math.random();


saveData({
    cover,
    songName,
    albumName,
    audio,
    flower
});

} 