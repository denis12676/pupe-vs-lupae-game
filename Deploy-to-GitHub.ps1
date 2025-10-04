# 🚀 Деплой игры "Пупа VS Лупа" на GitHub Pages
# PowerShell скрипт для автоматического деплоя

Write-Host "🚀 Деплой игры 'Пупа VS Лупа' на GitHub Pages" -ForegroundColor Green
Write-Host "=" * 50 -ForegroundColor Gray
Write-Host ""

# Проверяем что мы в правильной папке
if (!(Test-Path "index.html")) {
    Write-Host "❌ Ошибка: файл index.html не найден!" -ForegroundColor Red
    Write-Host "Убедитесь что вы находитесь в папке проекта" -ForegroundColor Yellow
    exit 1
}

Write-Host "📁 Файлы проекта:" -ForegroundColor Cyan
Get-ChildItem -Name | ForEach-Object { Write-Host "  ✅ $_" -ForegroundColor Green }
Write-Host ""

# Показываем статус git
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "⚠️ Есть незафиксированные изменения:" -ForegroundColor Yellow
    Write-Host $gitStatus -ForegroundColor Yellow
    Write-Host "Рекомендуется сделать commit перед деплоем" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "🔧 ИНСТРУКЦИИ ПО ДЕПЛОЮ:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣ Создайте новый репозиторий на GitHub:" -ForegroundColor White
Write-Host "   🔗 Идите на https://github.com/new" -ForegroundColor Blue
Write-Host "   📝 Repository name: pupe-vs-lupae-game" -ForegroundColor White
Write-Host "   📝 Description: Mobile casual tapping game" -ForegroundColor White
Write-Host "   📝 Видимость: Public (обязательно!)" -ForegroundColor White
Write-Host "   ❌ НЕ указывайте галочки на README/.gitignore/license" -ForegroundColor Red
Write-Host ""

Write-Host "2️⃣ Подключите к GitHub (замените USERNAME):" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/USERNAME/pupe-vs-lupae-game.git" -ForegroundColor Blue
Write-Host "   git branch -M main" -ForegroundColor Blue
Write-Host "   git push -u origin main" -ForegroundColor Blue
Write-Host ""

Write-Host "3️⃣ Настройте GitHub Pages:" -ForegroundColor White
Write-Host "   🔧 Repository Settings → Pages" -ForegroundColor Blue
Write-Host "   📍 Source: Deploy from a branch" -ForegroundColor Blue
Write-Host "   📍 Branch: main" -ForegroundColor Blue
Write-Host "   📍 Folder: / (root)" -ForegroundColor Blue
Write-Host ""

Write-Host "4️⃣ Ваша игра будет доступна по адресу:" -ForegroundColor Green
Write-Host "   🌐 https://USERNAME.github.io/pupe-vs-lupae-game" -ForegroundColor Cyan
Write-Host ""

# Интерактивный режим
$userChoice = Read-Host "Хотите выполнить автоматический деплой сейчас? (y/n)"
if ($userChoice -eq "y" -or $userChoice -eq "Y" -or $userChoice -eq "yes") {
    
    $githubUsername = Read-Host "Введите ваш GitHub username"
    if ($githubUsername) {
        Write-Host ""
        Write-Host "🚀 Выполняем деплой для пользователя: $githubUsername" -ForegroundColor Green
        
        # Проверяем подключение к интернету
        try {
            $testConnection = Test-NetConnection github.com -Port 443 -InformationLevel Quiet
            if ($testConnection) {
                Write-Host "✅ Подключение к GitHub установлено" -ForegroundColor Green
            } else {
                Write-Host "❌ Нет подключения к GitHub" -ForegroundColor Red
                exit 1
            }
        } catch {
            Write-Host "⚠️ Не удалось проверить подключение, продолжаем..." -ForegroundColor Yellow
        }
        
        # Выполняем команды деплоя
        Write-Host ""
        Write-Host "🔗 Подключаем к репозиторию..." -ForegroundColor Blue
        
        $remoteUrl = "https://github.com/$githubUsername/pupe-vs-lupae-game.git"
        
        try {
            git remote add origin $remoteUrl 2>$null
            Write-Host "✅ Удаленный репозиторий добавлен" -ForegroundColor Green
        } catch {
            Write-Host "⚠️ Репозиторий возможно уже добавлен" -ForegroundColor Yellow
        }
        
        try {
            git branch -M main
            Write-Host "✅ Ветка переименована в main" -ForegroundColor Green
        } catch {
            Write-Host "❌ Ошибка переименования ветки" -ForegroundColor Red
        }
        
        Write-Host ""
        Write-Host "📤 Отправляем файлы на GitHub..." -ForegroundColor Blue
        
        try {
            git push -u origin main
            Write-Host ""
            Write-Host "🎉 ДЕПЛОЙ УСПЕШЕН!" -ForegroundColor Green
            Write-Host "📱 Сейчас настройте GitHub Pages вручную:" -ForegroundColor Yellow
            Write-Host "   🔗 https://github.com/$githubUsername/pupe-vs-lupae-game/settings/pages" -ForegroundColor Cyan
            Write-Host "📱 Игра будет доступна по адресу:" -ForegroundColor Yellow
            Write-Host "   🌐 https://$githubUsername.github.io/pupe-vs-lupae-game" -ForegroundColor Cyan
        } catch {
            Write-Host "❌ Ошибка при отправке файлов!" -ForegroundColor Red
            Write-Host "Возможно нужно сначала авторизоваться в GitHub:" -ForegroundColor Yellow
            Write-Host "git config --global user.name 'ВашUsername'" -ForegroundColor Blue
            Write-Host "git config --global user.email 'ваш@email.com'" -ForegroundColor Blue
        }
        
    } else {
        Write-Host "❌ Username не указан" -ForegroundColor Red
    }
} else {
    Write-Host "📋 Инструкции сохранены в файл DEPLOY_INSTRUCTIONS.md" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎮 После деплоя не забудьте протестировать игру на мобильном устройстве!" -ForegroundColor Magenta
Write-Host ""
