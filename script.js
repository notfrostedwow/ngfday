class AudioManager {
    constructor() {
        this.audio = document.getElementById('background-music');
        this.isPlaying = false;
        this.hasUserInteracted = false;
        
        if (this.audio) {
            this.audio.addEventListener('loadstart', () => console.log('Audio loading started'));
            this.audio.addEventListener('canplay', () => console.log('Audio can play'));
            this.audio.addEventListener('playing', () => console.log('Audio is playing'));
            this.audio.addEventListener('pause', () => console.log('Audio paused'));
            this.audio.addEventListener('error', (e) => console.log('Audio error:', e));
        }
    }

    async play() {
        try {
            if (this.audio) {
                await this.audio.play();
                this.isPlaying = true;
            }
        } catch (error) {
            this.showPlayButton();
        }
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
    }

    setVolume(level) {
        this.audio.volume = Math.max(0, Math.min(1, level));
    }

    showPlayButton() {
        const playBtn = document.createElement('button');
        playBtn.innerHTML = '🎵 Play Music';
        playBtn.className = 'romantic-btn music-btn';
        playBtn.style.position = 'fixed';
        playBtn.style.top = '20px';
        playBtn.style.right = '20px';
        playBtn.style.zIndex = '1000';

        playBtn.onclick = () => {
            this.audio.play().then(() => {
                this.isPlaying = true;
                playBtn.innerHTML = '🎵 Music On';
            }).catch(error => {
                playBtn.innerHTML = '🎵 No Music';
            });
        };

        document.body.appendChild(playBtn);
    }
    
    createMusicToggle() {
        const musicBtn = document.createElement('button');
        musicBtn.innerHTML = '🎵';
        musicBtn.className = 'romantic-btn music-btn';
        musicBtn.style.position = 'fixed';
        musicBtn.style.top = '20px';
        musicBtn.style.right = '20px';
        musicBtn.style.zIndex = '1000';
        musicBtn.style.width = '50px';
        musicBtn.style.height = '50px';
        musicBtn.style.borderRadius = '50%';
        musicBtn.style.padding = '0';
        musicBtn.title = 'Toggle Music';

        musicBtn.onclick = () => {
            if (this.isPlaying) {
                this.pause();
                musicBtn.innerHTML = '🔇';
                musicBtn.style.opacity = '0.6';
            } else {
                this.play();
                musicBtn.innerHTML = '🎵';
                musicBtn.style.opacity = '1';
            }
        };

        document.body.appendChild(musicBtn);
        return musicBtn;
    }

    handleAudioError() {
        console.log('Audio file not found, continuing without music');
    }

    handleUserInteraction() {
        this.hasUserInteracted = true;
        if (!this.isPlaying) {
            this.play();
        }
    }
}

class AnimationController {
    static fadeIn(element, duration = 500) {
        element.style.opacity = '0';
        element.style.display = 'flex';
        element.classList.add('fade-in');

        setTimeout(() => {
            element.style.opacity = '1';
            element.classList.remove('fade-in');
        }, duration);
    }

    static fadeOut(element, duration = 500) {
        element.classList.add('fade-out');

        setTimeout(() => {
            element.style.display = 'none';
            element.classList.remove('fade-out');
        }, duration);
    }

    static slideUp(element, duration = 800) {
        element.style.transform = 'translateY(50px)';
        element.style.opacity = '0';

        setTimeout(() => {
            element.style.transition = `all ${duration}ms ease-out`;
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }, 50);
    }

    static openEnvelope(envelope) {
        envelope.classList.add('opening');

        setTimeout(() => {
            pageManager.navigateTo('photos-page');
        }, 1200);
    }
}

class PageManager {
    constructor() {
        this.currentPage = 'landing-page';
        this.pages = ['landing-page', 'envelope-page', 'photos-page'];
    }

    showPage(pageId) {
        this.pages.forEach(page => {
            const element = document.getElementById(page);
            if (element) {
                element.classList.remove('active');
            }
        });

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            AnimationController.fadeIn(targetPage);
            this.currentPage = pageId;
        }
    }

    navigateTo(pageId) {
        const currentElement = document.getElementById(this.currentPage);
        if (currentElement) {
            AnimationController.fadeOut(currentElement, 300);
        }

        setTimeout(() => {
            this.showPage(pageId);
        }, 300);
    }
}

const pageManager = new PageManager();
const audioManager = new AudioManager();

