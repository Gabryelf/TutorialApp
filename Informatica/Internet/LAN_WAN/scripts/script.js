class Presentation {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progressBar = document.querySelector('.progress-bar');
        this.slideCounter = document.querySelector('.slide-counter');
        this.currentSlide = 0;
        
        this.init();
    }
    
    init() {
        this.showSlide(0);
        this.setupEventListeners();
        this.preloadImages();
    }
    
    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === ' ') this.nextSlide(); // Spacebar
        });
        
        // Swipe support for touch devices
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                this.nextSlide();
            }
            if (touchEndX > touchStartX + swipeThreshold) {
                this.previousSlide();
            }
        }
        
        // Bind the handleSwipe method to the class instance
        this.handleSwipe = handleSwipe.bind(this);
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });
        
        // Show current slide
        this.slides[index].classList.add('active');
        setTimeout(() => {
            this.slides[index].style.opacity = '1';
        }, 50);
        
        this.currentSlide = index;
        this.updateControls();
        this.updateProgress();
    }
    
    nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
            this.showSlide(this.currentSlide + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
        }
    }
    
    updateControls() {
        this.prevBtn.disabled = this.currentSlide === 0;
        this.nextBtn.disabled = this.currentSlide === this.slides.length - 1;
        
        this.slideCounter.textContent = `${this.currentSlide + 1} / ${this.slides.length}`;
    }
    
    updateProgress() {
        const progress = ((this.currentSlide + 1) / this.slides.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }
    
    preloadImages() {
        // Preload background images for smoother transitions
        this.slides.forEach(slide => {
            const bgImage = slide.getAttribute('data-bg');
            if (bgImage) {
                const img = new Image();
                img.src = bgImage;
            }
        });
    }
    
    // Method to jump to specific slide
    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.showSlide(index);
        }
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const presentation = new Presentation();
    
    // Make presentation globally available for debugging
    window.presentation = presentation;
});

// Add some visual effects
document.addEventListener('DOMContentLoaded', () => {
    // Add parallax effect to background images
    const slides = document.querySelectorAll('.slide');
    
    window.addEventListener('scroll', () => {
        // This is just a placeholder - actual implementation would depend on scroll behavior
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all content elements for animation
    document.querySelectorAll('.info-card, .network-type, .device').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});