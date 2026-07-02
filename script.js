const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const cardImage = document.getElementById('cardImage');
const imagePlaceholder = document.getElementById('imagePlaceholder');
const characterName = document.getElementById('characterName');
const animeTitle = document.getElementById('animeTitle');
const characterPower = document.getElementById('characterPower');
const characterDescription = document.getElementById('characterDescription');
const cardTheme = document.getElementById('cardTheme');
const rarity = document.getElementById('rarity');
const zodiacSign = document.getElementById('zodiacSign');
const strInput = document.getElementById('strInput');
const velInput = document.getElementById('velInput');
const intInput = document.getElementById('intInput');
const magInput = document.getElementById('magInput');
const strValue = document.getElementById('strValue');
const velValue = document.getElementById('velValue');
const intValue = document.getElementById('intValue');
const magValue = document.getElementById('magValue');
const downloadBtn = document.getElementById('downloadBtn');

const animeCard = document.getElementById('animeCard');
const cardCharacterName = document.getElementById('cardCharacterName');
const cardAnimeTitle = document.getElementById('cardAnimeTitle');
const cardCharacterPower = document.getElementById('cardCharacterPower');
const cardCharacterDescription = document.getElementById('cardCharacterDescription');
const cardRarity = document.getElementById('cardRarity');
const cardZodiac = document.getElementById('cardZodiac');
const cardPowerNumber = document.getElementById('cardPowerNumber');
const cardMagicNumber = document.getElementById('cardMagicNumber');
const strBar = document.getElementById('strBar');
const velBar = document.getElementById('velBar');
const intBar = document.getElementById('intBar');

uploadArea.addEventListener('click', () => {
    imageInput.click();
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleImageUpload(files[0]);
    }
});

imageInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleImageUpload(e.target.files[0]);
    }
});

function handleImageUpload(file) {
    if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione uma imagem válida.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        cardImage.src = e.target.result;
        cardImage.style.display = 'block';
        imagePlaceholder.style.display = 'none';
        resetImagePosition();
    };
    reader.readAsDataURL(file);
}

characterName.addEventListener('input', (e) => {
    cardCharacterName.textContent = e.target.value || 'Nome do Personagem';
});

animeTitle.addEventListener('input', (e) => {
    cardAnimeTitle.textContent = e.target.value || 'Nome do Anime';
});

characterPower.addEventListener('input', (e) => {
    cardCharacterPower.textContent = e.target.value || 'Poder';
});

characterDescription.addEventListener('input', (e) => {
    cardCharacterDescription.textContent = e.target.value || 'Uma breve descrição do personagem aparecerá aqui...';
});

cardTheme.addEventListener('change', (e) => {
    animeCard.setAttribute('data-theme', e.target.value);
});

rarity.addEventListener('change', (e) => {
    const rarityMap = {
        'common': 'Comum',
        'rare': 'Raro',
        'epic': 'Épico',
        'legendary': 'Lendário',
        'mythic': 'Mítica'
    };
    
    cardRarity.textContent = rarityMap[e.target.value];
    animeCard.setAttribute('data-rarity', e.target.value);
});

zodiacSign.addEventListener('change', (e) => {
    const zodiacSymbols = {
        'aries': '♈️',
        'taurus': '♉️',
        'gemini': '♊️',
        'cancer': '♋️',
        'leo': '♌️',
        'virgo': '♍️',
        'libra': '♎️',
        'scorpio': '♏️',
        'sagittarius': '♐️',
        'capricorn': '♑️',
        'aquarius': '♒️',
        'pisces': '♓️'
    };
    
    const symbol = zodiacSymbols[e.target.value] || 'N/A';
    cardZodiac.textContent = symbol;
    
    if (symbol === 'N/A') {
        cardZodiac.classList.add('na-text');
    } else {
        cardZodiac.classList.remove('na-text');
    }
});

