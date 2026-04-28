// ===== API Configuration =====
const API_BASE_URL = 'http://localhost:5000/api/v1';

// ===== Utility: Fetch with Error Handling =====
async function apiCall(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Call Error:', error);
        return null;
    }
}

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Navbar Sticky Behavior =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.style.boxShadow = 'var(--shadow)';
    } else {
        navbar.style.boxShadow = 'var(--shadow)';
    }
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Contact Form Handler with Backend =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form values
        const nameInput = contactForm.querySelector('input[type="text"]');
        const emailInput = contactForm.querySelector('input[type="email"]');
        const subjectInputs = contactForm.querySelectorAll('input[type="text"]');
        const textareaInput = contactForm.querySelector('textarea');

        const name = nameInput?.value || '';
        const email = emailInput?.value || '';
        const subject = subjectInputs.length > 1 ? subjectInputs[1].value : '';
        const message = textareaInput?.value || '';

        // Validate
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Send to backend
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;

        const result = await apiCall('/contact', {
            method: 'POST',
            body: JSON.stringify({ name, email, subject, message })
        });

        if (result && result.success) {
            button.textContent = 'Message Sent! ✓';
            button.style.background = 'linear-gradient(135deg, #6BCB77, #4d9c5f)';
            contactForm.reset();

            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 3000);
        } else {
            alert('Error sending message. Please try again.');
            button.textContent = originalText;
            button.disabled = false;
        }
    });
}

// ===== Load Services from Backend =====
async function loadServices() {
    const services = await apiCall('/services');
    if (services && services.data) {
        const servicesGrid = document.querySelector('.services-grid');
        if (servicesGrid && servicesGrid.children.length === 0) {
            servicesGrid.innerHTML = services.data.map(service => `
                <div class="service-card">
                    <div class="service-icon">${service.icon || '🎨'}</div>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                    ${service.price ? `<div class="service-price">From $${service.price}</div>` : ''}
                </div>
            `).join('');
        }
    }
}

// ===== Load Features from Backend =====
async function loadFeatures() {
    const features = await apiCall('/features');
    if (features && features.data) {
        const featuresGrid = document.querySelector('.features-grid');
        if (featuresGrid && featuresGrid.children.length === 0) {
            featuresGrid.innerHTML = features.data.map(feature => `
                <div class="feature">
                    <div class="feature-number">${String(feature.number).padStart(2, '0')}</div>
                    <h3>${feature.title}</h3>
                    <p>${feature.description}</p>
                </div>
            `).join('');
        }
    }
}

// ===== Load Testimonials from Backend =====
async function loadTestimonials() {
    const testimonials = await apiCall('/testimonials');
    if (testimonials && testimonials.data) {
        const testimonialsGrid = document.querySelector('.testimonials-grid');
        if (testimonialsGrid && testimonialsGrid.children.length === 0) {
            testimonialsGrid.innerHTML = testimonials.data.map(testimonial => `
                <div class="testimonial-card">
                    <div class="stars">${'⭐'.repeat(testimonial.rating || 5)}</div>
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <div class="testimonial-author">
                        <h4>${testimonial.author}</h4>
                        <span>${testimonial.position}${testimonial.company ? ', ' + testimonial.company : ''}</span>
                    </div>
                </div>
            `).join('');
        }
    }
}

// ===== Counter Animation =====
const countElements = document.querySelectorAll('.feature-number');
const animateCounters = () => {
    countElements.forEach(element => {
        const textContent = element.textContent;
        const finalValue = parseInt(textContent);

        if (!isNaN(finalValue)) {
            const duration = 2000;
            const increment = finalValue / (duration / 50);
            let currentValue = 0;

            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    element.textContent = String(finalValue).padStart(2, '0');
                    clearInterval(counter);
                } else {
                    element.textContent = String(Math.floor(currentValue)).padStart(2, '0');
                }
            }, 50);
        }
    });
};

// Trigger counter animation when features section is visible
const featuresSection = document.getElementById('features');
if (featuresSection) {
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    featureObserver.observe(featuresSection);
}

// ===== Parallax Effect =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-background');
    if (hero) {
        hero.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});

// ===== Service Card Hover Effect =====
function attachServiceCardHovers() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== Loading Screen =====
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 2000);
    }
});

// ===== CTA Button Click Handler =====
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
        const contactSection = document.getElementById('contact');
        if (this.textContent.includes('Get Started') && contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Add Ripple Effect to Buttons =====
function addRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// ===== Dynamic Year in Footer =====
document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.textContent = `© ${year} Responsive Fanta. All rights reserved.`;
    }
});

// ===== Accessibility: Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== Performance: Debounce for scroll events =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== Preload images =====
const preloadImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.dataset.src || img.src;
        const newImg = new Image();
        newImg.src = src;
    });
};

// ===== Initialize on DOM Ready =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        preloadImages();
        loadServices();
        loadFeatures();
        loadTestimonials();
        attachServiceCardHovers();
    });
} else {
    preloadImages();
    loadServices();
    loadFeatures();
    loadTestimonials();
    attachServiceCardHovers();
}

// ===== Service Cards with Click Interaction =====
document.addEventListener('click', (e) => {
    if (e.target.closest('.service-card')) {
        const card = e.target.closest('.service-card');
        const description = card.querySelector('p');
        if (description) {
            description.style.animation = 'none';
            setTimeout(() => {
                description.style.animation = 'fadeIn 0.3s ease';
            }, 10);
        }
    }
});

// ===== Form Input Animation =====
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary-color)';
    });
    input.addEventListener('blur', function() {
        this.style.borderColor = 'var(--border-color)';
    });
});

// ===== Add Stagger Animation to Grid Items =====
const staggerElements = (selector, delay = 100) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * delay}ms`;
    });
};

staggerElements('.service-card', 100);
staggerElements('.feature', 100);
staggerElements('.testimonial-card', 100);

// ===== Mobile Touch Swipe Navigation =====
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swiped left
        closeMenu();
    }
    if (touchEndX > touchStartX + 50) {
        // Swiped right
        if (window.innerWidth < 768) {
            openMenu();
        }
    }
}

function closeMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

function openMenu() {
    navMenu.classList.add('active');
    hamburger.classList.add('active');
}

// ===== Check Server Health =====
async function checkServerHealth() {
    const health = await apiCall('/health');
    if (health) {
        console.log('✓ Backend server is running');
        console.log('Server Status:', health.status);
    } else {
        console.warn('⚠ Backend server is not responding. Make sure server.js is running on port 5000');
    }
}

// ===== Initialize =====
console.log('Responsive Fanta Website Loaded Successfully!');
checkServerHealth();
