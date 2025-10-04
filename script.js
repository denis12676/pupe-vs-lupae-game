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
        themeToggle.textContentElement = savedTheme === 'dark' ? '☀️' : '🌙';
        
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
        document.getElementById('premium-count').textContent = this.premiumCount);
        
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
