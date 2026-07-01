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
        'legendary': 'Lendário'
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
    
    cardZodiac.textContent = zodiacSymbols[e.target.value] || '';
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
}

initializeStats();
