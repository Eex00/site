// Function to start music after intro
function initializeMusicAfterIntro() {
    const musicPlayer = document.getElementById('music-player');
    const audioPlayer = document.getElementById('audio-player');
    
    if (musicPlayer && audioPlayer) {
        musicPlayer.style.display = 'block';
        audioPlayer.volume = 1; // volume max par défaut
        audioPlayer.play().catch(err => {
            console.log("[MUSIC] Autoplay blocked, waiting for user interaction");
        });
        
        console.log('[MUSIC] Audio started');

        // Link slider to volume
        const volumeControl = document.getElementById('volume-control');
        if (volumeControl) {
            volumeControl.addEventListener('input', function() {
                audioPlayer.volume = this.value;
            });
        }
    }
}

// Start music manually (if needed)
document.getElementById('start-music').addEventListener('click', function() {
    initializeMusicAfterIntro();
});

// Change track
function changeAudioMusic(filePath) {
    const audioPlayer = document.getElementById('audio-player');
    if (audioPlayer) {
        audioPlayer.src = filePath;
        audioPlayer.play();
    }
}

// Stop track
function stopAudioMusic() {
    const audioPlayer = document.getElementById('audio-player');
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
}
