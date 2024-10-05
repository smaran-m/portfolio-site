// Music player and visualizer setup
const trackGrid = document.getElementById('trackGrid');
const visualizerContainer = document.getElementById('visualizer-container');

let tracklists = [];
let currentlyPlaying = null;
let currentNowPlayingDisplay = null;

// Function to calculate FFT size based on window width
function calculateFFTSize() {
    const width = window.innerWidth;
    let fftSize = Math.pow(2, Math.ceil(Math.log2(width / 10)));
    return Math.max(32, Math.min(2048, fftSize));
}

function createVisualizer(audio, songTitle, albumTitle) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = calculateFFTSize();
    let bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);

    const visualizer = document.createElement('div');
    visualizer.className = 'visualizer';
    visualizerContainer.appendChild(visualizer);

    const nowPlayingDisplay = document.createElement('div');
    nowPlayingDisplay.className = 'now-playing';
    nowPlayingDisplay.style.display = 'none';  // Initially hidden
    visualizerContainer.insertBefore(nowPlayingDisplay, visualizer);

    function updateColumns() {
        visualizer.innerHTML = '';
        for (let i = 0; i < bufferLength; i++) {
            const column = document.createElement('div');
            column.className = 'visualizer-column';
            visualizer.appendChild(column);
        }
    }

    updateColumns();

    function updateVisualizer() {
        analyser.getByteFrequencyData(dataArray);

        const columns = visualizer.children;
        for (let i = 0; i < bufferLength; i++) {
            const column = columns[i];
            const value = dataArray[i];
            const percent = value / 255;
            const height = Math.round(percent * 10);
            
            let columnContent = '';
            for (let j = 0; j < height; j++) {
                const intensity = (j + 1) / height;
                const colorClass = `intensity-${Math.round(intensity * 20)}`;
                columnContent += `<span class="${colorClass}">■</span>`;
            }
            column.innerHTML = columnContent;
        }

        requestAnimationFrame(updateVisualizer);
    }

    audio.addEventListener('play', () => {
        if (currentlyPlaying && currentlyPlaying !== audio) {
            currentlyPlaying.pause();
        }
        if (currentNowPlayingDisplay) {
            currentNowPlayingDisplay.style.display = 'none';
        }
        currentlyPlaying = audio;
        currentNowPlayingDisplay = nowPlayingDisplay;
        nowPlayingDisplay.textContent = `now playing: ${songTitle} | ${albumTitle}`;
        nowPlayingDisplay.style.display = 'block';
        audioContext.resume().then(() => updateVisualizer());
    });

    audio.addEventListener('pause', () => {
        if (currentlyPlaying === audio) {
            nowPlayingDisplay.style.display = 'none';
        }
    });

    audio.addEventListener('ended', () => {
        if (currentlyPlaying === audio) {
            currentlyPlaying = null;
            currentNowPlayingDisplay = null;
            nowPlayingDisplay.style.display = 'none';
        }
    });

    window.addEventListener('resize', () => {
        const newFFTSize = calculateFFTSize();
        if (newFFTSize !== analyser.fftSize) {
            analyser.fftSize = newFFTSize;
            bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
            updateColumns();
        }
    });
}

// Function to create track items
function createTrackItems() {
    trackGrid.innerHTML = ''; // Clear existing tracks

    tracklists.forEach((tracklist, index) => {
        const tracklistItem = document.createElement('div');
        tracklistItem.className = 'tracklist-item';

        const thumbnail = document.createElement('img');
        thumbnail.src = tracklist.thumbnail;
        thumbnail.alt = tracklist.title;
        thumbnail.className = 'tracklist-thumbnail';

        const title = document.createElement('h2');
        title.textContent = tracklist.title;
        title.className = 'tracklist-title';

        tracklistItem.appendChild(thumbnail);
        tracklistItem.appendChild(title);

        tracklist.songs.forEach((song, songIndex) => {
            const audioContainer = document.createElement('div');
            audioContainer.className = 'audio-container';

            const audio = document.createElement('audio');
            audio.className = 'audio-player';
            audio.src = song.url;

            const songTitle = document.createElement('div');
            songTitle.textContent = song.title;
            songTitle.className = 'song-title';

            const controls = document.createElement('div');
            controls.className = 'custom-audio-controls';

            const playPauseBtn = document.createElement('button');
            playPauseBtn.className = 'play-pause-btn';
            playPauseBtn.innerHTML = '&#9658;'; // Play icon

            const progressContainer = document.createElement('div');
            progressContainer.className = 'progress-container';

            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressContainer.appendChild(progressBar);

            const timeDisplay = document.createElement('div');
            timeDisplay.className = 'time-display';
            timeDisplay.textContent = '0:00 / 0:00';

            controls.appendChild(playPauseBtn);
            controls.appendChild(progressContainer);
            controls.appendChild(timeDisplay);

            audioContainer.appendChild(songTitle);
            audioContainer.appendChild(audio);
            audioContainer.appendChild(controls);

            tracklistItem.appendChild(audioContainer);

            // Event listeners for custom controls
            playPauseBtn.addEventListener('click', () => {
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
            });

            audio.addEventListener('play', () => {
                playPauseBtn.innerHTML = '&#10074;&#10074;'; // Pause icon
            });

            audio.addEventListener('pause', () => {
                playPauseBtn.innerHTML = '&#9658;'; // Play icon
            });

            progressContainer.addEventListener('click', (e) => {
                const clickPosition = e.offsetX / progressContainer.offsetWidth;
                audio.currentTime = clickPosition * audio.duration;
            });

            audio.addEventListener('timeupdate', () => {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = `${progress}%`;
                timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
            });

            createVisualizer(audio, song.title, tracklist.title);
        });

        trackGrid.appendChild(tracklistItem);
    });
}

// Helper function to format time
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}
// Fetch track data from JSON file
fetch('/assets/music/tracks.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Tracklists data loaded:', data);
        tracklists = data;
        createTrackItems();
    })
    .catch(error => {
        console.error('Error loading tracklists:', error);
        trackGrid.textContent = 'Error loading tracklists. Please try again later.';
    });

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const main = document.querySelector('main');
    
    if (!main) {
        main = document.createElement('main');
        while (body.firstChild) {
            main.appendChild(body.firstChild);
        }
        body.appendChild(main);
    }
    
    if (!visualizerContainer.parentElement) {
        main.insertBefore(visualizerContainer, main.firstChild);
    }
});