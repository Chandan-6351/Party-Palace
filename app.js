// Application data
const appData = {
    "cafe_info": {
        "name": "Party Palace",
        "tagline": "Where Every Celebration Becomes Unforgettable",
        "description": "Party Palace is your premier destination for memorable celebrations and gatherings. Located in the heart of the city, we specialize in creating magical moments for birthdays, anniversaries, corporate events, and special occasions.",
        "phone": "+91 94271 47917",
        "email": "partypalacehelp@gmail.com",
        "address": "128-First Floor, Isana The Business Hub, Besides D-Mart, Pandesara - Althan, Surat, Gujarat 395017",
        "whatsapp": "+919427147917",
        "hours": {
            "Monday": "10:00 AM - 10:00 PM",
            "Tuesday": "10:00 AM - 10:00 PM", 
            "Wednesday": "10:00 AM - 10:00 PM",
            "Thursday": "10:00 AM - 10:00 PM",
            "Friday": "10:00 AM - 10:00 PM",
            "Saturday": "10:00 AM - 10:00 PM",
            "Sunday": "10:00 AM - 10:00 PM"
        }
    },
    "offers": [
        {
            "id": 1,
            "title": "Birthday Bash Package",
            "description": "Complete birthday celebration with decorations, cake, and party setup",
            "price": "₹ 899",
            "features": ["Regular Decorations", "Cake Included", "Sound System", "Full AC Room", "Up to 10 guests"],
            "popular": false
        },
        {
            "id": 2,
            "title": "Corporate Event Special",
            "description": "Professional venue for corporate meetings and team celebrations",
            "price": "₹ 1,299",
            "features": ["Regular Decorations", "Cake Included", "Sound System", "Full AC Room", "LED Message Box", "Some Selfie Props", "Up to 15 guests"],
            "popular": true
        },
        {
            "id": 3,
            "title": "Anniversary Romance",
            "description": "Intimate setting for anniversary celebrations and romantic dinners",
            "price": "$199",
            "features": ["Romantic ambiance", "Special menu", "Flower arrangements", "Personalized service", "Up to 10 guests"],
            "popular": false
        },
        {
            "id": 4,
            "title": "Weekend Brunch Party",
            "description": "Perfect for weekend celebrations with brunch menu and mimosas",
            "price": "$349",
            "features": ["Brunch buffet", "Complimentary mimosas", "Live music", "Garden seating", "Up to 25 guests"],
            "popular": true
        }
    ],
    "gallery_images": [
        {
            "id": 1,
            "category": "Party Celebrations",
            "alt": "Birthday party celebration with colorful decorations",
            "emoji": "🎂"
        },
        //{
        //    "id": 2,
        //    "category": "Food & Beverages",
        //    "alt": "Delicious party platters and beverages",
        //    "emoji": "🍽️"
        //},
        {
            "id": 3,
            "category": "Venue Spaces",
            "alt": "Main party hall with elegant lighting",
            "emoji": "🏛️"
        },
        {
            "id": 4,
            "category": "Events",
            "alt": "Corporate event setup with AV equipment",
            "emoji": "💼"
        },
        {
            "id": 5,
            "category": "Party Celebrations",
            "alt": "Anniversary celebration with romantic setup",
            "emoji": "💕"
        },
        {
            "id": 6,
            "category": "Food & Beverages",
            "alt": "Gourmet coffee and dessert selection",
            "emoji": "☕"
        },
        {
            "id": 7,
            "category": "Venue Spaces",
            "alt": "Outdoor garden seating area",
            "emoji": "🌿"
        },
        {
            "id": 8,
            "category": "Events",
            "alt": "Wedding reception setup",
            "emoji": "💒"
        }
    ],
    "services": [
        {
            "title": "Party Planning",
            "description": "Full-service party planning from concept to execution"
        },
        {
            "title": "Catering Services",
            "description": "Custom menus for all types of celebrations and events"
        },
        {
            "title": "Event Decoration",
            "description": "Professional decoration services to match your theme"
        },
        {
            "title": "Audio/Visual Setup",
            "description": "Complete AV equipment for presentations and entertainment"
        }
    ],
    "about_highlights": [
        "Over 5 years of celebration excellence",
        "Accommodates 10-100 guests",
        "Full-service party planning",
        "Custom catering menus",
        "Professional decoration services",
        "State-of-the-art sound system",
        "Free WiFi throughout venue",
        "Convenient downtown location"
    ]
};