strInput.addEventListener('input', (e) => {
    const value = e.target.value;
    strValue.textContent = value;
    strBar.style.width = `${value}%`;
    updateTotalPower();
});

velInput.addEventListener('input', (e) => {
    const value = e.target.value;
    velValue.textContent = value;
    velBar.style.width = `${value}%`;
    updateTotalPower();
});

intInput.addEventListener('input', (e) => {
    const value = e.target.value;
    intValue.textContent = value;
    intBar.style.width = `${value}%`;
    updateTotalPower();
});

magInput.addEventListener('input', (e) => {
    const value = e.target.value;
    magValue.textContent = value;
    cardMagicNumber.textContent = value;
});

// Image drag functionality
let isDragging = false;
let isPinching = false;
let startX, startY;
let imagePosX = 0, imagePosY = 0;
let currentImageX = 0, currentImageY = 0;
let currentScale = 1;
let initialPinchDistance = 0;
let initialScale = 1;

cardImage.addEventListener('mousedown', startDrag);
cardImage.addEventListener('touchstart', handleTouchStart, { passive: false });

document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', handleTouchMove, { passive: false });

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    startX = clientX - currentImageX;
    startY = clientY - currentImageY;
    
    cardImage.style.cursor = 'grabbing';
}

function handleTouchStart(e) {
    if (e.touches.length === 1) {
        // Single touch - drag
        startDrag(e);
    } else if (e.touches.length === 2) {
        // Two touches - pinch zoom
        e.preventDefault();
        isPinching = true;
        isDragging = false;
        initialPinchDistance = getPinchDistance(e.touches);
        initialScale = currentScale;
    }
}

function handleTouchMove(e) {
    if (isDragging && e.touches.length === 1) {
        drag(e);
    } else if (isPinching && e.touches.length === 2) {
        e.preventDefault();
        const currentPinchDistance = getPinchDistance(e.touches);
        const scaleChange = currentPinchDistance / initialPinchDistance;
        currentScale = Math.max(0.5, Math.min(3, initialScale * scaleChange));
        updateTransform();
    }
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    
    currentImageX = clientX - startX;
    currentImageY = clientY - startY;
    
    updateTransform();
}

function endDrag() {
    isDragging = false;
    isPinching = false;
    cardImage.style.cursor = 'grab';
}

function getPinchDistance(touches) {
    return Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY
    );
}

function updateTransform() {
    cardImage.style.transform = `translate(${currentImageX}px, ${currentImageY}px) scale(${currentScale})`;
}

function resetImagePosition() {
    currentImageX = 0;
    currentImageY = 0;
    currentScale = 1;
    updateTransform();
}

// Add cursor style on hover
cardImage.addEventListener('mouseenter', () => {
    if (cardImage.style.display !== 'none') {
        cardImage.style.cursor = 'grab';
    }
});

cardImage.addEventListener('mouseleave', () => {
    if (!isDragging) {
        cardImage.style.cursor = 'default';
    }
});

function updateTotalPower() {
    const str = parseInt(strInput.value);
    const vel = parseInt(velInput.value);
    const int = parseInt(intInput.value);
    const total = Math.round((str + vel + int) / 3);
    cardPowerNumber.textContent = total;
}

downloadBtn.addEventListener('click', async () => {
    try {
        const canvas = await html2canvas(animeCard, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true
        });
        
        const link = document.createElement('a');
        link.download = `anime-card-${characterName.value || 'character'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (error) {
        console.error('Erro ao baixar o card:', error);
        alert('Erro ao baixar o card. Por favor, tente novamente.');
    }
});

function initializeStats() {
    strBar.style.width = `${strInput.value}%`;
    velBar.style.width = `${velInput.value}%`;
    intBar.style.width = `${intInput.value}%`;
    cardMagicNumber.textContent = magInput.value;
    updateTotalPower();
    cardZodiac.textContent = 'N/A';
    cardZodiac.classList.add('na-text');
}

initializeStats();
