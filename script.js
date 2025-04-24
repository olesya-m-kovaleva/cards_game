document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart');
    
    let score = 0;
    let cards = [];
    let canFlip = true;
    
    // Типы карточек
    const cardTypes = [
        { value: '+10', points: 10, color: '#4CAF50' },
        { value: '+5', points: 5, color: '#8BC34A' },
        { value: '-10', points: -10, color: '#F44336' },
        { value: '-5', points: -5, color: '#E91E63' }
    ];
    
    // Инициализация игры
    function initGame() {
        score = 0;
        scoreElement.textContent = score;
        cardsContainer.innerHTML = '';
        cards = [];
        canFlip = true;
        
        // Создаем 4 карточки (по одной каждого типа)
        const shuffledTypes = [...cardTypes].sort(() => Math.random() - 0.5);
        
        shuffledTypes.forEach((card, index) => {
            cards.push(card);
            
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.dataset.index = index;
            
            const cardFront = document.createElement('div');
            cardFront.className = 'card-face card-front';
            cardFront.textContent = '?';
            
            const cardBack = document.createElement('div');
            cardBack.className = 'card-face card-back';
            cardBack.textContent = card.value;
            cardBack.style.background = card.color;
            
            cardElement.appendChild(cardFront);
            cardElement.appendChild(cardBack);
            
            cardElement.addEventListener('click', () => flipCard(index));
            cardsContainer.appendChild(cardElement);
        });
    }
    
    // Переворот карточки
    function flipCard(index) {
        if (!canFlip) return;
        
        const cardElement = cardsContainer.children[index];
        if (cardElement.classList.contains('flipped')) return;
        
        canFlip = false;
        cardElement.classList.add('flipped');
        
        setTimeout(() => {
            const card = cards[index];
            score += card.points;
            scoreElement.textContent = score;
            canFlip = true;
        }, 500);
    }
    
    restartButton.addEventListener('click', initGame);
    
    // Начало игры
    initGame();
});