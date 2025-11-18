// NPS Rating Interactive Script
// ES6+ Vanilla JavaScript

class NPSRating {
    constructor() {
        this.ratingButtons = document.querySelectorAll('.rating__button');
        this.feedbackSection = document.getElementById('feedbackForm');
        this.reviewsSection = document.getElementById('reviewsLinks');
        this.feedbackForm = document.querySelector('.feedback__form');
        this.selectedRating = null;

        this.init();
    }

    init() {
        this.bindEvents();
        this.hideSections();
    }

    bindEvents() {
        // Bind click events to rating buttons
        this.ratingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const rating = parseInt(button.dataset.rating);
                this.handleRatingClick(rating, button);
            });
        });

        // Bind form submit event
        if (this.feedbackForm) {
            this.feedbackForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(e);
            });
        }
    }

    handleRatingClick(rating, button) {
        // Update selected rating
        this.selectedRating = rating;

        // Update button states
        this.updateButtonStates(button);

        // Show appropriate section based on rating
        if (rating <= 3) {
            this.showFeedbackForm();
        } else if (rating >= 4) {
            this.showReviewsLinks();
        }

        // Scroll to the shown section
        this.scrollToSection();
    }

    updateButtonStates(activeButton) {
        // Remove active class from all buttons
        this.ratingButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to clicked button
        activeButton.classList.add('active');
    }

    showFeedbackForm() {
        this.hideSections();
        if (this.feedbackSection) {
            this.feedbackSection.classList.add('active');
        }
    }

    showReviewsLinks() {
        this.hideSections();
        if (this.reviewsSection) {
            this.reviewsSection.classList.add('active');
        }
    }

    hideSections() {
        if (this.feedbackSection) {
            this.feedbackSection.classList.remove('active');
        }
        if (this.reviewsSection) {
            this.reviewsSection.classList.remove('active');
        }
    }

    scrollToSection() {
        // Smooth scroll to the active section
        setTimeout(() => {
            const activeSection = document.querySelector('.feedback.active, .reviews.active');
            if (activeSection) {
                const offsetTop = activeSection.offsetTop - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

    handleFormSubmit(event) {
        // Validate form
        const form = event.target;
        const formData = new FormData(form);
        
        // Check if all required fields are filled
        const name = form.querySelector('input[type="text"]').value.trim();
        const phone = form.querySelector('input[type="tel"]').value.trim();
        const message = form.querySelector('textarea').value.trim();
        const agreement = form.querySelector('input[type="checkbox"]').checked;

        if (!name || !phone || !message || !agreement) {
            alert('Пожалуйста, заполните все поля и согласитесь с обработкой персональных данных');
            return;
        }

        // Simulate form submission
        console.log('Form submitted with rating:', this.selectedRating);
        console.log('Name:', name);
        console.log('Phone:', phone);
        console.log('Message:', message);

        // Show success message
        alert('Спасибо за ваш отзыв! Мы обязательно рассмотрим ваше обращение.');

        // Reset form
        form.reset();

        // Hide feedback section
        this.hideSections();

        // Reset button states
        this.ratingButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Initialize NPS Rating when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NPSRating();
});

// Smooth scroll for footer links
document.addEventListener('DOMContentLoaded', () => {
    const footerLinks = document.querySelectorAll('.footer__link');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevent default for demo purposes
            // In production, these would link to actual pages
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
                console.log('Footer link clicked:', link.textContent);
            }
        });
    });
});

// Handle review links
document.addEventListener('DOMContentLoaded', () => {
    const reviewLinks = document.querySelectorAll('.reviews__link');
    
    reviewLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevent default for demo purposes
            // In production, these would link to actual review sites
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
                const platform = link.querySelector('.reviews__link-text').textContent;
                console.log('Review link clicked:', platform);
                alert(`Переход на ${platform}. В продакшене здесь будет реальная ссылка.`);
            }
        });
    });
});