// ============================================================
// NAVBAR.JS — Navigation Bar Interactivity
// Sri Harshita Pilla Portfolio
// ============================================================

class Navbar {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.hamburger = document.getElementById('navbarHamburger');
    this.mobileMenu = document.getElementById('navbarMobileMenu');
    this.ctaBtn = document.getElementById('navbarCtaBtn');
    this.ctaBtnMobile = document.getElementById('navbarCtaBtnMobile');
    this.links = document.querySelectorAll('.navbar__link, .navbar__mobile-link');

    this.init();
  }

  init() {
    // Hamburger menu toggle
    this.hamburger?.addEventListener('click', () => this.toggleMobileMenu());

    // CTA buttons
    this.ctaBtn?.addEventListener('click', () => this.handleCTA());
    this.ctaBtnMobile?.addEventListener('click', () => this.handleCTA());

    // Navigation links
    this.links.forEach(link => {
      link.addEventListener('click', (e) => this.handleLinkClick(e));
    });

    // Scroll effect
    window.addEventListener('scroll', () => this.updateScrollEffect());

    // Close mobile menu on link click
    document.querySelectorAll('.navbar__mobile-link').forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });

    // Prevent body scroll when mobile menu is open
    this.observeMenuState();
  }

  toggleMobileMenu() {
    const isOpen = this.hamburger.classList.contains('active');
    
    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.hamburger.classList.add('active');
    this.hamburger.setAttribute('aria-expanded', 'true');
    this.mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    this.hamburger.classList.remove('active');
    this.hamburger.setAttribute('aria-expanded', 'false');
    this.mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  updateScrollEffect() {
    const scrollTop = window.scrollY;
    
    // Add scroll effect at 50px
    if (scrollTop > 50) {
      this.navbar.classList.add('navbar--scrolled');
    } else {
      this.navbar.classList.remove('navbar--scrolled');
    }
  }

  handleLinkClick(e) {
    const target = e.currentTarget.getAttribute('href');
    
    // Set active state
    this.links.forEach(link => link.classList.remove('active'));
    e.currentTarget.classList.add('active');

    // Smooth scroll to section
    if (target && target.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  handleCTA() {
    // Open Calendly modal
    const modal = document.getElementById('calendlyModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.closeMobileMenu();
    }
  }

  observeMenuState() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navbar.contains(e.target) && this.hamburger.classList.contains('active')) {
        // Don't close if clicking on a link (already handled)
        if (!e.target.closest('.navbar__link')) {
          this.closeMobileMenu();
        }
      }
    });
  }
}

// Initialize navbar when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Navbar();

  // Handle Calendly modal close
  const modal = document.getElementById('calendlyModal');
  const closeBtn = document.getElementById('calendlyClose');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close modal when clicking outside
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
