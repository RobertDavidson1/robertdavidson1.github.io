// Mobile JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.querySelector('.image-container');
    const imageSections = document.querySelectorAll('.image-section');
    let isScrolling = false;
    let scrollTimeout;
    let currentImageIndex = 0;

    // Snap scrolling functionality
    function snapToImage(targetIndex) {
        const windowHeight = window.innerHeight;
        const targetScrollTop = targetIndex * windowHeight;
        
        window.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth'
        });
        
        currentImageIndex = targetIndex;
    }

    // Determine which image to snap to based on scroll position
    function getSnapTarget(scrollTop) {
        const windowHeight = window.innerHeight;
        const halfHeight = windowHeight / 2;
        const scrollPosition = scrollTop + halfHeight;
        
        return Math.round(scrollPosition / windowHeight);
    }

    // Enhanced scroll handling with snapping
    function handleScroll() {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(updateScroll);
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            // Snap to the nearest image after scrolling stops
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetIndex = getSnapTarget(scrollTop);
            
            // Clamp to valid range (0 to 2 for 3 images)
            const clampedIndex = Math.max(0, Math.min(2, targetIndex));
            
            if (clampedIndex !== currentImageIndex) {
                snapToImage(clampedIndex);
            }
        }, 100); // Reduced timeout for more responsive snapping
    }

    function updateScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const maxScroll = imageContainer.offsetHeight - windowHeight;
        
        // Normalize scroll position (0 to 1)
        const scrollProgress = Math.max(0, Math.min(1, scrollTop / maxScroll));
        
        // Optional: Add parallax effect or other scroll-based animations here
        // For now, the CSS handles the seamless scrolling
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Preload images for smoother experience
    const images = ['images/1.png', 'images/2.png', 'images/3.png'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Enhanced touch support for snap scrolling
    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartTime = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
        touchStartTime = Date.now();
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const timeThreshold = 300; // Max time for a swipe
        const diff = touchStartY - touchEndY;
        const timeDiff = Date.now() - touchStartTime;
        
        // Only handle quick, deliberate swipes
        if (Math.abs(diff) > swipeThreshold && timeDiff < timeThreshold) {
            const direction = diff > 0 ? 1 : -1; // 1 for up (next), -1 for down (previous)
            const targetIndex = currentImageIndex + direction;
            
            // Clamp to valid range
            const clampedIndex = Math.max(0, Math.min(2, targetIndex));
            
            if (clampedIndex !== currentImageIndex) {
                snapToImage(clampedIndex);
            }
        }
    }

    // Keyboard support for desktop testing
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                if (currentImageIndex > 0) {
                    snapToImage(currentImageIndex - 1);
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (currentImageIndex < 2) {
                    snapToImage(currentImageIndex + 1);
                }
                break;
        }
    });
});
