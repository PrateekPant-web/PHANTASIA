// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize welcome message animation
    animateWelcomeMessage();
    
    // Initialize chart for learning progress
    initLearningProgressChart();
    
    // Add tooltips to elements
    // initTooltips();
    
    // Initialize dropdown menu functionality
    initDropdowns();
    
    // Apply animations to elements
    updateCourseProgress();
    
    // Simulate notification updates
    setTimeout(updateNotifications, 5000);
});

/**
 * Enhance the welcome message animation
 */
function animateWelcomeMessage() {
    const welcomeMessage = document.querySelector('.welcome-message');
    if (!welcomeMessage) return;
    
    // Add a random greeting from the list
    const greetings = [
        "Welcome back",
        "Great to see you",
        "Hello again",
        "Good to have you back",
        "Welcome"
    ];
    
    // Get time of day for contextual greeting
    const hour = new Date().getHours();
    let timeGreeting = "";
    
    if (hour < 12) {
        timeGreeting = "Good morning";
    } else if (hour < 18) {
        timeGreeting = "Good afternoon";
    } else {
        timeGreeting = "Good evening";
    }
    
    // Add to possible greetings
    greetings.push(timeGreeting);
    
    // Get a random greeting
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    // Update the welcome message if user visits multiple times
    if (sessionStorage.getItem('visited')) {
        const h1 = welcomeMessage.querySelector('h1');
        const name = h1.textContent.split(',')[1].split(' ')[1];
        h1.innerHTML = `${randomGreeting}, ${name} <span class="wave">👋</span>`;
    } else {
        // Mark as visited for next page load
        sessionStorage.setItem('visited', 'true');
    }
}

// Learning Progress Line Chart
function initLearningProgressChart() {
    const ctx = document.getElementById('learningChart');
    
    if (!ctx) return; // Safety check in case we're not on the dashboard page
    
    // Sample data for the learning progress chart
    const learningData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [
            {
                label: 'Hours Studied',
                data: [5, 8, 12, 7, 15, 10],
                borderColor: '#4361ee',
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true
            },
            {
                label: 'Assignments Completed',
                data: [2, 4, 3, 5, 4, 6],
                borderColor: '#f72585',
                backgroundColor: 'rgba(247, 37, 133, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true
            }
        ]
    };

    const learningChart = new Chart(ctx, {
        type: 'line',
        data: learningData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: 10,
                    titleFont: {
                        family: "'Poppins', sans-serif",
                        size: 13
                    },
                    bodyFont: {
                        family: "'Poppins', sans-serif",
                        size: 12
                    },
                    cornerRadius: 4
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 11
                        }
                    }
                }
            }
        }
    });
    
    // Event listener for the chart time period dropdown
    const timeSelector = document.querySelector('.learning-progress .dropdown button');
    if (timeSelector) {
        timeSelector.addEventListener('click', () => {
            // You would update the chart data based on the selected time period
            // Example: learningChart.data.datasets[0].data = newData;
            // learningChart.update();
        });
    }
}

// Skill Distribution Radar Chart (can be added to a profile page)
function initSkillRadarChart() {
    const profileCharts = document.querySelectorAll('.skill-chart');
    
    if (profileCharts.length === 0) return;
    
    profileCharts.forEach(canvas => {
        const skillChart = new Chart(canvas, {
            type: 'radar',
            data: {
                labels: ['HTML/CSS', 'JavaScript', 'React', 'Backend', 'Database', 'UI/UX'],
                datasets: [{
                    label: 'Your Skills',
                    data: [85, 75, 60, 50, 45, 80],
                    backgroundColor: 'rgba(67, 97, 238, 0.2)',
                    borderColor: '#4361ee',
                    borderWidth: 2,
                    pointBackgroundColor: '#4361ee',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            display: false
                        }
                    }
                }
            }
        });
    });
}

// Initialize tooltip functionality
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', (e) => {
            const tooltipText = document.createElement('div');
            tooltipText.classList.add('tooltip');
            tooltipText.textContent = e.target.dataset.tooltip;
            document.body.appendChild(tooltipText);
            
            const rect = e.target.getBoundingClientRect();
            tooltipText.style.top = `${rect.top - tooltipText.offsetHeight - 10}px`;
            tooltipText.style.left = `${rect.left + (rect.width / 2) - (tooltipText.offsetWidth / 2)}px`;
            tooltipText.classList.add('visible');
        });
        
        tooltip.addEventListener('mouseleave', () => {
            const tooltipEl = document.querySelector('.tooltip.visible');
            if (tooltipEl) {
                tooltipEl.classList.remove('visible');
                setTimeout(() => {
                    tooltipEl.remove();
                }, 300);
            }
        });
    });
}

