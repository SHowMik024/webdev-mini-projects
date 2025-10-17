// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav__link');

// Toggle mobile menu
navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    // Change hamburger icon
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 20;
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => { link.classList.remove('active'); });
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;
    const styles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 1001;
            min-width: 300px;
            border-left: 4px solid var(--color-primary);
            animation: slideIn 0.3s ease;
        }
        .notification--success { border-left-color: #28a745; }
        .notification--error { border-left-color: #dc3545; }
        .notification__content { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
        .notification__message { color: var(--text-dark); font-weight: 500; }
        .notification__close {
            background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-light);
            padding: 0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
        }
        .notification__close:hover { color: var(--text-dark); }
        @keyframes slideIn { from{transform:translateX(100%); opacity:0;} to{transform:translateX(0); opacity:1;} }
        @media (max-width: 480px) {
            .notification { right: 10px; left: 10px; min-width: auto; }
        }
    `;
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    document.body.appendChild(notification);
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => { notification.remove(); });
    setTimeout(() => { if (notification.parentNode) notification.remove(); }, 5000);
}

// Animate elements on scroll
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);
const animatedElements = document.querySelectorAll('.feature__card, .about__content, .contact__content');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'transparent';
        header.style.backdropFilter = 'none';
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    ['logo.png', 'prod.png', 'heal.png', 'heal2.png'].forEach(name => {
        const img = new Image();
        img.src = `media/pic/${name}`;
    });
    const topImg = document.querySelector('.page-top-img');
    if (topImg) {
        topImg.style.cursor = 'pointer';
        topImg.addEventListener('click', () => scrollToSection('home'));
    }
    const elements = document.querySelectorAll('.btn, .feature__card, .nav__link');
    elements.forEach(el => {
        el.style.transition = 'all 0.3s ease';
    });

    // Buy Section Logic with Popup Checkout
    const buyBtn = document.getElementById('buyBtn');
    const buyQuantity = document.getElementById('buyQuantity');
    const checkoutArea = document.getElementById('checkoutArea');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalForm = document.getElementById('modalForm');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    let qty = 1;

    if (buyBtn && buyQuantity && checkoutArea) {
        buyBtn.addEventListener('click', function() {
            qty = parseInt(buyQuantity.value, 10);
            if (isNaN(qty) || qty < 1) {
                qty = 1;
                buyQuantity.value = 1;
            }
            checkoutArea.style.display = "block";
            checkoutArea.innerHTML = `
                <div>
                    Selected: <b>${qty}</b> at 90৳ each = <b>${qty*90}৳</b> <br>
                    <button class="btn btn--primary" id="checkoutBtn">Proceed to Checkout</button>
                </div>
            `;
            setTimeout(() => { checkoutArea.scrollIntoView({ behavior: 'smooth' }); }, 120);

            setTimeout(function() {
                const checkoutBtn = document.getElementById('checkoutBtn');
                if (checkoutBtn) {
                    checkoutBtn.addEventListener('click', function() {
                        modalOverlay.classList.add('show-modal');
                    });
                }
            }, 0);
        });
    }

    if (modalForm && checkoutArea && modalOverlay) {
        modalForm.addEventListener('submit', function(ev) {
            ev.preventDefault();
            const name = document.getElementById('modalName').value.trim();
            const email = document.getElementById('modalEmail').value.trim();
            const location = document.getElementById('modalLocation').value.trim();
            if (!name || !email || !location) {
                alert('Please fill in all fields!');
                return;
            }
            checkoutArea.innerHTML =
                `<strong>Thank you, ${name}!</strong> Your order for <b>${qty}</b> Relief-Again (${qty*90}৳) will be delivered to: <b>${location}</b>.<br>
                You will get a confirmation at <b>${email}</b>.`;
            checkoutArea.style.display = "block";
            modalOverlay.classList.remove('show-modal');
            setTimeout(() => { checkoutArea.style.display = 'none'; }, 8000);
            modalForm.reset();
        });
        modalCloseBtn.addEventListener('click', function() {
            modalOverlay.classList.remove('show-modal');
        });
    }
});
