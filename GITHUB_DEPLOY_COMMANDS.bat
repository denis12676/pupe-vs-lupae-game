@echo off
echo 🚀 Dеплой игры "Пупа VS Лупа" на GitHub Pages
echo ========================================
echo.

echo 📋 ШАГИ:
echo 1. Сначала создайте репозиторий на GitHub.com
echo 2. Затем выполните команды ниже (замените YOUR_USERNAME!)
echo.

echo 🔧 КОМАНДЫ ДЛЯ ВЫПОЛНЕНИЯ:
echo.
echo # Подключение к GitHub репозиторию:
echo git remote add origin https://github.com/YOUR_USERNAME/pupe-vs-lupae-game.git
echo.
echo # Переименование ветки в main:
echo git branch -M main
echo.
echo # Отправка файлов на GitHub:
echo git push -u origin main
echo.
echo 🌐 ПОСЛЕ ЭТОГО в настройках репозитория настройте GitHub Pages:
echo Settings ^> Pages ^> Source: Deploy from branch ^> main ^> / ^> Save
echo.
echo 🎉 Игра будет доступна по адресу:
echo https://YOUR_USERNAME.github.io/pupe-vs-lupae-game
echo.
echo Нажмите любую клавишу для выхода...
pause >nul
