// Mobile-specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const ctaBtn = document.getElementById('cta-btn');
    
    // Mobile menu toggle
    menuBtn.addEventListener('click', function() {
        alert('Mobile menu would open here');
    });
    
    // CTA button with haptic feedback simulation
    ctaBtn.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    ctaBtn.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
        alert('Mobile CTA tapped!');
    });
    
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    console.log('Mobile site loaded');
});
