// js/audio.js
class AudioManager {
    constructor() {
        this.sounds = {};
        this.music = null;
        this.isMusicEnabled = true;
        this.isSoundEnabled = true;
        this.musicVolume = 0.3;
        this.soundVolume = 0.7;
        
        this.initializeAudio();
    }

    initializeAudio() {
        // Предзагрузка звуков
        this.sounds = {
            correct: document.getElementById('correct-sound'),
            wrong: document.getElementById('wrong-sound'),
            complete: document.getElementById('complete-sound'),
            click: this.createSound('audio/sounds/click.mp3'),
            hover: this.createSound('audio/sounds/hover.mp3')
        };

        this.music = document.getElementById('bg-music');
        
        // Установка громкости
        this.setMusicVolume(this.musicVolume);
        this.setSoundVolume(this.soundVolume);
        
        // Загрузка настроек из localStorage
        this.loadSettings();
    }

    createSound(src) {
        const audio = new Audio();
        audio.src = src;
        audio.preload = 'auto';
        return audio;
    }

    playSound(soundName) {
        if (!this.isSoundEnabled) return;
        
        const sound = this.sounds[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Audio play failed:', e));
        }
    }

    playMusic() {
        if (!this.isMusicEnabled || !this.music) return;
        
        this.music.play().catch(e => {
            console.log('Music play failed, will retry after user interaction');
            // Повторная попытка после пользовательского взаимодействия
            document.addEventListener('click', () => {
                this.music.play().catch(e => console.log('Music play retry failed'));
            }, { once: true });
        });
    }

    stopMusic() {
        if (this.music) {
            this.music.pause();
            this.music.currentTime = 0;
        }
    }

    pauseMusic() {
        if (this.music) {
            this.music.pause();
        }
    }

    resumeMusic() {
        if (this.isMusicEnabled && this.music) {
            this.music.play().catch(e => console.log('Music resume failed'));
        }
    }

    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.music) {
            this.music.volume = this.musicVolume;
        }
    }

    setSoundVolume(volume) {
        this.soundVolume = Math.max(0, Math.min(1, volume));
        Object.values(this.sounds).forEach(sound => {
            if (sound) sound.volume = this.soundVolume;
        });
    }

    toggleMusic() {
        this.isMusicEnabled = !this.isMusicEnabled;
        if (this.isMusicEnabled) {
            this.playMusic();
        } else {
            this.pauseMusic();
        }
        this.saveSettings();
    }

    toggleSound() {
        this.isSoundEnabled = !this.isSoundEnabled;
        this.saveSettings();
    }

    loadSettings() {
        const settings = localStorage.getItem('audio_settings');
        if (settings) {
            const { musicEnabled, soundEnabled, musicVol, soundVol } = JSON.parse(settings);
            this.isMusicEnabled = musicEnabled !== undefined ? musicEnabled : true;
            this.isSoundEnabled = soundEnabled !== undefined ? soundEnabled : true;
            this.musicVolume = musicVol || 0.3;
            this.soundVolume = soundVol || 0.7;
            
            this.setMusicVolume(this.musicVolume);
            this.setSoundVolume(this.soundVolume);
        }
    }

    saveSettings() {
        const settings = {
            musicEnabled: this.isMusicEnabled,
            soundEnabled: this.isSoundEnabled,
            musicVol: this.musicVolume,
            soundVol: this.soundVolume
        };
        localStorage.setItem('audio_settings', JSON.stringify(settings));
    }

    // Создание элементов управления аудио
    createAudioControls() {
        const controls = document.createElement('div');
        controls.className = 'audio-controls';
        controls.innerHTML = `
            <button class="audio-btn music-btn ${this.isMusicEnabled ? 'enabled' : ''}">
                🎵 ${this.isMusicEnabled ? 'Музыка Вкл' : 'Музыка Выкл'}
            </button>
            <button class="audio-btn sound-btn ${this.isSoundEnabled ? 'enabled' : ''}">
                🔊 ${this.isSoundEnabled ? 'Звук Вкл' : 'Звук Выкл'}
            </button>
        `;

        // Обработчики событий
        controls.querySelector('.music-btn').addEventListener('click', () => {
            this.toggleMusic();
            controls.querySelector('.music-btn').classList.toggle('enabled');
            controls.querySelector('.music-btn').textContent = 
                this.isMusicEnabled ? '🎵 Музыка Вкл' : '🎵 Музыка Выкл';
        });

        controls.querySelector('.sound-btn').addEventListener('click', () => {
            this.toggleSound();
            controls.querySelector('.sound-btn').classList.toggle('enabled');
            controls.querySelector('.sound-btn').textContent = 
                this.isSoundEnabled ? '🔊 Звук Вкл' : '🔊 Звук Выкл';
        });

        return controls;
    }
}

// Глобальный экземпляр аудио менеджера
window.audioManager = new AudioManager();