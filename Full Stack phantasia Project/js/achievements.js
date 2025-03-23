// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize skill chart
    initSkillChart();
    
    // Initialize badge interactions without tooltips
    initBadgeInteractions();
    
    // Initialize dropdown functionality
    initDropdowns();
    
    // Apply animations to elements
    animateElements();
});

/**
 * Initialize the skill radar chart using Chart.js
 */
function initSkillChart() {
    const ctx = document.getElementById('skillChart').getContext('2d');
    
    // Determine if dark mode is active
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Create gradient for the chart area
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
    gradientFill.addColorStop(0, 'rgba(79, 70, 229, 0.4)'); // More opaque
    gradientFill.addColorStop(1, 'rgba(168, 85, 247, 0.2)'); // More vibrant
    
    // Set colors based on theme
    const gridColor = isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.5)';
    const textColor = isDarkMode ? '#e2e8f0' : '#64748b';
    const tickColor = isDarkMode ? '#cbd5e1' : '#94a3b8';
    
    const skillChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'UI/UX'],
            datasets: [{
                label: 'Your Skills',
                data: [90, 85, 75, 68, 45, 50, 72, 80],
                backgroundColor: gradientFill,
                borderColor: '#4f46e5',
                borderWidth: 2.5, // Thicker border
                pointBackgroundColor: '#4f46e5',
                pointBorderColor: isDarkMode ? '#1e293b' : '#fff',
                pointHoverBackgroundColor: '#a855f7',
                pointHoverBorderColor: isDarkMode ? '#1e293b' : '#fff',
                pointRadius: 5, // Larger points
                pointHoverRadius: 8, // Larger hover points
                pointBorderWidth: 2 // Thicker point borders
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        color: gridColor,
                        lineWidth: 1.5 // Thicker lines
                    },
                    grid: {
                        color: gridColor,
                        circular: true
                    },
                    pointLabels: {
                        font: {
                            size: 14, // Larger font size
                            family: "'Inter', sans-serif",
                            weight: '600' // Bolder font
                        },
                        color: textColor,
                        padding: 10 // More padding
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: tickColor,
                        font: {
                            size: 11 // Slightly larger tick size
                        },
                        z: 1, // Ensure ticks are below grid lines
                        stepSize: 20,
                        showLabelBackdrop: false,
                        backdropPadding: 2,
                        major: {
                            enabled: true
                        }
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    animate: true
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(15, 23, 42, 0.8)',
                    titleFont: {
                        size: 14, // Larger font size
                        family: "'Inter', sans-serif",
                        weight: '600'
                    },
                    bodyFont: {
                        size: 13, // Larger font size
                        family: "'Inter', sans-serif"
                    },
                    padding: 14, // More padding
                    displayColors: false,
                    cornerRadius: 8, // Rounded corners
                    caretSize: 6, // Larger caret
                    callbacks: {
                        label: function(context) {
                            return context.raw + '% Mastery';
                        },
                        title: function(context) {
                            return context[0].label;
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1500, // Longer animation duration
                easing: 'easeOutQuart' // Smoother easing
            },
            layout: {
                padding: 20 // Add padding around chart
            },
            elements: {
                line: {
                    tension: 0.1, // Add slight curvature to lines
                    borderJoinStyle: 'round' // Rounded line joins
                }
            }
        }
    });
    
    // Add resize event listener to ensure chart remains responsive
    window.addEventListener('resize', function() {
        skillChart.resize();
    });
    
    // Add animation to data points on mouse over the chart
    const chartContainer = document.querySelector('.skill-chart-container');
    if (chartContainer) {
        chartContainer.addEventListener('mouseenter', function() {
            // Animate data points by temporarily modifying their size
            skillChart.options.elements.point = {
                radius: 6,
                hoverRadius: 9,
                borderWidth: 2.5,
                hoverBorderWidth: 3
            };
            skillChart.update();
        });
        
        chartContainer.addEventListener('mouseleave', function() {
            // Restore original point size
            skillChart.options.elements.point = {
                radius: 5,
                hoverRadius: 8,
                borderWidth: 2,
                hoverBorderWidth: 2
            };
            skillChart.update();
        });
    }
    
    // Update chart when theme changes
    document.getElementById('themeToggle').addEventListener('click', function() {
        // Wait for the DOM to update with new theme
        setTimeout(() => {
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            // Update chart colors
            skillChart.options.scales.r.grid.color = isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.5)';
            skillChart.options.scales.r.angleLines.color = isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.5)';
            skillChart.options.scales.r.pointLabels.color = isDarkMode ? '#e2e8f0' : '#64748b';
            skillChart.options.scales.r.ticks.color = isDarkMode ? '#cbd5e1' : '#94a3b8';
            
            skillChart.data.datasets[0].pointBorderColor = isDarkMode ? '#1e293b' : '#fff';
            skillChart.data.datasets[0].pointHoverBorderColor = isDarkMode ? '#1e293b' : '#fff';
            
            skillChart.options.plugins.tooltip.backgroundColor = isDarkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(15, 23, 42, 0.8)';
            
            // Update the chart
            skillChart.update();
        }, 100);
    });
    
    // Add initial animation for the skill chart
    animateSkillChart(skillChart);
}

