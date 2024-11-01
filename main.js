// Selecting DOM elements
const ayahContainer = document.querySelector(".ayah-body");
const fetchButton = document.querySelector(".btn");

// Function to fetch a random Ayah
const fetchRandomAyah = async () => {
    const API_URL = `https://api.alquran.cloud/v1/ayah/${Math.floor(Math.random() * 6236)}/ar.alafasy`;
    
    const response = await fetch(API_URL);
    const data = await response.json();
    renderAyah(data.data);

    // Set initial volume
    const savedVolume = sessionStorage.getItem("volume");
    audioElement.volume = savedVolume || 0.8;

};

// Event listener for the fetch button
fetchButton.addEventListener("click", fetchRandomAyah);

// Function to render the Ayah
const renderAyah = (data) => {
    ayahContainer.innerHTML = getAyahHTML(data);
    
    const audioElement = ayahContainer.querySelector(".audio");
    const audioIcon = ayahContainer.querySelector(".play-icon");
    const heartIcon = ayahContainer.querySelector(".bi-heart");
    const volumeInput = ayahContainer.querySelector(".volume-inp");
    const volumeIcon = ayahContainer.querySelector(".bi-volume-up");

    // Event listeners
    audioIcon.addEventListener("click", () => toggleAudio(audioElement, audioIcon));
    heartIcon.addEventListener("click", () => toggleHeart(heartIcon));
    
    audioElement.addEventListener("ended", () => {
        audioIcon.classList.replace("bi-pause-fill", "bi-play-fill");
    });

    // Initialize volume
    volumeInput.value = sessionStorage.getItem("volume") || 0.8;
    audioElement.volume = volumeInput.value;

    volumeInput.addEventListener("input", () => {
        audioElement.volume = volumeInput.value;
        sessionStorage.setItem("volume", volumeInput.value);
    });

    volumeIcon.addEventListener("click", () => {
        volumeInput.classList.toggle("visible");
    });
};

// Function to generate HTML for the Ayah
const getAyahHTML = (data) => {
    return `
        <h1 class="title">قرآن كريم</h1>
        <div class="details">
            <div class="playing">${'<div class="line"></div>'.repeat(6)}</div>
            <div class="text">
                <h3 class="name">${data.surah.name}</h3>
                <h3 class="number-ayah">آية رقم <span>${data.surah.number}</span></h3>
            </div>
        </div>
        <div class="ayah">
            <p>${data.text}</p>
        </div>
        <div class="controls">
            <i class="bi bi-heart"></i>
            <i class="bi bi-play-fill play-icon"></i>
            <audio class="audio" src="${data.audio}"></audio>
            <div class="volume-control">
                <input type="range" class="volume-inp" min="0" max="1" step="0.01" />
                <i class="bi bi-volume-up"></i>
            </div>
        </div>
    `;
};

// Function to toggle audio play/pause
const toggleAudio = (audioElement, audioIcon) => {
    if (audioIcon.classList.contains("bi-play-fill")) {
        playAudio(audioElement);
        audioIcon.classList.replace("bi-play-fill", "bi-pause-fill");
    } else {
        pauseAudio(audioElement);
        audioIcon.classList.replace("bi-pause-fill", "bi-play-fill");
    }
};

// Function to play audio
const playAudio = (audioElement) => {
    audioElement.play();
};

// Function to pause audio
const pauseAudio = (audioElement) => {
    audioElement.pause();
};

// Function to toggle heart icon
const toggleHeart = (heartElement) => {
    if (heartElement.classList.contains("bi-heart")) {
        heartElement.classList.replace("bi-heart", "bi-heart-fill");
        heartElement.classList.add("love");
    } else {
        heartElement.classList.replace("bi-heart-fill", "bi-heart");
        heartElement.classList.remove("love");
    }
};