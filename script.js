// =========================================================================
// 🚀 المحرك والتأثيرات التفاعلية للموقع | MAIN SCRIPT & ANIMATIONS
// =========================================================================

// تطبيق الإعدادات تلقائياً من ملف config.js
function applyConfig() {
    if (typeof CONFIG === 'undefined') return;

    if (CONFIG.partnerName) {
        document.querySelectorAll('.partner-name').forEach(el => el.textContent = CONFIG.partnerName);
        document.title = `💕 ${CONFIG.partnerName} 💕`;
    }
    if (CONFIG.passwordHint) {
        const hintEl = document.getElementById('password-hint-text');
        if (hintEl) hintEl.textContent = CONFIG.passwordHint;
    }
    if (CONFIG.startDateLabel) {
        const startLabel = document.getElementById('counter-start-label');
        if (startLabel) startLabel.textContent = CONFIG.startDateLabel;
    }
    if (CONFIG.birthdayLabel) {
        const bdayEl = document.getElementById('birthday-display-date');
        if (bdayEl) bdayEl.textContent = CONFIG.birthdayLabel;
    }
    if (CONFIG.songTitle) {
        const songEl = document.getElementById('song-title-display');
        if (songEl) songEl.textContent = CONFIG.songTitle;
    }
    if (CONFIG.youtubeVideoId) {
        const ytIframe = document.getElementById('youtube-iframe');
        if (ytIframe) {
            ytIframe.src = `https://www.youtube.com/embed/${CONFIG.youtubeVideoId}?rel=0&modestbranding=1&color=white`;
        }
    }
    if (CONFIG.yourName) {
        const sigEl = document.getElementById('sender-signature');
        if (sigEl) sigEl.textContent = CONFIG.yourName;
    }
}

// تطبيق الإعدادات فور تحميل الـ DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyConfig);
} else {
    applyConfig();
}

// ===== PASSWORD CHECK =====
const passwordInput = document.getElementById('password-input');
if (passwordInput) {
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkPassword();
    });
}

function checkPassword() {
    const input = document.getElementById('password-input').value.trim();
    const validPasswords = (typeof CONFIG !== 'undefined' && CONFIG.passwords) ? CONFIG.passwords : ["1234"];

    if (validPasswords.includes(input)) {
        document.getElementById('password-screen').classList.add('hide');
        setTimeout(() => {
            document.getElementById('password-screen').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
            setTimeout(() => {
                document.getElementById('main-content').classList.add('show');
                startHearts();
                startParticles();
                startCounter();
                calculateAge();
                launchCelebration();
            }, 50);
        }, 1000);
    } else {
        const err = document.getElementById('pw-error');
        err.classList.add('show');
        document.getElementById('password-input').style.borderColor = '#ff6b6b';
        setTimeout(() => {
            err.classList.remove('show');
            document.getElementById('password-input').style.borderColor = 'rgba(231, 76, 111, 0.4)';
        }, 3000);
    }
}

// ===== PASSWORD SCREEN HEARTS =====
(function() {
    const canvas = document.getElementById('pw-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const hearts = [];

    for (let i = 0; i < 25; i++) {
        hearts.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 15 + 8,
            speed: Math.random() * 0.5 + 0.2,
            opacity: Math.random() * 0.3 + 0.05,
            wobble: Math.random() * Math.PI * 2
        });
    }

    function drawHeart(x, y, size, opacity) {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = '#e74c6f';
        ctx.beginPath();
        ctx.moveTo(x, y + size / 4);
        ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
        ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size * 0.7, x, y + size);
        ctx.bezierCurveTo(x, y + size * 0.7, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
        ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
        ctx.fill();
        ctx.restore();
    }

    function animatePw() {
        const pwScreen = document.getElementById('password-screen');
        if (!pwScreen || pwScreen.style.display === 'none') return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(h => {
            h.y -= h.speed;
            h.x += Math.sin(h.wobble) * 0.3;
            h.wobble += 0.02;
            if (h.y < -20) { h.y = canvas.height + 20; h.x = Math.random() * canvas.width; }
            drawHeart(h.x, h.y, h.size, h.opacity);
        });
        requestAnimationFrame(animatePw);
    }
    animatePw();

    window.addEventListener('resize', () => { 
        canvas.width = window.innerWidth; 
        canvas.height = window.innerHeight; 
    });
})();