/**
 * Add a growing animation to the skill chart data
 * @param {Object} chart - The Chart.js instance
 */
function animateSkillChart(chart) {
    const originalData = [...chart.data.datasets[0].data];
    
    // Start with zero values
    chart.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0];
    chart.update();
    
    // Animate each value to its original state
    const duration = 1500; // 1.5 seconds
    const steps = 30; // Number of steps in the animation
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    
    const animation = setInterval(() => {
        currentStep++;
        
        if (currentStep <= steps) {
            const progress = currentStep / steps;
            const easedProgress = easeOutCubic(progress);
            
            const newData = originalData.map(value => Math.round(value * easedProgress));
            chart.data.datasets[0].data = newData;
            chart.update('none'); // Update without animation
        } else {
            // Ensure final values are exactly as specified
            chart.data.datasets[0].data = originalData;
            chart.update('none');
            clearInterval(animation);
        }
    }, stepDuration);
}

/**
 * Easing function for smoother animations
 * @param {number} x - Input progress value (0 to 1)
 * @returns {number} Eased value
 */
function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}

/**
 * Initialize badge interactions without any popups
 */
function initBadgeInteractions() {
    // Remove all click events that would show popups
    // Only keep hover animations
    const badges = document.querySelectorAll('.badge-item');
    
    badges.forEach(badge => {
        // Only add hover animation effects, no click events
        badge.addEventListener('mouseenter', () => {
            if (badge.classList.contains('earned')) {
                badge.querySelector('.badge-icon').classList.add('pulse');
            }
        });
        
        badge.addEventListener('mouseleave', () => {
            badge.querySelector('.badge-icon').classList.remove('pulse');
        });
    });
}

/**
 * Initialize dropdown button functionality
 */
function initDropdowns() {
    const dropdownButtons = document.querySelectorAll('.dropdown button');
    
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dropdownContent = this.parentElement.querySelector('.dropdown-content');
            
            // For demo purposes, we'll just show a toast with the action
            const buttonText = this.textContent.trim();
            showToast('Action Clicked', `You clicked on "${buttonText}"`, 'info');
        });
    });
}

/**
 * Apply entrance animations to dashboard elements
 */
function animateElements() {
    // We're now using CSS classes for animations
    // The animation classes are already applied in the HTML
    
    // Add hover effects to milestones
    const currentMilestone = document.querySelector('.milestone-item.current');
    if (currentMilestone) {
        // Add a subtle pulse effect to current milestone marker
        const marker = currentMilestone.querySelector('.milestone-marker');
        marker.classList.add('pulse');
    }
    
    // Additional interactive effects for leaderboard items
    const leaderboardItems = document.querySelectorAll('.leaderboard-item');
    leaderboardItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const rank = item.querySelector('.rank');
            rank.classList.add('pulse');
        });
        
        item.addEventListener('mouseleave', () => {
            const rank = item.querySelector('.rank');
            rank.classList.remove('pulse');
        });
    });
    
    // Enhance skill chart with interactive hover effects
    const skillChartContainer = document.querySelector('.skill-chart-container');
    if (skillChartContainer) {
        skillChartContainer.addEventListener('mouseenter', () => {
            skillChartContainer.style.transform = 'scale(1.02)';
            skillChartContainer.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        skillChartContainer.addEventListener('mouseleave', () => {
            skillChartContainer.style.transform = 'scale(1)';
        });
    }
    
    // Add staggered entrance animations to achievement items
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach((item, index) => {
        // Skip if already has animation delay
        if (!item.style.animationDelay) {
            item.style.animationDelay = `${0.1 + (index * 0.1)}s`;
            item.classList.add('slideInUp');
        }
        
        // Add shine effect to achievement icons on hover
        const achievementIcon = item.querySelector('.achievement-icon');
        if (achievementIcon) {
            item.addEventListener('mouseenter', () => {
                achievementIcon.style.transform = 'scale(1.1) rotate(5deg)';
                achievementIcon.style.boxShadow = '0 0 15px rgba(79, 70, 229, 0.5)';
            });
            
            item.addEventListener('mouseleave', () => {
                achievementIcon.style.transform = '';
                achievementIcon.style.boxShadow = '';
            });
        }
    });
    
    // Add interactive hover effects to milestone items
    const milestoneItems = document.querySelectorAll('.milestone-item');
    milestoneItems.forEach((item, index) => {
        // Add staggered entrance animation
        if (!item.style.animationDelay) {
            item.style.animationDelay = `${0.2 + (index * 0.1)}s`;
            item.classList.add('slideInUp');
        }
        
        // Add progress bar animation for current milestone
        if (item.classList.contains('current')) {
            const progressBar = item.querySelector('.progress');
            if (progressBar) {
                // Animate progress bar width from 0 to current value
                const targetWidth = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.transition = 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    progressBar.style.width = targetWidth;
                }, 500);
            }
        }
    });
}

