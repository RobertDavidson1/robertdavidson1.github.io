document.addEventListener('DOMContentLoaded', function() {
    const contactButton = document.querySelector('.contact-circle');
    const pageIndicator = document.querySelector('.page-indicator');
    const magicButton = document.querySelector('.background-effect-button');
    const sections = document.querySelectorAll('.background, .scrollable-section');
    const dots = document.querySelectorAll('.indicator-dot');
    const copyright = document.querySelector('.copyright');
    const scrollHint = document.querySelector('.scroll-hint');
    
    if (typeof katex !== 'undefined') {
        const mathSymbols = document.querySelectorAll('.math-symbol');
        mathSymbols.forEach(symbol => {
            try {
                katex.render(symbol.textContent, symbol, {
                    throwOnError: false,
                    displayMode: false,
                    fontSize: '0.5em'
                });
            } catch (e) {
            }
        });
    }
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const image = document.querySelector('.image');
        const name = document.querySelector('.name');
        const description = document.querySelector('.description');
        
        if (image) {
            const scale = 1 + scrolled * 0.001;
            image.style.transform = `translateY(${scrolled * 0.2}px) scale(${scale})`;
        }
        
        if (name) {
            name.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        if (description) {
            description.style.transform = `translateY(${scrolled * 0.3}px)`;
            const baseOpacity = Math.max(0, 0.4 - scrolled * 0.001);
            const alphaValue = Math.round(baseOpacity * 255).toString(16).padStart(2, '0');
            description.style.color = `rgba(255, 255, 255, ${baseOpacity})`;
            
            const highlightOpacity = Math.max(0, 1 - scrolled * 0.0025);
            const highlights = description.querySelectorAll('.highlight');
            highlights.forEach(highlight => {
                highlight.style.color = `rgba(255, 255, 255, ${highlightOpacity})`;
                highlight.style.fontWeight = 'bold';
            });
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
        
        if (scrollHint && scrollHint.style.visibility !== 'hidden') {
            scrollHint.style.visibility = 'hidden';
        }
    }
    
    window.addEventListener('scroll', requestTick);
    document.addEventListener('scroll', requestTick);
    document.body.addEventListener('scroll', requestTick);
    
    updateParallax();
    
    function setupPageIndicator() {
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionIndex = Array.from(sections).indexOf(entry.target);
                    
                    dots.forEach((dot, index) => {
                        if (index === sectionIndex) {
                            dot.classList.add('active');
                        } else {
                            dot.classList.remove('active');
                        }
                    });
                    
                    if (sectionIndex === 2) {
                        copyright.classList.add('visible');
                    } else {
                        copyright.classList.remove('visible');
                    }
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-10% 0px -10% 0px'
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    setupPageIndicator();
    
    function setupPageIndicatorClick() {
        
        pageIndicator.addEventListener('click', () => {
            const currentActive = Array.from(dots).find(dot => dot.classList.contains('active'));
            const currentIndex = Array.from(dots).indexOf(currentActive);
            const nextIndex = (currentIndex + 1) % sections.length;
            
            sections[nextIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    setupPageIndicatorClick();
    
    const overlay = document.createElement('div');
    overlay.className = 'contact-overlay';
    document.body.appendChild(overlay);
    
    function setupContactOverlay() {
        
        let isExpanded = false;
        
        contactButton.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (isExpanded) {
                closeContactMenu();
                return;
            }
            
            isExpanded = true;
            
            contactButton.classList.add('expanded');
            overlay.classList.add('visible');
            
            pageIndicator.style.opacity = '0.3';
            pageIndicator.style.pointerEvents = 'none';
            pageIndicator.style.transition = 'opacity 0.2s ease';
            
            magicButton.classList.add('visible');
            
            setTimeout(() => {
                createSocialCapsules();
            }, 100);
        });
        
        overlay.addEventListener('click', () => {
            closeContactMenu();
        });
        
        function closeContactMenu() {
            isExpanded = false;
            
            contactButton.classList.remove('expanded');
            overlay.classList.remove('visible');
            
            magicButton.classList.remove('visible');
            
            pageIndicator.style.opacity = '1';
            pageIndicator.style.pointerEvents = 'auto';
            
            removeSocialCapsules();
        }
        
        contactButton.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    setupContactOverlay();
    
    function setupBackgroundEffect() {
        magicButton.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (contactButton && overlay) {
                overlay.click();
            }
        });
    }
    
    setupBackgroundEffect();
    
    function createSocialCapsules() {
        removeSocialCapsules();
        
        const socialLinks = [
            { icon: 'fab fa-linkedin', text: 'LinkedIn', url: 'https://www.linkedin.com/in/robert-davidson-45108b2b6/' },
            { icon: 'fab fa-github', text: 'GitHub', url: 'https://github.com/RobertDavidson1' },
            { icon: 'fas fa-envelope', text: 'Email', url: 'mailto:robertdavidson1@universityofgalway.ie' }
        ];
        
        for (let i = 0; i < 3; i++) {
            const capsule = document.createElement('div');
            capsule.className = 'social-capsule';
            
            const extendedWidth = window.innerWidth * 0.35;
            const circleSize = 40;
            const rightMargin = 20;
            const padding = 8;
            
            let rightPosition;
            if (i === 0) {
                rightPosition = rightMargin + extendedWidth - circleSize - padding;
            } else if (i === 1) {
                rightPosition = rightMargin + (extendedWidth - circleSize) / 2;
            } else {
                rightPosition = rightMargin + padding;
            }
            
            const contactButtonHeight = 50;
            const contactButtonBottom = 20;
            const verticalCenter = contactButtonBottom + (contactButtonHeight - circleSize) / 2;
            
            capsule.style.setProperty('--bottom', `${verticalCenter}px`);
            capsule.style.setProperty('--right', `${rightPosition}px`);
            capsule.style.setProperty('--size', `${circleSize}px`);
            
            const icon = document.createElement('i');
            icon.className = socialLinks[i].icon;
            capsule.appendChild(icon);
            
            capsule.addEventListener('click', (e) => {
                e.stopPropagation();
                
                capsule.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    capsule.style.transform = '';
                }, 100);
                
                setTimeout(() => {
                    window.open(socialLinks[i].url, '_blank');
                }, 150);
            });
            
            capsule.addEventListener('touchstart', (e) => {
                capsule.style.transform = 'scale(0.95)';
            });
            
            capsule.addEventListener('touchend', (e) => {
                capsule.style.transform = '';
            });
            
            document.body.appendChild(capsule);
            
            setTimeout(() => {
                capsule.classList.add('visible');
            }, i * 80 + 50);
        }
    }
    
    function removeSocialCapsules() {
        const existingCapsules = document.querySelectorAll('.social-capsule');
        existingCapsules.forEach((capsule, index) => {
            capsule.classList.remove('visible');
            
            setTimeout(() => {
                if (capsule.parentNode) {
                    capsule.parentNode.removeChild(capsule);
                }
            }, 300 + (index * 30));
        });
    }
});