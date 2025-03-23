/**
 * EdTech Courses Page JavaScript
 * Provides animations, interactions and dynamic content loading
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page with animations
    initializePageAnimations();
    
    // Setup the view toggle functionality
    setupViewToggle();
    
    // Setup course card interactions
    setupCourseCards();
    
    // Setup filter interactions
    setupFilters();
    
    // Initialize search functionality
    initializeSearch();
});

/**
 * Initialize page entrance animations
 */
function initializePageAnimations() {
    // Add staggered entrance for header elements
    const header = document.querySelector('.courses-header');
    if (header) {
        header.style.opacity = '0';
        setTimeout(() => {
            header.style.opacity = '1';
            header.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }, 300);
    }
    
    // Add a counting animation to the course ribbons
    animateRibbons();
    
    // Add special highlight effect to course cards
    highlightPopularCourses();
}

/**
 * Animate course ribbons with a subtle pulsing effect
 */
function animateRibbons() {
    const ribbons = document.querySelectorAll('.course-ribbon');
    ribbons.forEach(ribbon => {
        // Add a random delay to make the pulsing asynchronous
        const delay = Math.random() * 2;
        ribbon.style.animationDelay = `${delay}s`;
    });
}

/**
 * Special highlighting for popular courses
 */
function highlightPopularCourses() {
    // Get all course cards
    const courseCards = document.querySelectorAll('.course-card');
    
    // Find cards with bestseller ribbon or high ratings
    courseCards.forEach(card => {
        const ribbon = card.querySelector('.course-ribbon');
        const rating = card.querySelector('.course-rating span');
        
        if (ribbon && ribbon.textContent.includes('Bestseller')) {
            // Add a subtle glow effect
            card.style.boxShadow = '0 5px 25px rgba(67, 97, 238, 0.15)';
            
            // Add a special animation on entrance
            card.style.animation = 'fadeInUp 0.8s forwards, pulse 2s infinite 1s';
        }
        
        if (rating) {
            const ratingValue = parseFloat(rating.textContent);
            if (ratingValue >= 4.8) {
                // Add a subtle indicator for top-rated courses
                const highRatingBadge = document.createElement('div');
                highRatingBadge.className = 'top-rated-badge';
                highRatingBadge.innerHTML = '<i class="fas fa-award"></i> Top Rated';
                highRatingBadge.style.position = 'absolute';
                highRatingBadge.style.top = '15px';
                highRatingBadge.style.left = '15px';
                highRatingBadge.style.background = 'linear-gradient(135deg, #f97316, #fb923c)';
                highRatingBadge.style.color = 'white';
                highRatingBadge.style.padding = '5px 10px';
                highRatingBadge.style.borderRadius = '4px';
                highRatingBadge.style.fontSize = '12px';
                highRatingBadge.style.fontWeight = '600';
                highRatingBadge.style.zIndex = '2';
                highRatingBadge.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                highRatingBadge.style.animation = 'fadeInUp 0.5s forwards 1s';
                highRatingBadge.style.opacity = '0';
                
                card.querySelector('.course-image').appendChild(highRatingBadge);
            }
        }
    });
}

/**
 * Setup the grid/list view toggle functionality
 */
function setupViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const coursesContainer = document.querySelector('.courses-grid');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Apply the selected view
            const viewType = this.getAttribute('data-view');
            if (viewType === 'list') {
                coursesContainer.classList.remove('courses-grid');
                coursesContainer.classList.add('courses-list');
            } else {
                coursesContainer.classList.remove('courses-list');
                coursesContainer.classList.add('courses-grid');
            }
            
            // Trigger entrance animations again
            const courseCards = document.querySelectorAll('.course-card');
            courseCards.forEach((card, index) => {
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = `fadeInUp 0.5s forwards ${index * 0.1}s`;
                card.style.opacity = '0';
            });
        });
    });
}

/**
 * Setup interactive effects for course cards
 */
