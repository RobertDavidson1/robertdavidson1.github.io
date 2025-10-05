// Mobile JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Preload images for smoother experience
    const images = ['images/1.png', 'images/2.png', 'images/3.png'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Optional: Track which section is currently visible
    const sections = document.querySelectorAll('.image-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section is visible - you can add analytics, animations, etc. here
                console.log('Viewing section:', entry.target);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of section is visible
    });

    sections.forEach(section => observer.observe(section));
});