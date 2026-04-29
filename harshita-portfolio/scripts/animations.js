// ============================================================
// ANIMATIONS.JS — Scroll Reveal & Interaction Animations
// Sri Harshita Pilla Portfolio
// ============================================================

class PageAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.animationObserver = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      this.observerOptions
    );

    this.init();
  }

  init() {
    // Observe all elements with animation classes
    document.querySelectorAll('[data-animate]').forEach(el => {
      this.animationObserver.observe(el);
    });

    // Hero animations
    this.animateHero();

    // Card animations
    this.setupCardAnimations();

    // Accessibility: respect prefers-reduced-motion
    this.respectReducedMotion();
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.dataset.animate;

        if (animationType === 'fade-up') {
          this.fadeUpAnimation(element);
        } else if (animationType === 'fade-in') {
          this.fadeInAnimation(element);
        } else if (animationType === 'slide-left') {
          this.slideLeftAnimation(element);
        } else if (animationType === 'slide-right') {
          this.slideRightAnimation(element);
        }

        // Unobserve after animation
        this.animationObserver.unobserve(element);
      }
    });
  }

  fadeUpAnimation(element) {
    element.style.animation = 'fadeUp 0.6s ease-out forwards';
  }

  fadeInAnimation(element) {
    element.style.animation = 'fadeIn 0.6s ease-out forwards';
  }

  slideLeftAnimation(element) {
    element.style.animation = 'slideLeft 0.6s ease-out forwards';
  }

  slideRightAnimation(element) {
    element.style.animation = 'slideRight 0.6s ease-out forwards';
  }

  animateHero() {
    const heroLeft = document.querySelector('.hero-new__left');
    const heroRight = document.querySelector('.hero-new__right');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!heroLeft || !heroRight || reduceMotion) return;

    // Staggered animation for left column elements
    const elements = heroLeft.children;
    Array.from(elements).forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.animation = `fadeUp 0.6s ease-out ${index * 80}ms forwards`;
    });

    // Right column animation
    heroRight.style.opacity = '0';
    heroRight.style.transform = 'translateY(20px) scale(0.95)';
    heroRight.style.animation = 'fadeUp 0.6s ease-out 320ms forwards';
  }

  setupCardAnimations() {
    // Featured cards staggered animation
    document.querySelectorAll('.featured-card').forEach((card, index) => {
      card.setAttribute('data-animate', 'fade-up');
      card.style.transitionDelay = `${index * 100}ms`;
    });

    // Other work cards staggered animation
    document.querySelectorAll('.other-work-card').forEach((card, index) => {
      card.setAttribute('data-animate', 'fade-up');
      card.style.transitionDelay = `${index * 50}ms`;
    });
  }

  respectReducedMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Remove all animations
      document.querySelectorAll('[style*="animation"]').forEach(el => {
        el.style.animation = 'none !important';
        el.style.opacity = '1 !important';
        el.style.transform = 'none !important';
      });

      // Remove transition delays
      const style = document.createElement('style');
      style.textContent = `
        * {
          animation: none !important;
          transition: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// Add animation keyframes to document
const addAnimationKeyframes = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideLeft {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideRight {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;
  document.head.appendChild(style);
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  addAnimationKeyframes();
  new PageAnimations();
});