// DOM elements
let currentPage = 'home';
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMobileMenu();
    populateOffers();
    populateGallery();
    populateServices();
    populateHighlights();
    initializeLightbox();
    initializeContactForm();
    initializeGalleryFilters();
});

// Navigation functionality
function initializeNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                showPage(targetPage);
                updateActiveNavLink(this);
                closeMobileMenu();
            }
        });
    });

    // Handle navigation from other elements
    document.addEventListener('click', function(e) {
        if (e.target.hasAttribute('data-page')) {
            e.preventDefault();
            const targetPage = e.target.getAttribute('data-page');
            showPage(targetPage);
            updateActiveNavLink(document.querySelector(`[data-page="${targetPage}"]`));
            closeMobileMenu();
        }
    });
}

function showPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        window.scrollTo(0, 0);
    }
}

function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Populate offers sections
function populateOffers() {
    populateFeaturedOffers();
    populateDetailedOffers();
}

function populateFeaturedOffers() {
    const featuredOffersContainer = document.getElementById('featured-offers');
    if (!featuredOffersContainer) return;

    const featuredOffers = appData.offers.filter(offer => offer.popular);
    
    featuredOffersContainer.innerHTML = featuredOffers.map(offer => `
        <div class="offer-card ${offer.popular ? 'popular' : ''}">
            <h3>${offer.title}</h3>
            <div class="price">${offer.price}</div>
            <p class="description">${offer.description}</p>
            <ul class="features-list">
                ${offer.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <a href="https://wa.me/${appData.cafe_info.whatsapp}?text=Hi! I'm interested in the ${offer.title} package. Can you provide more details?" target="_blank" class="btn btn--primary btn--full-width">Book This Package</a>
        </div>
    `).join('');
}

function populateDetailedOffers() {
    const detailedOffersContainer = document.getElementById('offers-detailed');
    if (!detailedOffersContainer) return;

    detailedOffersContainer.innerHTML = appData.offers.map(offer => `
        <div class="offer-card ${offer.popular ? 'popular' : ''}">
            <h3>${offer.title}</h3>
            <div class="price">${offer.price}</div>
            <p class="description">${offer.description}</p>
            <ul class="features-list">
                ${offer.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <a href="https://wa.me/${appData.cafe_info.whatsapp}?text=Hi! I'm interested in the ${offer.title} package. Can you provide more details and availability?" target="_blank" class="btn btn--primary btn--full-width">Book This Package</a>
        </div>
    `).join('');
}

// Populate gallery sections
function populateGallery() {
    populateGalleryPreview();
    populateGalleryMain();
}

function populateGalleryPreview() {
    const galleryPreviewContainer = document.getElementById('gallery-preview');
    if (!galleryPreviewContainer) return;

    const previewImages = appData.gallery_images.slice(0, 4);
    
    galleryPreviewContainer.innerHTML = previewImages.map(image => `
        <div class="gallery-item" data-category="${image.category}" data-alt="${image.alt}">
            <div class="gallery-placeholder">${image.emoji}</div>
            <div class="gallery-caption">${image.alt}</div>
        </div>
    `).join('');
}

function populateGalleryMain() {
    const galleryMainContainer = document.getElementById('gallery-main');
    if (!galleryMainContainer) return;

    galleryMainContainer.innerHTML = appData.gallery_images.map(image => `
        <div class="gallery-item" data-category="${image.category}" data-alt="${image.alt}">
            <div class="gallery-placeholder">${image.emoji}</div>
            <div class="gallery-caption">${image.alt}</div>
        </div>
    `).join('');
}