// ===== FALLING HEARTS CANVAS =====
function startHearts() {
    const canvas = document.getElementById('hearts-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = [];
    const emojis = ['❤️', '💕', '💖', '💗', '💝', '🌹', '✨', '💫', '🦋'];

    for (let i = 0; i < 30; i++) {
        hearts.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: Math.random() * 1 + 0.3,
            size: Math.random() * 18 + 10,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.02 + 0.005
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(h => {
            ctx.font = h.size + 'px serif';
            ctx.fillText(h.emoji, h.x, h.y);
            h.y += h.speed;
            h.x += Math.sin(h.wobble) * 0.5;
            h.wobble += h.wobbleSpeed;
            if (h.y > canvas.height + 30) {
                h.y = -30;
                h.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== PARTICLES =====
function startParticles() {
    setInterval(() => {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.textContent = ['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)];
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = '-20px';
        p.style.fontSize = (Math.random() * 15 + 8) + 'px';
        p.style.animationDuration = (Math.random() * 5 + 4) + 's';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 9000);
    }, 800);
}

// ===== COUNTER =====
function startCounter() {
    let startDate;
    if (typeof CONFIG !== 'undefined' && CONFIG.relationshipStartDate) {
        startDate = new Date(
            CONFIG.relationshipStartDate.year,
            CONFIG.relationshipStartDate.month,
            CONFIG.relationshipStartDate.day
        );
    } else {
        startDate = new Date(2024, 0, 1);
    }

    function update() {
        const now = new Date();
        const diff = now - startDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const d = document.getElementById('counter-days');
        const h = document.getElementById('counter-hours');
        const m = document.getElementById('counter-minutes');
        const s = document.getElementById('counter-seconds');

        if (d) d.textContent = days;
        if (h) h.textContent = hours;
        if (m) m.textContent = minutes;
        if (s) s.textContent = seconds;
    }
    update();
    setInterval(update, 1000);
}

// ===== AGE CALCULATOR =====
function calculateAge() {
    let birthday;
    if (typeof CONFIG !== 'undefined' && CONFIG.birthDate) {
        birthday = new Date(
            CONFIG.birthDate.year,
            CONFIG.birthDate.month,
            CONFIG.birthDate.day
        );
    } else {
        birthday = new Date(2004, 0, 1);
    }

    const now = new Date();
    let age = now.getFullYear() - birthday.getFullYear();
    const m = now.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthday.getDate())) age--;
    
    const ageEl = document.getElementById('age-display');
    if (ageEl) ageEl.textContent = age + ' سنة';
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in, .timeline-item').forEach(el => observer.observe(el));

// ===== SPARKLE CURSOR =====
let lastSparkle = 0;
document.addEventListener('mousemove', (e) => {
    if (Date.now() - lastSparkle < 100) return;
    lastSparkle = Date.now();
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.textContent = ['✨', '💕', '⭐'][Math.floor(Math.random() * 3)];
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
});

// ===== SHOOTING STARS =====
setInterval(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent && mainContent.classList.contains('show')) {
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        star.style.top = Math.random() * 50 + '%';
        star.style.right = '-100px';
        star.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 2000);
    }
}, 4000);

// ===== CELEBRATION ON ENTER =====
function launchCelebration() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.style.position = 'fixed';
            heart.style.zIndex = '9999';
            heart.style.pointerEvents = 'none';
            heart.style.fontSize = (Math.random() * 30 + 15) + 'px';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '110vh';
            heart.textContent = ['❤️', '💕', '💖', '🌹', '✨', '💗', '🎉', '🦋'][Math.floor(Math.random() * 8)];
            heart.style.transition = 'all ' + (Math.random() * 2 + 1.5) + 's ease-out';
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.style.top = (Math.random() * -20 - 10) + 'vh';
                heart.style.opacity = '0';
                heart.style.transform = `translateX(${Math.random() * 200 - 100}px)`;
            }, 50);
            setTimeout(() => heart.remove(), 4000);
        }, i * 60);
    }
}

