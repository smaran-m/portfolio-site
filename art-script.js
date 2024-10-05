// Art gallery setup
const thumbnailGrid = document.getElementById('thumbnailGrid');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const closeBtn = document.querySelector('.close');
const artworkTitle = document.getElementById('artworkTitle');

let artworks = [];
let currentArtworkIndex = 0;
let currentImageIndex = 0;

// ASCII frame characters
const frameChars = ['░', '▒', '▓', '█', '■', '●', '▪'];
const cornerChars = ['★', '✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮', '✯', '✰'];

// Function to create ASCII frame
function createAsciiFrame(width, height) {
    const frameChar = frameChars[Math.floor(Math.random() * frameChars.length)];
    const cornerChar = cornerChars[Math.floor(Math.random() * cornerChars.length)];

    const horizontalLine = cornerChar + frameChar.repeat(width - 2) + cornerChar;
    const emptyLine = frameChar + ' '.repeat(width - 2) + frameChar;
    
    let frame = horizontalLine + '\n';
    for (let i = 0; i < height - 2; i++) {
        frame += emptyLine + '\n';
    }
    frame += horizontalLine;
    
    return frame;
}

// Load artworks from JSON file
fetch('/assets/art/artworks.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Artworks data loaded:', data);
        artworks = data;
        createThumbnails();
    })
    .catch(error => {
        console.error('Error loading artworks:', error);
        thumbnailGrid.textContent = 'Error loading artworks. Please try again later.';
    });

// Create thumbnails
function createThumbnails() {
    if (artworks.length === 0) {
        console.warn('No artworks found in the loaded data.');
        thumbnailGrid.textContent = 'No artworks available.';
        return;
    }

    artworks.forEach((artwork, index) => {
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.className = 'thumbnail-container';
        
        const asciiFrame = document.createElement('pre');
        asciiFrame.className = 'ascii-frame';
        asciiFrame.textContent = createAsciiFrame(25, 15);
        
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        const thumbnailPath = `/assets/art/${artwork.thumbnail}`;
        thumbnail.style.backgroundImage = `url('${thumbnailPath}')`;
        thumbnail.addEventListener('click', () => openModal(index));
        
        const thumbnailTitle = document.createElement('div');
        thumbnailTitle.className = 'thumbnail-title';
        thumbnailTitle.textContent = artwork.title;
        
        thumbnailContainer.appendChild(asciiFrame);
        thumbnailContainer.appendChild(thumbnail);
        thumbnailContainer.appendChild(thumbnailTitle);
        thumbnailGrid.appendChild(thumbnailContainer);
    });
}

// Open modal
function openModal(index) {
    currentArtworkIndex = index;
    currentImageIndex = 0;
    modal.style.display = 'block';
    updateModalImage();
    updateArtworkTitle();
}

// Update modal image and caption
function updateModalImage() {
    const artwork = artworks[currentArtworkIndex];
    modalImg.src = `/assets/art/${artwork.images[currentImageIndex]}`;
    modalImg.alt = `${artwork.title} - Image ${currentImageIndex + 1}`;
    modalCaption.textContent = artwork.captions[currentImageIndex] || `${artwork.title} - Image ${currentImageIndex + 1}`;
}

// Update artwork title
function updateArtworkTitle() {
    const artwork = artworks[currentArtworkIndex];
    artworkTitle.textContent = artwork.title;
}

// Next image
function nextImage() {
    const artwork = artworks[currentArtworkIndex];
    currentImageIndex = (currentImageIndex + 1) % artwork.images.length;
    updateModalImage();
}

// Previous image
function prevImage() {
    const artwork = artworks[currentArtworkIndex];
    currentImageIndex = (currentImageIndex - 1 + artwork.images.length) % artwork.images.length;
    updateModalImage();
}

// Close modal
closeBtn.onclick = function() {
    modal.style.display = 'none';
    artworkTitle.textContent = '';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        artworkTitle.textContent = '';
    }
}

// Add event listeners for arrow keys and navigation buttons
document.addEventListener('keydown', function(event) {
    if (modal.style.display === 'block') {
        if (event.key === 'ArrowRight') {
            nextImage();
        } else if (event.key === 'ArrowLeft') {
            prevImage();
        }
    }
});

document.querySelector('.prev').addEventListener('click', prevImage);
document.querySelector('.next').addEventListener('click', nextImage);