// Initialize dropdown menus
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown button');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            // Here you would implement actual dropdown menu logic
            // This is a simplified version for demonstration
            const parent = e.target.closest('.dropdown');
            const dropMenu = parent.querySelector('.drop-menu');
            
            if (dropMenu) {
                dropMenu.classList.toggle('show');
            } else {
                // Create dropdown menu dynamically
                const newMenu = document.createElement('div');
                newMenu.classList.add('drop-menu', 'show');
                
                // Add different options based on dropdown type
                if (parent.closest('.learning-progress')) {
                    const options = ['This Week', 'This Month', 'This Year', 'All Time'];
                    options.forEach(option => {
                        const menuItem = document.createElement('a');
                        menuItem.href = '#';
                        menuItem.textContent = option;
                        menuItem.addEventListener('click', (evt) => {
                            evt.preventDefault();
                            dropdown.textContent = option + ' ';
                            const icon = document.createElement('i');
                            icon.className = 'fas fa-chevron-down';
                            dropdown.appendChild(icon);
                            newMenu.classList.remove('show');
                        });
                        newMenu.appendChild(menuItem);
                    });
                } else if (dropdown.textContent.includes('View All')) {
                    // For "View All" dropdowns, we would typically link to a full page
                    const menuItem = document.createElement('a');
                    menuItem.href = '#';
                    menuItem.textContent = 'View Full Page';
                    newMenu.appendChild(menuItem);
                }
                
                parent.appendChild(newMenu);
                
                // Close dropdown when clicking outside
                document.addEventListener('click', function closeDropdown(evt) {
                    if (!parent.contains(evt.target)) {
                        newMenu.classList.remove('show');
                        document.removeEventListener('click', closeDropdown);
                    }
                });
            }
        });
    });
}

// Update course progress dynamically
function updateCourseProgress() {
    const progressBars = document.querySelectorAll('.deadline-progress .progress-bar');
    
    progressBars.forEach(bar => {
        const width = parseInt(bar.style.width);
        const span = bar.parentNode.querySelector('span');
        
        if (width === 0) {
            span.textContent = 'Not started';
        } else if (width === 100) {
            span.textContent = 'Completed';
            bar.style.backgroundColor = '#4caf50';
        } else if (width > 75) {
            span.textContent = `${width}% Complete`;
            bar.style.backgroundColor = '#4361ee';
        } else if (width > 50) {
            span.textContent = `${width}% Complete`;
            bar.style.backgroundColor = '#4895ef';
        } else if (width > 25) {
            span.textContent = `${width}% Complete`;
            bar.style.backgroundColor = '#ff9800';
        } else {
            span.textContent = `${width}% Complete`;
            bar.style.backgroundColor = '#f44336';
        }
    });
}

// Call progress update on page load
document.addEventListener('DOMContentLoaded', updateCourseProgress);

// Dashboard initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initializeCharts();
    
    // Initialize animations
    initializeAnimations();
    
    // Add event listeners
    addEventListeners();
});

// Initialize all charts
function initializeCharts() {
    const learningCtx = document.getElementById('learningChart').getContext('2d');
    
    // Sample data - replace with actual data
    const learningChart = new Chart(learningCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Hours Studied',
                data: [8, 15, 12, 18],
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 10,
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false,
                        color: 'rgba(226, 232, 240, 0.5)'
                    },
                    ticks: {
                        stepSize: 5
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Initialize animations
function initializeAnimations() {
    // Animate counters
    animateCounters();
    
    // Setup Intersection Observer for scroll-based animations
    setupIntersectionObserver();
}

// Animate counter numbers
function animateCounters() {
    const counters = document.querySelectorAll('.counter-num');
    
    counters.forEach(counter => {
        const targetValue = parseInt(counter.getAttribute('data-count'));
        const text = counter.textContent;
        const suffix = text.replace(/[0-9]/g, '');
        const duration = 1500; // ms
        const startValue = 0;
        const increment = Math.ceil(targetValue / (duration / 16)); // Approximate for 60fps
        
        let currentValue = startValue;
        
        const updateCounter = () => {
            currentValue += increment;
            
            if (currentValue >= targetValue) {
                counter.textContent = targetValue + suffix;
                return;
            }
            
            counter.textContent = currentValue + suffix;
            requestAnimationFrame(updateCounter);
        };
        
        // Start the animation after a small delay
        setTimeout(() => {
            updateCounter();
        }, 300);
    });
}

// Setup Intersection Observer for scroll-based animations
function setupIntersectionObserver() {
    // Select all dashboard cards
    const cards = document.querySelectorAll('.dashboard-card');
    
    // Create observer options
    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element must be visible
    };
    
    // Create observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element is visible
                entry.target.classList.add('animate');
                // Stop observing it
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Start observing each card
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Add event listeners
function addEventListeners() {
    // Apply shine effect to each activity item on hover
    const activityItems = document.querySelectorAll('.activity-item');
    
    activityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            addShineEffect(this);
        });
    });
    
    // Deadline items hover effect
    const deadlineItems = document.querySelectorAll('.deadline-item');
    
    deadlineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.deadline-date').classList.add('animated');
            
            // Simulate progress bar animation for incomplete items
            const progressBar = this.querySelector('.progress-bar');
            const currentWidth = parseInt(progressBar.style.width);
            
            if (currentWidth < 100) {
                // Temporarily increase the progress bar width on hover
                const originalWidth = progressBar.style.width;
                progressBar.style.width = (currentWidth + 10) + '%';
                
                // Reset after leaving
                item.addEventListener('mouseleave', function() {
                    progressBar.style.width = originalWidth;
                }, { once: true });
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.deadline-date').classList.remove('animated');
        });
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Update button icon
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
            
            // Save preference
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Check saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            const icon = themeToggle.querySelector('i');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// Add shine/glimmer effect
function addShineEffect(element) {
    // Create the shine effect
    const shine = document.createElement('div');
    shine.classList.add('shine-effect');
    
    // Add to element
    element.appendChild(shine);
    
    // Remove after animation completes
    setTimeout(() => {
        shine.remove();
    }, 1000);
} 