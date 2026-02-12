// Envelope interaction
const envelope = document.getElementById('envelope');
const envelopeWrapper = document.querySelector('.envelope-wrapper');
let isOpen = false;

envelope.addEventListener('click', function(e) {
    // Toggle the open state
    isOpen = !isOpen;
    
    if (isOpen) {
        // OPEN the envelope
        envelope.classList.add('open');
        console.log('Opening envelope');
        
        // Create BIG HEART
        createBigHeart();
        
        // Create sparkle burst
        createSparkles(e);
        
        // Trigger confetti-like effect
        setTimeout(() => {
            createHeartBurst();
        }, 400);
    } else {
        // CLOSE the envelope
        envelope.classList.remove('open');
        console.log('Closing envelope');
    }
});

// Create sparkle effect on open
function createSparkles(event) {
    const rect = envelope.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Random position around the envelope
            const angle = (Math.PI * 2 * i) / 30;
            const distance = 50 + Math.random() * 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            sparkle.style.position = 'fixed';
            sparkle.style.left = centerX + x + 'px';
            sparkle.style.top = centerY + y + 'px';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1200);
        }, i * 20);
    }
}

// Create BIG HEART animation
function createBigHeart() {
    const rect = envelope.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const bigHeart = document.createElement('div');
    bigHeart.innerHTML = '❤️';
    bigHeart.style.position = 'fixed';
    bigHeart.style.left = centerX + 'px';
    bigHeart.style.top = centerY + 'px';
    bigHeart.style.fontSize = '100px';
    bigHeart.style.zIndex = '9999';
    bigHeart.style.pointerEvents = 'none';
    bigHeart.style.transform = 'translate(-50%, -50%) scale(0)';
    bigHeart.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    bigHeart.style.opacity = '0';
    bigHeart.style.textShadow = '0 0 30px rgba(255, 107, 157, 0.8)';
    
    document.body.appendChild(bigHeart);
    
    // Trigger animation
    setTimeout(() => {
        bigHeart.style.transform = 'translate(-50%, -50%) scale(1.5)';
        bigHeart.style.opacity = '1';
    }, 10);
    
    // Fade out and float up
    setTimeout(() => {
        bigHeart.style.transform = 'translate(-50%, -150%) scale(2) rotate(15deg)';
        bigHeart.style.opacity = '0';
    }, 600);
    
    // Remove element
    setTimeout(() => {
        bigHeart.remove();
    }, 1500);
}

// Create heart burst animation
function createHeartBurst() {
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💓'];
    const rect = envelope.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top;
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.position = 'fixed';
            heart.style.left = centerX + (Math.random() - 0.5) * 100 + 'px';
            heart.style.top = centerY + 'px';
            heart.style.fontSize = '20px';
            heart.style.zIndex = '1000';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'burstUp 1.5s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 1500);
        }, i * 50);
    }
}

// Add CSS animation for burst
const style = document.createElement('style');
style.textContent = `
    @keyframes burstUp {
        0% {
            transform: translateY(0) scale(0.5) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-200px) scale(1.2) rotate(${Math.random() * 720 - 360}deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Floating hearts background
const heartBg = document.getElementById('heartBg');
const heartSymbols = ['❤️', '💕', '💖', '💗', '💝'];

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heartBg.appendChild(heart);

    setTimeout(() => heart.remove(), 7000);
}

// Create hearts periodically
setInterval(createFloatingHeart, 300);

// Initial hearts
for (let i = 0; i < 15; i++) {
    setTimeout(createFloatingHeart, i * 200);
}

// Enhanced mouse trail effect
let lastTrailTime = 0;
document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    
    // Throttle trail creation
    if (now - lastTrailTime > 50 && Math.random() > 0.85) {
        const trail = document.createElement('div');
        trail.className = 'sparkle';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.position = 'fixed';
        trail.style.background = 'rgba(255, 255, 255, 0.9)';
        trail.style.width = '3px';
        trail.style.height = '3px';
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 1000);
        lastTrailTime = now;
    }
});

// Add subtle animation to envelope when not opened
let hoverAnimation;
envelope.addEventListener('mouseenter', function() {
    if (!isOpen) {
        clearInterval(hoverAnimation);
        hoverAnimation = setInterval(() => {
            if (!isOpen && Math.random() > 0.7) {
                const miniSparkle = document.createElement('div');
                miniSparkle.className = 'sparkle';
                const rect = envelope.getBoundingClientRect();
                miniSparkle.style.position = 'fixed';
                miniSparkle.style.left = rect.left + Math.random() * rect.width + 'px';
                miniSparkle.style.top = rect.top + Math.random() * rect.height + 'px';
                miniSparkle.style.width = '2px';
                miniSparkle.style.height = '2px';
                document.body.appendChild(miniSparkle);
                setTimeout(() => miniSparkle.remove(), 1000);
            }
        }, 200);
    }
});

envelope.addEventListener('mouseleave', function() {
    clearInterval(hoverAnimation);
});