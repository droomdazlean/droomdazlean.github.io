const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

const heroBackgrounds = [
    'bg1.webp',
    'bg2.jpg',
    'bg3.webp',
    'bg4.png',
    'bg5.avif'
];

let currentBgIndex = 0;
const hero = document.getElementById('hero');

if (hero) {
    hero.style.backgroundImage = `url('${heroBackgrounds[0]}')`;
    
    setInterval(() => {
        currentBgIndex = (currentBgIndex + 1) % heroBackgrounds.length;
        hero.style.backgroundImage = `url('${heroBackgrounds[currentBgIndex]}')`;
    }, 5000);
}

const counters = document.querySelectorAll('.counter');
let hasAnimated = false;

const animateCounters = () => {
    if (hasAnimated) return;
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCounter();
    });
    
    hasAnimated = true;
};

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function changeTestimonial(direction) {
    if (testimonials.length === 0) return;
    
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + direction + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
}

if (testimonials.length > 0) {
    setInterval(() => {
        changeTestimonial(1);
    }, 7000);
}

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        formMessage.textContent = 'Thank you for your message! We will get back to you within 24 hours.';
        formMessage.className = 'form-message success';
        
        contactForm.reset();
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
        
        console.log('Form Data:', formData);
    });
}

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .feature-card, .portfolio-item, .mv-card');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        scrollObserver.observe(element);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const lazyImages = document.querySelectorAll('img[loading="lazy"]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}