// Gallery filtering functionality
function initializeGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('#gallery-main .gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Populate services section
function populateServices() {
    const servicesContainer = document.getElementById('services-grid');
    if (!servicesContainer) return;

    servicesContainer.innerHTML = appData.services.map(service => `
        <div class="service-card">
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `).join('');
}

// Populate highlights section
function populateHighlights() {
    const highlightsContainer = document.getElementById('highlights-grid');
    if (!highlightsContainer) return;

    highlightsContainer.innerHTML = appData.about_highlights.map(highlight => `
        <div class="highlight-item">${highlight}</div>
    `).join('');
}

// Lightbox functionality
function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (!lightbox) return;

    // Add click handlers to gallery items
    document.addEventListener('click', function(e) {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const alt = galleryItem.getAttribute('data-alt');
            const emoji = galleryItem.querySelector('.gallery-placeholder').textContent;
            
            // Create a simple colored placeholder for the lightbox
            const canvas = document.createElement('canvas');
            canvas.width = 600;
            canvas.height = 400;
            const ctx = canvas.getContext('2d');
            
            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, 600, 400);
            const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            gradient.addColorStop(0, randomColor);
            gradient.addColorStop(1, randomColor + '80');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 600, 400);
            
            // Add emoji
            ctx.font = '100px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(emoji, 300, 200);
            
            lightboxImage.src = canvas.toDataURL();
            lightboxImage.alt = alt;
            lightboxCaption.textContent = alt;
            lightbox.classList.remove('hidden');
        }
    });

    // Close lightbox
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.add('hidden');
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
        }
    });

    // Close with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            lightbox.classList.add('hidden');
        }
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Create WhatsApp message
        let message = `Hi! I'd like to inquire about booking Party Palace for an event.\n\n`;
        message += `Name: ${data.name}\n`;
        message += `Email: ${data.email}\n`;
        if (data.phone) message += `Phone: ${data.phone}\n`;
        if (data['event-type']) message += `Event Type: ${data['event-type']}\n`;
        if (data.guests) message += `Number of Guests: ${data.guests}\n`;
        if (data.date) message += `Preferred Date: ${data.date}\n`;
        if (data.message) message += `Message: ${data.message}\n`;
        
        const whatsappUrl = `https://wa.me/${appData.cafe_info.whatsapp}?text=${encodeURIComponent(message)}`;
        
        // Show success message
        showNotification('Thank you! Redirecting to WhatsApp...', 'success');
        
        // Redirect after a short delay
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1000);
        
        // Reset form
        this.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--color-surface);
        color: var(--color-text);
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        border: 1px solid var(--color-border);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.borderLeft = '4px solid var(--color-success)';
    } else if (type === 'error') {
        notification.style.borderLeft = '4px solid var(--color-error)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
        updateActiveNavLink(document.querySelector(`[data-page="${hash}"]`));
    } else {
        showPage('home');
        updateActiveNavLink(document.querySelector('[data-page="home"]'));
    }
});

// Update URL when navigating
function updateURL(pageId) {
    if (pageId !== 'home') {
        window.history.pushState({page: pageId}, '', `#${pageId}`);
    } else {
        window.history.pushState({page: pageId}, '', window.location.pathname);
    }
}

// Enhanced showPage function with URL update
const originalShowPage = showPage;
showPage = function(pageId) {
    originalShowPage(pageId);
    updateURL(pageId);
};

// Initialize page based on URL hash
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
        updateActiveNavLink(document.querySelector(`[data-page="${hash}"]`));
    }
});

// Add loading animation for better UX
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--color-background);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        font-size: 24px;
        color: var(--color-primary);
    `;
    loader.innerHTML = '🎉 Loading Party Palace...';
    document.body.appendChild(loader);
    
    setTimeout(() => {
        if (document.getElementById('loader')) {
            document.body.removeChild(loader);
        }
    }, 1000);
}

// Show loading on page load
if (document.readyState === 'loading') {
    showLoading();
}
