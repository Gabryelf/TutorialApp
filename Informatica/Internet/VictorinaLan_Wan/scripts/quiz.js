class Quiz {
    constructor() {
        this.questions = [
            {
                question: "Какое устройство является 'начальником' в локальной сети?",
                options: [
                    "Коммутатор",
                    "Маршрутизатор", 
                    "Точка доступа",
                    "Сетевой кабель"
                ],
                correct: 1,
                explanation: "Маршрутизатор управляет сетью, раздает IP-адреса и соединяет LAN с Интернетом."
            },
            {
                question: "Какой протокол преобразует доменные имена в IP-адреса?",
                options: [
                    "HTTP",
                    "TCP",
                    "DNS",
                    "FTP"
                ],
                correct: 2,
                explanation: "DNS (Domain Name System) работает как телефонная книга Интернета."
            },
            {
                question: "Какой тип адреса является физическим и уникальным для каждого устройства?",
                options: [
                    "IP-адрес",
                    "MAC-адрес",
                    "DNS-адрес",
                    "URL-адрес"
                ],
                correct: 1,
                explanation: "MAC-адрес прошивается производителем и не изменяется."
            },
            {
                question: "Что означает HTTPS в сравнении с HTTP?",
                options: [
                    "Более высокая скорость",
                    "Зашифрованное соединение",
                    "Лучшее сжатие данных", 
                    "Упрощенный протокол"
                ],
                correct: 1,
                explanation: "HTTPS обеспечивает безопасность через шифрование TLS/SSL."
            },
            {
                question: "Какая модель облачных услуг предоставляет готовые приложения?",
                options: [
                    "IaaS",
                    "PaaS", 
                    "SaaS",
                    "CaaS"
                ],
                correct: 2,
                explanation: "SaaS (Software as a Service) - готовые приложения типа Google Workspace."
            },
            {
                question: "Какой протокол используется для отправки электронной почты?",
                options: [
                    "POP3",
                    "IMAP", 
                    "SMTP",
                    "FTP"
                ],
                correct: 2,
                explanation: "SMTP отвечает за отправку писем, в то время как POP3/IMAP - за получение."
            },
            {
                question: "Что такое NAS в сетевом хранении данных?",
                options: [
                    "Сервер баз данных",
                    "Сетевой attached storage",
                    "Облачное хранилище",
                    "Резервная копия"
                ],
                correct: 1,
                explanation: "NAS - сетевое устройство хранения, доступное всем в локальной сети."
            },
            {
                question: "Какой командой можно проверить связь с сайтом?",
                options: [
                    "ipconfig",
                    "nslookup", 
                    "ping",
                    "tracert"
                ],
                correct: 2,
                explanation: "ping отправляет запросы к указанному адресу и показывает время ответа."
            },
            {
                question: "Какой стандарт обеспечивает беспроводное подключение?",
                options: [
                    "Ethernet",
                    "Wi-Fi", 
                    "Bluetooth",
                    "USB"
                ],
                correct: 1,
                explanation: "Wi-Fi (IEEE 802.11) - основной стандарт беспроводных локальных сетей."
            },
            {
                question: "Что обеспечивает безопасность в публичных сетях?",
                options: [
                    "DHCP",
                    "DNS", 
                    "VPN",
                    "NAT"
                ],
                correct: 2,
                explanation: "VPN создает зашифрованный туннель для безопасной передачи данных."
            }
        ];

        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        this.startTime = null;
        this.timer = null;

        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.startScreen = document.querySelector('.start-screen');
        this.quizScreen = document.querySelector('.quiz-screen');
        this.resultsScreen = document.querySelector('.results-screen');
        this.reviewScreen = document.querySelector('.review-screen');

        this.startBtn = document.getElementById('startBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.retryBtn = document.getElementById('retryBtn');
        this.reviewBtn = document.getElementById('reviewBtn');
        this.closeReview = document.getElementById('closeReview');

        this.questionText = document.getElementById('questionText');
        this.optionsContainer = document.getElementById('optionsContainer');
        this.currentQuestionEl = document.getElementById('currentQuestion');
        this.questionNum = document.getElementById('questionNum');
        this.progressFill = document.getElementById('progressFill');
        this.scoreEl = document.getElementById('score');

        // Results elements
        this.scorePercent = document.getElementById('scorePercent');
        this.correctAnswers = document.getElementById('correctAnswers');
        this.wrongAnswers = document.getElementById('wrongAnswers');
        this.totalTime = document.getElementById('totalTime');
        this.resultMessage = document.getElementById('resultMessage');
        this.resultIcon = document.getElementById('resultIcon');
        this.reviewContent = document.getElementById('reviewContent');
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.startQuiz());
        this.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.retryBtn.addEventListener('click', () => this.restartQuiz());
        this.reviewBtn.addEventListener('click', () => this.showReview());
        this.closeReview.addEventListener('click', () => this.hideReview());
    }

    startQuiz() {
        this.startScreen.classList.remove('active');
        this.quizScreen.classList.add('active');
        this.startTime = Date.now();
        
        this.showQuestion(0);
        this.startTimer();
    }

    startTimer() {
        this.timer = setInterval(() => {
            // Timer logic if needed
        }, 1000);
    }

    showQuestion(index) {
        this.currentQuestion = index;
        const question = this.questions[index];

        // Update progress
        this.currentQuestionEl.textContent = index + 1;
        this.questionNum.textContent = index + 1;
        this.progressFill.style.width = `${((index + 1) / this.questions.length) * 100}%`;

        // Update question text
        this.questionText.textContent = question.question;

        // Clear and create options
        this.optionsContainer.innerHTML = '';
        question.options.forEach((option, optionIndex) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.innerHTML = `
                <div class="option-icon">${String.fromCharCode(65 + optionIndex)}</div>
                <span>${option}</span>
            `;

            optionElement.addEventListener('click', () => this.selectAnswer(optionIndex));
            this.optionsContainer.appendChild(optionElement);
        });

        // Update navigation buttons
        this.prevBtn.disabled = index === 0;
        this.nextBtn.textContent = index === this.questions.length - 1 ? 'Завершить' : 'Далее';
    }

    selectAnswer(selectedIndex) {
        const question = this.questions[this.currentQuestion];
        const options = this.optionsContainer.querySelectorAll('.option');
        
        // Disable all options
        options.forEach(option => {
            option.classList.add('disabled');
            option.style.pointerEvents = 'none';
        });

        // Mark selected answer
        const selectedOption = options[selectedIndex];
        selectedOption.classList.add('selected');

        // Check if answer is correct
        const isCorrect = selectedIndex === question.correct;
        
        if (isCorrect) {
            selectedOption.classList.add('correct');
            this.score++;
            this.scoreEl.textContent = this.score;
        } else {
            selectedOption.classList.add('incorrect');
            // Also show correct answer
            options[question.correct].classList.add('correct');
        }

        // Store user answer
        this.userAnswers[this.currentQuestion] = {
            selected: selectedIndex,
            correct: question.correct,
            isCorrect: isCorrect
        };

        // Enable next button
        this.nextBtn.disabled = false;
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.showQuestion(this.currentQuestion - 1);
        }
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.showQuestion(this.currentQuestion + 1);
            this.nextBtn.disabled = true;
        } else {
            this.finishQuiz();
        }
    }

    finishQuiz() {
        clearInterval(this.timer);
        
        const totalTime = Math.floor((Date.now() - this.startTime) / 1000);
        const correctCount = this.score;
        const wrongCount = this.questions.length - correctCount;
        const percentage = Math.round((correctCount / this.questions.length) * 100);

        // Update results
        this.scorePercent.textContent = `${percentage}%`;
        this.correctAnswers.textContent = correctCount;
        this.wrongAnswers.textContent = wrongCount;
        this.totalTime.textContent = `${totalTime}с`;

        // Update progress circle
        const circleProgress = document.querySelector('.circle-progress');
        circleProgress.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;

        // Set result message and icon
        this.setResultMessage(percentage);

        // Show results screen
        this.quizScreen.classList.remove('active');
        this.resultsScreen.classList.add('active');
    }

    setResultMessage(percentage) {
        let message = '';
        let icon = '';

        if (percentage >= 90) {
            message = 'Великолепно! Вы настоящий эксперт по сетям! 🎯';
            icon = 'fas fa-crown';
        } else if (percentage >= 70) {
            message = 'Отлично! Хорошие знания компьютерных сетей! 👍';
            icon = 'fas fa-star';
        } else if (percentage >= 50) {
            message = 'Хорошо! Есть что повторить, но основы знаете! 📚';
            icon = 'fas fa-graduation-cap';
        } else {
            message = 'Есть над чем поработать! Повторите материалы! 💪';
            icon = 'fas fa-redo';
        }

        this.resultMessage.textContent = message;
        this.resultIcon.innerHTML = `<i class="${icon}"></i>`;
    }

    showReview() {
        this.reviewContent.innerHTML = '';
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const reviewItem = document.createElement('div');
            reviewItem.className = `review-item ${userAnswer.isCorrect ? 'correct' : 'incorrect'}`;
            
            reviewItem.innerHTML = `
                <div class="review-question">${index + 1}. ${question.question}</div>
                <div class="review-answer">Ваш ответ: ${question.options[userAnswer.selected]}</div>
                <div class="review-answer review-correct">Правильный ответ: ${question.options[question.correct]}</div>
                <div class="review-explanation">${question.explanation}</div>
            `;
            
            this.reviewContent.appendChild(reviewItem);
        });

        this.resultsScreen.classList.remove('active');
        this.reviewScreen.classList.add('active');
    }

    hideReview() {
        this.reviewScreen.classList.remove('active');
        this.resultsScreen.classList.add('active');
    }

    restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        
        this.scoreEl.textContent = '0';
        this.resultsScreen.classList.remove('active');
        this.startScreen.classList.add('active');
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Quiz();
});

// Add some additional animations
document.addEventListener('DOMContentLoaded', () => {
    // Add confetti effect for high scores
    window.createConfetti = function() {
        const confettiCount = 200;
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '1000';
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.borderRadius = '50%';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            confettiContainer.appendChild(confetti);
        }

        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    };

    function getRandomColor() {
        const colors = ['#667eea', '#764ba2', '#4CAF50', '#f44336', '#ff9800', '#2196F3'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Add CSS for confetti animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});