function setupCourseCards() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        // Add hover effect tracking for enhanced animations
        card.addEventListener('mouseenter', function() {
            // Add enhanced transition to progress bar
            const progressBar = this.querySelector('.progress');
            if (progressBar) {
                const width = progressBar.style.width;
                progressBar.style.transition = 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 50);
            }
            
            // Animate the rating stars
            const ratingStars = this.querySelectorAll('.course-rating i');
            ratingStars.forEach((star, index) => {
                setTimeout(() => {
                    star.style.animation = 'bounce 0.5s ease-in-out';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset animations for next hover
            const ratingStars = this.querySelectorAll('.course-rating i');
            ratingStars.forEach(star => {
                star.style.animation = 'none';
            });
        });
        
        // Add click interaction for course cards
        card.addEventListener('click', function(e) {
            // Don't handle click if a button was clicked
            if (e.target.closest('.course-actions')) {
                return;
            }
            
            // Create a ripple effect on click
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.backgroundColor = 'rgba(67, 97, 238, 0.2)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
            ripple.style.top = (e.clientY - card.getBoundingClientRect().top) + 'px';
            ripple.style.left = (e.clientX - card.getBoundingClientRect().left) + 'px';
            ripple.style.pointerEvents = 'none';
            
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.transform = 'scale(15)';
                ripple.style.opacity = '0';
                
                setTimeout(() => {
                    ripple.remove();
                    // Navigate to course details page in real app
                    // window.location.href = '/course-details.html?id=' + card.dataset.courseId;
                }, 600);
            }, 10);
        });
    });
    
    // Add special effects to buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/**
 * Setup filter interactions with animations
 */
function setupFilters() {
    const filterSelects = document.querySelectorAll('.filter-group select');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            // Add animation flash to the parent filter group
            const filterGroup = this.closest('.filter-group');
            filterGroup.style.animation = 'none';
            filterGroup.offsetHeight; // Trigger reflow
            filterGroup.style.animation = 'pulse 0.5s';
            
            // In a real app, this would filter the courses
            // For demo, we'll just add a flashing animation to course cards
            const courseCards = document.querySelectorAll('.course-card');
            courseCards.forEach(card => {
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = 'fadeInUp 0.5s forwards';
                card.style.opacity = '0';
            });
        });
    });
}

/**
 * Initialize search functionality with predictive typing
 */
function initializeSearch() {
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 3px rgba(67, 97, 238, 0.15)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = '';
        });
        
        // Add "typing" animation when search input is clicked
        searchInput.addEventListener('click', function() {
            if (this.value === '') {
                const placeholderText = 'Try "Web Development" or "UI/UX Design"';
                let i = 0;
                
                const typingInterval = setInterval(() => {
                    if (i < placeholderText.length) {
                        this.setAttribute('placeholder', placeholderText.substring(0, i + 1));
                        i++;
                    } else {
                        clearInterval(typingInterval);
                        
                        // Reset after a delay
                        setTimeout(() => {
                            this.setAttribute('placeholder', 'Search for courses, topics...');
                        }, 2000);
                    }
                }, 50);
            }
        });
        
        // Add search functionality
        searchInput.addEventListener('input', function() {
            // For demo, just show a visual indicator that search is working
            const courseCards = document.querySelectorAll('.course-card');
            
            if (this.value.length > 0) {
                courseCards.forEach(card => {
                    const title = card.querySelector('.course-title').textContent.toLowerCase();
                    const category = card.querySelector('.course-category').textContent.toLowerCase();
                    const searchTerm = this.value.toLowerCase();
                    
                    if (title.includes(searchTerm) || category.includes(searchTerm)) {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1.02)';
                        card.style.boxShadow = '0 15px 30px rgba(67, 97, 238, 0.2)';
                    } else {
                        card.style.opacity = '0.5';
                        card.style.transform = 'scale(0.98)';
                        card.style.boxShadow = '';
                    }
                });
            } else {
                courseCards.forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = '';
                    card.style.boxShadow = '';
                });
            }
        });
    }
} 