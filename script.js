// Игровой движок
class PupeLupaeGame {
    constructor() {
        this.currentScreen = 'welcome';
        this.gameActive = false;
        this.gameDuration = 10000; // 10 секунд
        this.timer = null;
        this.techTimer = null;
        this.money = 0;
        this.correctMoves = 0;
        this.wrongMoves = 0;
        this.premiumCount = 0;
        this.lastTapTime = 0;
        this.comboWindow = 300; // окно для комбо в миллисекундах
        
        // Списки технологий
        this.frontendTechs = [
            'React', 'Vue.js', 'Angular', 
            'CSS', 'HTML', 'JavaScript', 
            'TypeScript', 'SASS', 'JSX',
            'Bootstrap', 'Tailwind', 'Webpack'
        ];
        
        this.backendTechs = [
            'Node.js', 'Django', 'Express.js', 
            'Python', 'PostgreSQL', 'MongoDB', 
            'Ruby on Rails', 'ASP.NET', 'MySQL',
            'Redis', 'GraphQL', 'Docker'
        ];
        
        // Эмоциональные реакции персонажей
        this.pupeReactions = [
            "Ура! Ещё один CSS-мастер! 💅",
            "React forever! ⚛️",
            "Начинаем говорить на TypeScript! 📝",
            "Главное тени красивые! ✨",
            "Flexbox — моя сила! 💪"
        ];
        
        this.lupaeReactions = [
            "Базы данных — моя стихия! 🗄️",
            "Серверы должны быть быстрыми! ⚡",
            "Python — это элегантность! 🐍",
            "API как часы! ⏰",
            "Под капотом магия! 🪄"
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupThemeToggle();
        this.showWelcomeScreen();
        
        // Анимация при первом запуске
        setTimeout(() => {
            document.querySelector('.game-title').classList.add('animate-bounce-in');
            document.querySelector('.character-preview').style.opacity = '0';
            setTimeout(() => {
                document.querySelector('.character-preview').style.opacity = '1';
            }, 200);
        }, 100);
    }
    
    setupEventListeners() {
        // Кнопка начала игры
        document.getElementById('start-game-btn').addEventListener('click', () => {
            this.startGame();
        });
        
        // Игровые кнопки
        document.getElementById('pupe-btn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleTap('pupe');
        });
        
        document.getElementById('pupe-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleTap('pupe');
        });
        