/**
 * Show a toast notification
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {string} type - Toast type (success, error, info, warning)
 */
function showToast(title, message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
        
        // Add toast container styles
        toastContainer.style.position = 'fixed';
        toastContainer.style.top = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '1000';
        toastContainer.style.display = 'flex';
        toastContainer.style.flexDirection = 'column';
        toastContainer.style.gap = '10px';
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-header">
            <strong>${title}</strong>
            <button class="toast-close">&times;</button>
        </div>
        <div class="toast-body">${message}</div>
    `;
    
    // Add toast styles
    toast.style.backgroundColor = 'white';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    toast.style.overflow = 'hidden';
    toast.style.minWidth = '300px';
    toast.style.maxWidth = '400px';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    
    // Style toast header
    const toastHeader = toast.querySelector('.toast-header');
    toastHeader.style.padding = '10px 15px';
    toastHeader.style.display = 'flex';
    toastHeader.style.justifyContent = 'space-between';
    toastHeader.style.alignItems = 'center';
    toastHeader.style.borderBottom = '1px solid #e2e8f0';
    
    // Add color based on type
    switch(type) {
        case 'success':
            toastHeader.style.borderLeft = '4px solid #10b981';
            break;
        case 'error':
            toastHeader.style.borderLeft = '4px solid #ef4444';
            break;
        case 'warning':
            toastHeader.style.borderLeft = '4px solid #f59e0b';
            break;
        case 'info':
        default:
            toastHeader.style.borderLeft = '4px solid #3b82f6';
            break;
    }
    
    // Style toast body
    const toastBody = toast.querySelector('.toast-body');
    toastBody.style.padding = '10px 15px';
    toastBody.style.fontSize = '14px';
    toastBody.style.color = '#64748b';
    
    // Style close button
    const closeButton = toast.querySelector('.toast-close');
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '20px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#94a3b8';
    
    // Add the toast to the container
    toastContainer.appendChild(toast);
    
    // Trigger repaint
    toast.getBoundingClientRect();
    
    // Show the toast
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(0)';
    
    // Add click event to close button
    closeButton.addEventListener('click', function() {
        closeToast(toast);
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        closeToast(toast);
    }, 5000);
}

/**
 * Close a toast notification
 * @param {HTMLElement} toast - The toast element to close
 */
function closeToast(toast) {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    
    // Remove the toast after animation completes
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
            
            // Remove container if no toasts left
            const toastContainer = document.querySelector('.toast-container');
            if (toastContainer && !toastContainer.hasChildNodes()) {
                document.body.removeChild(toastContainer);
            }
        }
    }, 300);
}

// Add mock API functions for simulating data fetching
// In a real application, these would connect to a backend

/**
 * Fetch user achievements data
 * @returns {Promise} Promise resolving to achievements data
 */
function fetchAchievementsData() {
    // Simulate API call
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                totalBadges: 42,
                earnedBadges: 8,
                xpPoints: 8540,
                currentLevel: 18,
                nextLevelXP: 10000,
                dayStreak: 15
            });
        }, 500);
    });
}

/**
 * Fetch leaderboard data
 * @param {string} timeRange - Time range for leaderboard (week, month, all-time)
 * @returns {Promise} Promise resolving to leaderboard data
 */
function fetchLeaderboardData(timeRange = 'week') {
    // Simulate API call
    return new Promise(resolve => {
        setTimeout(() => {
            // In a real app, this would change based on the timeRange parameter
            resolve([
                { rank: 1, name: 'Sophia Chen', points: 11245, avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
                { rank: 2, name: 'Prateek Pant', points: 10890, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
                { rank: 3, name: 'Michael Johnson', points: 9675, avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
                { rank: 4, name: 'Emma Wilson', points: 8920, avatar: 'https://randomuser.me/api/portraits/women/28.jpg' },
                { rank: 5, name: 'David Lee', points: 7845, avatar: 'https://randomuser.me/api/portraits/men/67.jpg' },
                { rank: 6, name: 'Sarah Martinez', points: 6790, avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
                { rank: 7, name: 'James Taylor', points: 5620, avatar: 'https://randomuser.me/api/portraits/men/54.jpg' }
            ]);
        }, 500);
    });
} 