document.addEventListener('DOMContentLoaded', function () {
    pageManager.showPage('landing-page');

    audioManager.setVolume(0.3);
    
    audioManager.hasUserInteracted = true;
    audioManager.play();

    document.addEventListener('click', () => {
        audioManager.handleUserInteraction();
    }, { once: true });
    
    document.addEventListener('touchstart', () => {
        audioManager.handleUserInteraction();
    }, { once: true });

    const audio = document.getElementById('background-music');
    if (audio) {
        audio.addEventListener('error', () => {
            audioManager.handleAudioError();
        });
        
        audioManager.createMusicToggle();
    }

    setupEventListeners();
    createSparkles();
});

function createSparkles() {
    const sparkleCount = 5;

    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 2 + 's';

            document.body.appendChild(sparkle);

            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }, i * 400);
    }

    setTimeout(createSparkles, 8000);
}

function setupEventListeners() {
    const enterBtn = document.getElementById('enter-btn');
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            pageManager.navigateTo('envelope-page');
        });
    }

    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const retryMessage = document.getElementById('retry-message');
    const envelope = document.getElementById('envelope');

    if (noBtn) {
        noBtn.addEventListener('click', () => {
            retryMessage.classList.remove('hidden');
            retryMessage.style.animation = 'none';
            setTimeout(() => {
                retryMessage.style.animation = 'shake 0.5s ease-in-out';
            }, 10);
        });
    }

    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            document.querySelector('.button-group').style.opacity = '0';
            retryMessage.classList.add('hidden');
            AnimationController.openEnvelope(envelope);
        });
    }
    
    const goBackBtn = document.getElementById('go-back-btn');
    if (goBackBtn) {
        goBackBtn.addEventListener('click', () => {
            goBackBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                pageManager.navigateTo('landing-page');
                const envelope = document.getElementById('envelope');
                if (envelope) {
                    envelope.classList.remove('opening');
                }
                const buttonGroup = document.querySelector('.button-group');
                if (buttonGroup) {
                    buttonGroup.style.opacity = '1';
                }
                const retryMessage = document.getElementById('retry-message');
                if (retryMessage) {
                    retryMessage.classList.add('hidden');
                }
            }, 200);
        });
    }
}

class PhotoManager {
    constructor() {
        this.photos = document.querySelectorAll('.photo');
        this.setupPhotoHandling();
    }

    setupPhotoHandling() {
        this.photos.forEach((photo) => {
            photo.addEventListener('error', () => {
                this.showPlaceholder(photo);
            });

            photo.addEventListener('load', () => {
                this.optimizeImage(photo);
            });

            this.setupAspectRatio(photo);
        });
    }

    showPlaceholder(photo) {
        const placeholder = photo.nextElementSibling;
        if (placeholder && placeholder.classList.contains('photo-placeholder')) {
            photo.style.display = 'none';
            placeholder.style.display = 'flex';
        }
    }

    optimizeImage(photo) {
        photo.style.objectFit = 'cover';
        photo.style.objectPosition = 'center';

        photo.style.opacity = '0';
        setTimeout(() => {
            photo.style.transition = 'opacity 0.5s ease-in-out';
            photo.style.opacity = '1';
        }, 100);
    }

    setupAspectRatio(photo) {
        photo.style.aspectRatio = '4/3';
        photo.style.width = '100%';
        photo.style.height = 'auto';
        photo.style.minHeight = '200px';
        photo.style.maxHeight = '300px';
    }

    updatePhoto(index, newSrc) {
        if (this.photos[index]) {
            this.photos[index].src = newSrc;
            this.photos[index].style.display = 'block';

            const placeholder = this.photos[index].nextElementSibling;
            if (placeholder && placeholder.classList.contains('photo-placeholder')) {
                placeholder.style.display = 'none';
            }
        }
    }
}

let photoManager;
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        photoManager = new PhotoManager();
    }, 100);
});

function checkBrowserSupport() {
    const features = {
        cssGrid: CSS.supports('display', 'grid'),
        cssTransforms: CSS.supports('transform', 'rotateX(180deg)'),
        audioSupport: !!document.createElement('audio').canPlayType,
        touchSupport: 'ontouchstart' in window
    };

    if (!features.cssGrid) {
        document.body.classList.add('no-css-grid');
    }

    if (!features.cssTransforms) {
        document.body.classList.add('no-transforms');
    }

    if (features.touchSupport) {
        document.body.classList.add('touch-device');
    }

    return features;
}

function optimizePerformance() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('.photo').forEach(img => {
            imageObserver.observe(img);
        });
    }

    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-motion');
    }
}

function setupErrorHandling() {
    window.addEventListener('error', (e) => {
        console.log('Error caught:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.log('Promise rejection handled:', e.reason);
        e.preventDefault();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    checkBrowserSupport();
    optimizePerformance();
    setupErrorHandling();
});