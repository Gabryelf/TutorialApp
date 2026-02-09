class Presentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = SLIDES_CONFIG.length;
        this.init();
    }

    init() {
        this.createSlides();
        this.setupEventListeners();
        this.updateSlide();
    }

    createSlides() {
        const container = document.getElementById('slidesContainer');
        
        SLIDES_CONFIG.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'slide';
            slideElement.id = `slide-${index + 1}`;
            slideElement.innerHTML = slide.content;
            container.appendChild(slideElement);
        });
    }

    setupEventListeners() {
        document.getElementById('prevBtn').addEventListener('click', () => this.previousSlide());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextSlide());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
                this.nextSlide();
            }
            if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                this.previousSlide();
            }
            if (e.key === 'Home') {
                this.goToSlide(1);
            }
            if (e.key === 'End') {
                this.goToSlide(this.totalSlides);
            }
        });

        // Touch gestures for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        }
    }

    updateSlide() {
        const progress = (this.currentSlide / this.totalSlides) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('slideCounter').textContent = `${this.currentSlide}/${this.totalSlides}`;
        
        // Update header information
        const currentSlideConfig = SLIDES_CONFIG[this.currentSlide - 1];
        document.getElementById('slideIcon').textContent = currentSlideConfig.icon;
        document.getElementById('slideTitle').textContent = currentSlideConfig.title;
        document.getElementById('slideSubtitle').textContent = currentSlideConfig.subtitle;
        
        // Hide all slides
        document.querySelectorAll('.slide').forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        const currentSlideElement = document.getElementById(`slide-${this.currentSlide}`);
        if (currentSlideElement) {
            currentSlideElement.classList.add('active');
        }

        // Update button states
        this.updateButtonStates();
    }

    updateButtonStates() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        prevBtn.disabled = this.currentSlide === 1;
        nextBtn.disabled = this.currentSlide === this.totalSlides;

        if (prevBtn.disabled) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }

        if (nextBtn.disabled) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.currentSlide++;
            this.updateSlide();
        }
    }

    previousSlide() {
        if (this.currentSlide > 1) {
            this.currentSlide--;
            this.updateSlide();
        }
    }

    goToSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
            this.currentSlide = slideNumber;
            this.updateSlide();
        }
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Presentation();
});

// Utility functions
function formatCode(code) {
    return code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function createEntityGrid(entities) {
    return `
        <div class="entities-grid">
            ${entities.map(entity => `
                <div class="entity">${entity}</div>
            `).join('')}
        </div>
    `;
}