// js/progress.js
class ProgressSystem {
    constructor() {
        this.levels = {
            Junior: { minScore: 0, color: '#6b7280' },
            Middle: { minScore: 1000, color: '#8b5cf6' },
            Senior: { minScore: 2000, color: '#06d6a0' }
        };
        
        this.achievements = [
            { id: 'first_quiz', name: 'Первый шаг', description: 'Правильно ответить на первый вопрос', earned: false },
            { id: 'perfect_module', name: 'Идеальный модуль', description: 'Завершить модуль без ошибок', earned: false },
            { id: 'speed_runner', name: 'Спидраннер', description: 'Завершить игру менее чем за 30 минут', earned: false },
            { id: 'minigame_master', name: 'Мастер мини-игр', description: 'Победить во всех мини-играх', earned: false },
            { id: 'code_expert', name: 'Эксперт кода', description: 'Найти все баги в коде', earned: false }
        ];
        
        this.loadProgress();
    }

    loadProgress() {
        const saved = localStorage.getItem('idle_tower_defense_progress');
        if (saved) {
            const data = JSON.parse(saved);
            this.achievements = data.achievements || this.achievements;
        }
    }

    saveProgress() {
        const data = {
            achievements: this.achievements,
            timestamp: Date.now()
        };
        localStorage.setItem('idle_tower_defense_progress', JSON.stringify(data));
    }

    updateScore(points) {
        const currentScore = window.presentationApp?.score || 0;
        const newScore = currentScore + points;
        
        // Проверка достижений
        this.checkAchievements(points);
        
        // Проверка уровня
        this.checkLevelUp(newScore);
        
        return newScore;
    }

    checkAchievements(points) {
        const achievementsToCheck = [
            {
                id: 'first_quiz',
                check: () => points > 0 && !this.getAchievement('first_quiz').earned
            },
            {
                id: 'perfect_module',
                check: () => {
                    const moduleResults = window.presentationApp?.quizResults;
                    return moduleResults && moduleResults.correct === moduleResults.total && 
                           moduleResults.total > 0 && !this.getAchievement('perfect_module').earned;
                }
            }
        ];

        achievementsToCheck.forEach(({ id, check }) => {
            if (check()) {
                this.unlockAchievement(id);
            }
        });
    }

    checkLevelUp(score) {
        const currentLevel = this.getCurrentLevel(score);
        const previousLevel = window.presentationApp?.userLevel;
        
        if (currentLevel !== previousLevel) {
            window.presentationApp.userLevel = currentLevel;
            this.showLevelUpNotification(currentLevel);
        }
    }

    getCurrentLevel(score) {
        if (score >= this.levels.Senior.minScore) return 'Senior';
        if (score >= this.levels.Middle.minScore) return 'Middle';
        return 'Junior';
    }

    getAchievement(id) {
        return this.achievements.find(a => a.id === id) || null;
    }

    unlockAchievement(id) {
        const achievement = this.getAchievement(id);
        if (achievement && !achievement.earned) {
            achievement.earned = true;
            this.saveProgress();
            this.showAchievementNotification(achievement);
        }
    }

    showLevelUpNotification(level) {
        const notification = this.createNotification(
            `🎉 Новый уровень!`,
            `Поздравляем! Вы достигли уровня ${level}`,
            this.levels[level].color
        );
        
        this.showNotification(notification);
    }

    showAchievementNotification(achievement) {
        const notification = this.createNotification(
            `🏆 Достижение разблокировано!`,
            achievement.name,
            '#f59e0b'
        );
        
        this.showNotification(notification);
    }

    createNotification(title, message, color) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${color};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 1000;
            max-width: 300px;
            animation: slideInRight 0.5s ease;
        `;
        
        notification.innerHTML = `
            <div class="notification-title" style="font-weight: 600; margin-bottom: 0.5rem;">${title}</div>
            <div class="notification-message" style="font-size: 0.9rem;">${message}</div>
        `;
        
        return notification;
    }

    showNotification(notification) {
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }

    getProgressStats() {
        const totalAchievements = this.achievements.length;
        const earnedAchievements = this.achievements.filter(a => a.earned).length;
        const score = window.presentationApp?.score || 0;
        const level = this.getCurrentLevel(score);
        
        return {
            score,
            level,
            achievements: {
                earned: earnedAchievements,
                total: totalAchievements,
                percentage: Math.round((earnedAchievements / totalAchievements) * 100)
            }
        };
    }
}

// Глобальный экземпляр системы прогресса
window.progressSystem = new ProgressSystem();

ы