        document.getElementById('lupae-btn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleTap('lupae');
        });
        
        document.getElementById('lupae-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleTap('lupae');
        });
        
        // Кнопка снова играть
        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.showWelcomeScreen();
        });
        
        // Улучшенное управление для мобильных устройств
        this.setupMobileOptimization();
    }
    
    setupMobileOptimization() {
        // Предотвращение зума при двойном тапе
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // Вибрация при нажатии (если поддерживается)
        this.vibrateSupported = 'vibrate' in navigator;
        
        // Улучшенная чувствительность касаний
        document.addEventListener('touchstart', (e) => {
            if (this.gameActive) {
                e.target.classList.add('touching');
            }
        }, true);
        
        document.addEventListener('touchend', (e) => {
            e.target.classList.remove('touching');
        }, true);
    }
    
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        // Загружаем сохраненную тему или устанавливаем дефолтную
        const savedTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            localStorage.setItem('theme', newTheme);
            
            // Добавляем винтажный эффект перехода
            document.body.style.background = newTheme === 'dark' ? 'linear-gradient(180deg, #000 0%, #1a1a2e 100%)' : 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)';
            
            setTimeout(() => {
                document.body.style.background = '';
            }, 500);
        });
    }
    
    showWelcomeScreen() {
        this.hideAllScreens();
        this.currentScreen = 'welcome';
        
        // Сброс игры
        this.gameActive = false;
        this.money = 0;
        this.correctMoves = 0;
        this.wrongMoves = 0;
        this.premiumCount = 0;
        
        document.getElementById('welcome-screen').classList.remove('hidden');
        
        // Добавляем случайные анимации персонажей
        this.addRandomCharacterAnimations();
    }
    
    showGameScreen() {
        this.hideAllScreens();
        this.currentScreen = 'game';
        document.getElementById('game-screen').classList.remove('hidden');
        
        // Начинаем показ технологий
        this.startTechCycle();
        this.startGameTimer();
        
        // Анимация появления кнопок
        setTimeout(() => {
            document.querySelector('.game-buttons').style.transform = 'translateY(100px)';
            document.querySelector('.game-buttons').style.opacity = '0';
            setTimeout(() => {
                document.querySelector('.game-buttons').style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                document.querySelector('.game-buttons').style.transform = 'translateY(0)';
                document.querySelector('.game-buttons').style.opacity = '1';
            }, 200);
        }, 100);
    }
    
    showResultScreen() {
        this.hideAllScreens();
        this.currentScreen = 'result';
        
        document.getElementById('result-screen').classList.remove('hidden');
        
        // Показываем результаты
        document.getElementById('final-money').textContent = this.money;
        document.getElementById('correct-moves').textContent = this.correctMoves;
        document.getElementById('wrong-moves').textContent = this.wrongMoves;
        document.getElementById('premium-count').textContent = this.premiumCount;
        
        // Определяем статус на основе результата
        let status = '';
        if (this.money >= 15) status = '🌟 Невероятно! Вы настоящий маг!';
        else if (this.money >= 10) status = '💯 Отличная реакция!';
        else if (this.money >= 5) status = '👍 Неплохо справляетесь!';
        else if (this.money >= 2) status = '🤔 Еще есть место для улучшения';
        else status = '😅 Бывает такое... Попробуйте еще раз!';
        
        document.getElementById('score-status').textContent = status;
        
        // Сохраняем лучшее достижение
        const bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
        if (this.money > bestScore) {
            localStorage.setItem('bestScore', this.money.toString());
            // Показываем новое достижение
            setTimeout(() => {
                this.showAchievement('🎉 Новый рекорд!', `Вы заработали ${this.money} денег!`);
            }, 1000);
        }
    }
    
    hideAllScreens() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
        });
    }
    
    startGame() {
        this.gameActive = true;
        this.showGameScreen();
        
        // Эффект начала игры
        document.body.style.backgroundColor = '#1a1a2e';
        setTimeout(() => {
            document.body.style.backgroundColor = '';
        }, 500);
        
        // Показываем инструкцию
        setTimeout(() => {
            document.getElementById('instruction-text').textContent = 'Готовы? Пупа против Лупы начинается! ⚡';
        }, 500);
        
        setTimeout(() => {
            document.getElementById('instruction-text').textContent = 'Тапайте кнопки в соответствии с технологиями!';
        }, 2000);
    }
    
    startTechCycle() {
        let techInterval = () => {
            if (!this.gameActive) return;
            
            const techType = Math.random();
            let tech, techCategory;
            
            if (techType < 0.6) {
                // Фронтенд технология (60% шанс)
                tech = this.getRandomTech('frontend');
                techCategory = 'frontend';
            } else if (techType < 0.95) {
                // Бэкенд технология (35% шанс)
                tech = this.getRandomTech('backend');
                techCategory = 'backend';
            } else {
                // Премия (5% шанс)
                tech = 'Премия';
                techCategory = 'premium';
            }
            
            this.displayTech(tech, techCategory);
            
            // Случайный интервал между технологиями (650ms - 1200ms)
            const nextInterval = 650 + Math.random() * 550;
            setTimeout(techInterval, nextInterval);
        };
        
        // Первая технология появляется через небольшую задержку
        setTimeout(techInterval, 800);
    }
    
    getRandomTech(type) {
        const techs = type === 'frontend' ? this.frontendTechs : this.backendTechs;
        return techs[Math.floor(Math.random() * techs.length)];
    }
    
    displayTech(tech, category) {
        const badge = document.getElementById('technology-badge');
        const techElement = document.getElementById('current-tech');
        
        // Обновляем текст
        techElement.textContent = tech;
        
        // Обновляем стиль значка
        badge.className = `technology-badge ${category}`;
        
        // Добавляем анимацию появления
        techElement.style.animation = 'none';
        setTimeout(() => {
            techElement.style.animation = 'bounceIn 0.4s ease-out';
        }, 10);
        
        // Управляем подсветкой значка
        if (category === 'premium') {
            badge.classList.add('premium');
            document.body.style.backgroundColor = '#2d1b69';
            setTimeout(() => {
                document.body.style.backgroundColor = '';
            }, 300);
        } else {
            badge.classList.remove('premium');
        }
        
        // Обновляем инструкцию
        if (category === 'premium') {
            document.getElementById('instruction-text').textContent = '⚡ ПРЕМИЯ! Нажимайте ОБА одновременно!';
            document.getElementById('instruction-text').style.color = 'var(--warning-color)';
            document.getElementById('instruction-text').style.animation = 'pulse 0.5s ease-in-out infinite';
        } else {
            const target = category === 'frontend' ? 'Пупу' : 'Лупу';
            document.getElementById('instruction-text').textContent = `Тапните "За ${target}"!`;
            document.getElementById('instruction-text').style.color = 'var(--text-color)';
            document.getElementById('instruction-text').style.animation = 'none';
        }
        
        // Сохраняем текущую технологию для проверки
        this.currentTech = tech;
        this.currentTechCategory = category;
    }
    
    startGameTimer() {
        let timeLeft = this.gameDuration;
        const timerElement = document.getElementById('timer');
        
        const updateTimer = () => {
            if (!this.gameActive) return;
            
            const seconds = Math.ceil(timeLeft / 1000);
            timerElement.textContent = seconds;
            
            // Добавляем тревожные эффекты при малом времени
            if (timeLeft <= 3000) {
                timerElement.parentElement.classList.add('warning');
                if (timeLeft <= 1000) {
                    document.body.style.backgroundColor = '#ef4444';
                    setTimeout(() => {
                        document.body.style.backgroundColor = '';
                    }, 200);
                }
            }
            
            if (timeLeft <= 0) {
                this.endGame();
                return;
            }
            
            timeLeft -= 100;
        };
        
        // Обновляем таймер каждые 100мс для плавности
        const timerInterval = setInterval(() => {
            updateTimer();
            if (!this.gameActive) {
                clearInterval(timerInterval);
            }
        }, 100);
    }
    
    handleTap(pressedBy) {
        if (!this.gameActive || !this.currentTech) return;
        
        const now = Date.now();
        const tapTime = now - this.lastTapTime;
        
        // Проверяем правильность нажатия
        if (this.currentTechCategory === 'premium') {
            // Проверка на одновременность
            if (tapTime <= this.comboWindow) {
                this.correctMove(30, 'premium'); // Больше очков за эксклюзивность
            } else {
                this.wrongMove();
            }
        } else {
            // Обычные технологии
            const expected = this.currentTechCategory === 'frontend' ? 'pupe' : 'lupae';
            if (pressedBy === expected) {
                this.correctMove(10);
            } else {
                this.wrongMove();
            }
        }
        
        this.lastTapTime = now;
        
        // Вибрация для лучшего отклика
        if (this.vibrateSupported) {
            navigator.vibrate(50);
        }
        
        // Добавляем визуальный эффект кнопки
        this.addButtonEffect(pressedBy);
    }
    
    correctMove(points, moveType = 'normal') {
        this.money += points;
        this.correctMoves++;
        
        if (moveType === 'premium') {
            this.premiumCount++;
        }
        
        this.updateMoneyDisplay();
        this.showFloatingText(`+${points}`, 'success');
        
        // Добавляем реакцию персонажа
        if (moveType === 'premium') {
            this.showCharacterReaction('premium');
        } else {
            const character = this.currentTechCategory === 'frontend' ? 'pupe' : 'lupae';
            this.showCharacterReaction(character);
        }
    }
    
    wrongMove() {
        this.wrongMoves++;
        this.money = Math.max(0, this.money - 2); // Штраф за неправильное нажатие
        
        this.updateMoneyDisplay();
        this.showFloatingText('-2', 'danger');
        
        // Показываем разочарование
        this.showCharacterReaction('disappointment');
    }
    
    updateMoneyDisplay() {
        document.getElementById('money').textContent = this.money;
        
        // Добавляем анимацию изменения денег
        const moneyElement = document.getElementById('money');
        moneyElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            moneyElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    addButtonEffect(buttonType) {
        const button = document.getElementById(`${buttonType}-btn`);
        button.style.transform = 'scale(0.95)';
        button.style.boxShadow = 'inset 0 0 20px rgba(255,255,255,0.3)';
        
        setTimeout(() => {
            button.style.transform = '';
            button.style.boxShadow = '';
        }, 150);
    }
    
    showFloatingText(text, type) {
        const color = type === 'success' ? 'var(--success-color)' : 'var(--danger-color)';
        const floatingText = document.createElement('div');
        floatingText.textContent = text;
        floatingText.style.cssText = \`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%%, -50%%);
            color: ${color};
            font-size: 2rem;
            font-weight: 900;
            pointer-events: none;
            z-index: 1000;
            animation: floatUp 1s ease-out forwards;
        \`;
        
        document.body.appendChild(floatingText);
        
        setTimeout(() => {
            floatingText.remove();
        }, 1000);
    }
    
    showCharacterReaction(character) {
        let reactions = [];
        
        switch(character) {
            case 'pupe':
                reactions = this.pupeReactions;
                break;
            case 'lupae':
                reactions = this.lupaeReactions;
                break;
            case 'disappointment':
                reactions = ['Ой... 😅', 'Не тот момент! 🤦‍♂️', 'Бывает... 🤷‍♀️', 'Попробуем еще! 🚀'];
                break;
            case 'premium':
                reactions = ['💰 БОЖАТСКАЯ ПРЕМИЯ!', '⭐ ЭКСТРА ВАЙБЫ!', '💎 РАЗБОГАСТЕЙ!', '🚀 К ОСИЛИ! 🔥'];
                break;
        }
        
        const reaction = reactions[Math.floor(Math.random() * reactions.length)];
        
        // Показываем реакцию на 2 секунды
        const instructionElement = document.getElementById('instruction-text');
        const originalText = instructionElement.textContent;
        const originalStyle = instructionElement.style.color;
        
        instructionElement.textContent = reaction;
        instructionElement.style.color = character === 'premium' ? 'var(--warning-color)' : 
                                      character === 'disappointment' ? 'var(--danger-color)' : 'var(--text-color)';
        
        setTimeout(() => {
            instructionElement.textContent = originalText;
            instructionElement.style.color = originalStyle;
        }, 2000);
    }
    
    addRandomCharacterAnimations() {
        const characters = document.querySelectorAll('.character');
        
        characters.forEach((char, index) => {
            setTimeout(() => {
                char.style.animation = 'bounceIn 0.6s ease-out';
            }, index * 200);
        });
    }
    
    showAchievement(title, description) {
        const achievement = document.createElement('div');
        achievement.style.cssText = \`
            position: fixed;
            top: 20px;
            left: 50%%;
            transform: translateX(-50%%);
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            color: #000;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: 700;
            z-index: 1001;
            animation: slideInDown 0.5s ease-out, slideOutUp 0.5s ease-in 3s forwards;
            box-shadow: 0 20px 25px -5px rgba(255, 215, 0, 0.4);
        \`;
        
        achievement.innerHTML = \`
            <div style="font-size: 1.2rem;">${title}</div>
            <div style="font-size: 0.9rem; opacity: 0.8;">${description}</div>
        \`;
        
        document.body.appendChild(achievement);
        
        setTimeout(() => {
            achievement.remove();
        }, 4000);
    }
    
    endGame() {
        this.gameActive = false;
        
        // Очищаем таймеры
        if (this.timer) clearInterval(this.timer);
        if (this.techTimer) clearInterval(this.techTimer);
        clearInterval(this.timerInterval);
        
        // Скрываем игровой экран
        setTimeout(() => {
            this.showResultScreen();
        }, 1000);
        
        // Финальная анимация
        document.body.style.backgroundColor = '#1a1a2e';
        setTimeout(() => {
            document.body.style.backgroundColor = '';
        }, 2000);
    }
}

// Инициализация игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const game = new PupeLupaeGame();
    
    // Добавляем глобальные стили для анимаций
    const style = document.createElement('style');
    style.textContent = \`
        @keyframes floatUp {
            0%% { opacity: 1; transform: translate(-50%%, -50%%) scale(1); }
            100%% { opacity: 0; transform: translate(-50%%, -150%%) scale(1.2); }
        }
        
        @keyframes slideInDown {
            from { transform: translateX(-50%%) translateY(-100%%); opacity: 0; }
            to { transform: translateX(-50%%) translateY(0); opacity: 1; }
        }
        
        @keyframes slideOutUp {
            from { transform: translateX(-50%%) translateY(0); opacity: 1; }
            to { transform: translateX(-50%%) translateY(-100%%); opacity: 0; }
        }
        
        .touching {
            transform: scale(0.95) !important;
            box-shadow: inset 0 4px 8px rgba(0,0,0,0.2) !important;
        }
    \`;
    document.head.appendChild(style);
});

// Даем более элегантные глобальные функции для улучшения работы игры
window.addEventListener('load', () => {
    // Аккуратно запускаем плавные анимации и переходы
    document.body.style.transition = 'background-color 0.3s ease';
});

// Используем более мобильный подход для касаний
if ('ontouchstart' in window) {
    document.body.classList.add('touch-supported');
}
