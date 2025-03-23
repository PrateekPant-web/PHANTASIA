// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initNavbarEffects();
    initDropdowns();
    setupEventListeners();
    animateStatCards();
    fixSidebarIcons();
    ensureSidebarVisibility();
    forceNavVisibility();
    fixSidebarBackground();
    initThemeToggle();
    initSearchBarEffects();
    initNavigation();
});

/**
 * Initialize mobile navigation toggle
 */
function initMobileNavigation() {
    const existingBtn = document.querySelector('.mobile-menu-btn');
    
    // If button doesn't exist, create it
    if (!existingBtn) {
        const sidebar = document.querySelector('.sidebar');
        const mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.appendChild(mobileBtn);
        
        // Toggle sidebar on mobile button click
        mobileBtn.addEventListener('click', function() {
            sidebar.classList.toggle('sidebar-hidden');
            if (sidebar.classList.contains('sidebar-hidden')) {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-times"></i>';
            }
        });
        
        // Hide sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                !sidebar.contains(e.target) && 
                e.target !== mobileBtn && 
                !mobileBtn.contains(e.target)) {
                sidebar.classList.add('sidebar-hidden');
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

/**
 * Initialize navbar visual effects
 */
function initNavbarEffects() {
    const navLinks = document.querySelectorAll('.nav-links li');
    const sidebar = document.querySelector('.sidebar');
    
    // Mark current page as active
    navLinks.forEach(link => {
        const linkHref = link.querySelector('a').getAttribute('href');
        if (window.location.href.includes(linkHref)) {
            link.classList.add('active');
        }
    });
    
    // Subtle hover effects for navigation links
    navLinks.forEach((link) => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                // Simple highlight effect - all handled by CSS
            }
        });
        
        link.addEventListener('mouseleave', function() {
            // Reset effects - all handled by CSS
        });
    });
    
    // Add subtle shadow to sidebar on hover
    if (sidebar) {
        sidebar.addEventListener('mouseenter', function() {
            this.classList.add('hover-effect');
        });
        
        sidebar.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
        });
    }
    
    // Add scroll effect for header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

/**
 * Initialize stat card animations
 */
function animateStatCards() {
    const stats = document.querySelectorAll('.stat-card');
    
    stats.forEach((stat, index) => {
        // Add animation with delay
        setTimeout(() => {
            stat.classList.add('animated');
        }, 100 * index);
        
        // Add hover effect
        stat.addEventListener('mouseenter', function() {
            this.querySelector('.stat-icon').classList.add('pulse');
        });
        
        stat.addEventListener('mouseleave', function() {
            this.querySelector('.stat-icon').classList.remove('pulse');
        });
    });
}

/**
 * Initialize dropdown menus
 */
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown button');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            
            // For demonstration, just toggle a class
            // In a real app, you'd show/hide a dropdown menu
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-chevron-down')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else if (icon.classList.contains('fa-chevron-up')) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}

/**
 * Setup additional event listeners
 */
function setupEventListeners() {
    const actionButtons = document.querySelectorAll('.header-actions button');
    
    // Add click effects for action buttons
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 300);
        });
    });
    
    // Enhance search experience
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }
}

// Add additional animations for badge notifications
const badges = document.querySelectorAll('.badge');
if (badges.length > 0) {
    badges.forEach(badge => {
        setInterval(() => {
            badge.classList.add('pulse');
            setTimeout(() => {
                badge.classList.remove('pulse');
            }, 1000);
        }, 5000);
    });
}

/**
 * Initializes the sidebar navigation, sets the active link based on current page
 */
function initNavigation() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Map of page filenames to their corresponding navigation link selectors
    const pageToNavMap = {
        'index.html': '.nav-links li a[href="index.html"]',
        'dashboard.html': '.nav-links li a[href="dashboard.html"]',
        'courses.html': '.nav-links li a[href="courses.html"]',
        'calendar.html': '.nav-links li a[href="calendar.html"]',
        'community.html': '.nav-links li a[href="community.html"]',
        'achievements.html': '.nav-links li a[href="achievements.html"]',
        'settings.html': '.nav-links li a[href="settings.html"]'
    };
    
    // Clear any existing active classes
    document.querySelectorAll('.nav-links li').forEach(li => {
        li.classList.remove('active');
    });
    
    // Set active class for current page
    if (pageToNavMap[currentPage]) {
        const activeLink = document.querySelector(pageToNavMap[currentPage]);
        if (activeLink) {
            activeLink.parentElement.classList.add('active');
            
            // Apply active styles immediately
            const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDarkMode) {
                activeLink.style.backgroundColor = 'rgba(67, 97, 238, 0.2)';
                
                const span = activeLink.querySelector('span');
                if (span) {
                    span.style.color = getComputedStyle(document.documentElement)
                        .getPropertyValue('--primary-color').trim();
                }
                
                const icon = activeLink.querySelector('i');
                if (icon) {
                    icon.style.color = getComputedStyle(document.documentElement)
                        .getPropertyValue('--primary-color').trim();
                }
            } else {
                activeLink.style.backgroundColor = 'rgba(67, 97, 238, 0.1)';
                
                const span = activeLink.querySelector('span');
                if (span) {
                    span.style.color = '#4361ee';
                }
                
                const icon = activeLink.querySelector('i');
                if (icon) {
                    icon.style.color = '#4361ee';
                }
            }
        }
    }
}

// Helper function to format dates
function formatDate(date) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Helper function to format time
function formatTime(date) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString('en-US', options);
}

// Helper function for calculating time ago
function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    
    return Math.floor(seconds) + " seconds ago";
}

/**
 * Ensure all sidebar icons are properly visible
 */
function fixSidebarIcons() {
    const navIcons = document.querySelectorAll('.nav-links a i');
    
    navIcons.forEach(icon => {
        // Make sure all icons have proper visibility
        icon.style.opacity = '1';
        icon.style.display = 'inline-block';
        
        // Special handling for achievement icon
        if (icon.classList.contains('fa-trophy')) {
            icon.style.color = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
            
            // If this is the active page, use primary color
            if (icon.closest('li').classList.contains('active')) {
                icon.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
            }
        }
    });
    
    // Force re-render of all icons
    setTimeout(() => {
        navIcons.forEach(icon => {
            icon.style.transform = 'scale(1.01)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 50);
        });
    }, 100);
}

/**
 * Ensure sidebar text and icons are visible
 */
function ensureSidebarVisibility() {
    // Fix sidebar text visibility
    const navLinks = document.querySelectorAll('.nav-links a');
    const sidebar = document.querySelector('.sidebar');
    
    // Ensure sidebar has proper background and shadow
    sidebar.style.backgroundColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--background-white').trim();
    sidebar.style.boxShadow = getComputedStyle(document.documentElement)
        .getPropertyValue('--shadow-md').trim();
    
    navLinks.forEach(link => {
        // Ensure text is dark and visible
        link.style.color = getComputedStyle(document.documentElement)
            .getPropertyValue('--text-dark').trim();
        link.style.fontWeight = '600';
        
        // Ensure text has good contrast
        const span = link.querySelector('span');
        if (span) {
            span.style.color = getComputedStyle(document.documentElement)
                .getPropertyValue('--text-dark').trim();
            span.style.opacity = '1';
            span.style.visibility = 'visible';
        }
        
        // Make icons visible with good color
        const icon = link.querySelector('i');
        if (icon) {
            icon.style.color = getComputedStyle(document.documentElement)
                .getPropertyValue('--primary-color').trim();
            icon.style.opacity = '1';
            icon.style.visibility = 'visible';
            
            // Apply stronger styles if link is active
            if (link.parentElement.classList.contains('active')) {
                icon.style.color = getComputedStyle(document.documentElement)
                    .getPropertyValue('--primary-color').trim();
                link.style.backgroundColor = getComputedStyle(document.documentElement)
                    .getPropertyValue('--background-gray').trim();
                link.style.fontWeight = '700';
            }
        }
    });
}

/**
 * Force navigation links visibility for all pages
 */
function forceNavVisibility() {
    // Force sidebar to be visible
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.backgroundColor = 'white';
        sidebar.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    }
    
    // Ensure all navigation links are visible
    const navLinks = document.querySelectorAll('.nav-links li a');
    navLinks.forEach(link => {
        if (!link.querySelector('span')) return;
        
        // Set text color for navigation items
        link.querySelector('span').style.color = '#1f2937';
        
        // Set icon color
        const icon = link.querySelector('i');
        if (icon) {
            // Special handling for trophy icon - always ensure it's visible with orange color
            if (icon.classList.contains('fa-trophy')) {
                // Use setAttribute to apply !important
                icon.setAttribute('style', 'color: #f97316 !important; visibility: visible !important; opacity: 1 !important; display: inline-block !important;');
                
                // Add the achievement-icon class if it doesn't exist
                if (!icon.classList.contains('achievement-icon')) {
                    icon.classList.add('achievement-icon');
                }
            } else {
                icon.style.color = '#4361ee';
            }
            
            // Ensure all icons are visible
            icon.style.visibility = 'visible';
            icon.style.opacity = '1';
            icon.style.display = 'inline-block';
        }
    });
    
    // Initialize mobile navigation
    initMobileNavigation();
    
    // Initialize dropdowns
    initDropdowns();
    
    // Initialize tooltips
    initTooltips();
}

/**
 * Initialize tooltips
 */
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        if (!tooltipText) return;
        
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            // Position tooltip
            const rect = element.getBoundingClientRect();
            tooltip.style.top = rect.bottom + 10 + 'px';
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            
            // Show tooltip
            setTimeout(() => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
            }, 10);
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    tooltip.remove();
                }, 300);
            }
        });
    });
}

/**
 * Flash navigation items to ensure they're visible
 */
function flashNavItems() {
    const navContainer = document.querySelector('.nav-links');
    
    // Create a flash overlay
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    flash.style.zIndex = '1000';
    flash.style.pointerEvents = 'none';
    
    // Add it to the nav container
    navContainer.style.position = 'relative';
    navContainer.appendChild(flash);
    
    // Flash effect
    setTimeout(() => {
        flash.style.opacity = '0';
        flash.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            flash.remove();
            
            // Apply another visual update to all nav items
            const navItems = document.querySelectorAll('.nav-links li');
            navItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(5px)';
                    setTimeout(() => {
                        item.style.transform = 'translateX(0)';
                        item.style.transition = 'transform 0.3s ease';
                    }, 100);
                }, index * 50);
            });
        }, 600);
    }, 50);
}

/**
 * Force sidebar background to be visible
 */
function fixSidebarBackground() {
    // Force sidebar background
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        // Using both inline style and direct DOM manipulation for maximum compatibility
        sidebar.style.cssText = `
            background-color: white !important;
            border-right: 1px solid #e5e7eb !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
            color: #1f2937 !important;
        `;
        
        // Apply styles to all text within sidebar to ensure visibility
        const allText = sidebar.querySelectorAll('*');
        allText.forEach(element => {
            if (element.textContent.trim().length > 0 && 
                !element.querySelector('img') && 
                (element.childNodes.length === 1 || 
                (element.childNodes.length > 1 && element.childNodes[0].nodeType === 3))) {
                element.style.color = '#1f2937';
                element.style.visibility = 'visible';
                element.style.opacity = '1';
            }
        });
        
        // Ensure all spans in nav links are visible with proper color
        const navSpans = sidebar.querySelectorAll('.nav-links a span');
        navSpans.forEach(span => {
            span.style.cssText = `
                color: #1f2937 !important;
                visibility: visible !important;
                opacity: 1 !important;
                display: inline !important;
                font-weight: 600 !important;
            `;
        });
    }
}

/**
 * Initialize theme toggle functionality
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        updateSidebarForDarkMode(true);
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        updateSidebarForDarkMode(false);
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme, icon;
        
        if (currentTheme === 'dark') {
            newTheme = 'light';
            icon = '<i class="fas fa-sun"></i>';
            updateSidebarForDarkMode(false);
        } else {
            newTheme = 'dark';
            icon = '<i class="fas fa-moon"></i>';
            updateSidebarForDarkMode(true);
        }
        
        // Apply the new theme and save preference
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = icon;
        
        // Add animation effect
        themeToggle.classList.add('pulse');
        setTimeout(() => {
            themeToggle.classList.remove('pulse');
        }, 500);
        
        // Show a toast notification
        showThemeToast(newTheme);
        
        // Update active navigation styles after theme change
        initNavigation();
    });
}

/**
 * Update sidebar appearance for dark mode
 * @param {boolean} isDarkMode - Whether dark mode is enabled
 */
function updateSidebarForDarkMode(isDarkMode) {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    
    const navLinks = document.querySelectorAll('.nav-links li a');
    const userInfo = document.querySelector('.user-info');
    
    if (isDarkMode) {
        // Apply dark mode styles
        sidebar.style.backgroundColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--bg-card').trim();
        sidebar.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.3)';
        
        if (userInfo) {
            userInfo.style.borderTopColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--border-color').trim();
        }
        
        // Update nav links for dark mode
        navLinks.forEach(link => {
            const span = link.querySelector('span');
            const isActive = link.parentElement.classList.contains('active');
            
            if (span) {
                if (isActive) {
                    span.style.color = getComputedStyle(document.documentElement)
                        .getPropertyValue('--primary-color').trim() + ' !important';
                } else {
                    span.style.color = getComputedStyle(document.documentElement)
                        .getPropertyValue('--text-dark').trim() + ' !important';
                }
            }
            
            const icon = link.querySelector('i');
            if (icon) {
                if (isActive) {
                    icon.style.color = getComputedStyle(document.documentElement)
                        .getPropertyValue('--primary-color').trim() + ' !important';
                } else {
                    icon.style.color = getComputedStyle(document.documentElement)
                        .getPropertyValue('--primary-color').trim() + ' !important';
                    
                    // Special handling for trophy icon
                    if (icon.classList.contains('fa-trophy') || 
                        icon.classList.contains('achievement-icon')) {
                        // Use setAttribute to apply !important
                        icon.setAttribute('style', 'color: ' + getComputedStyle(document.documentElement)
                            .getPropertyValue('--warning-color').trim() + ' !important; visibility: visible !important; opacity: 1 !important; display: inline-block !important;');
                    }
                }
            }
            
            // Apply active background color
            if (isActive) {
                link.style.backgroundColor = 'rgba(67, 97, 238, 0.2)';
            }
        });
    } else {
        // Reset to light mode styles
        sidebar.style.backgroundColor = '#ffffff';
        sidebar.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        
        if (userInfo) {
            userInfo.style.borderTopColor = '#e5e7eb';
        }
        
        // Reset nav links for light mode
        navLinks.forEach(link => {
            const span = link.querySelector('span');
            const isActive = link.parentElement.classList.contains('active');
            
            if (span) {
                if (isActive) {
                    span.style.color = '#4361ee'; // Primary color for active
                } else {
                    span.style.color = '#1f2937'; // Default text color
                }
            }
            
            const icon = link.querySelector('i');
            if (icon) {
                if (isActive) {
                    icon.style.color = '#4361ee'; // Primary color for active
                } else {
                    icon.style.color = '#4361ee';
                    
                    // Special handling for trophy icon
                    if (icon.classList.contains('fa-trophy') || 
                        icon.classList.contains('achievement-icon')) {
                        // Use setAttribute to apply !important
                        icon.setAttribute('style', 'color: #f97316 !important; visibility: visible !important; opacity: 1 !important; display: inline-block !important;');
                    }
                }
            }
            
            // Apply active background color
            if (isActive) {
                link.style.backgroundColor = 'rgba(67, 97, 238, 0.1)';
            } else {
                link.style.backgroundColor = '';
            }
        });
    }
}

/**
 * Show a toast notification for theme change
 */
function showThemeToast(theme) {
    // Check if toast container exists
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Create the toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = theme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled';
    
    // Add the icon
    const icon = document.createElement('i');
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    icon.style.marginRight = '10px';
    toast.prepend(icon);
    
    // Add the toast to the container
    toastContainer.appendChild(toast);
    
    // Show the toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove the toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

/**
 * Initialize search bar focus effects
 */
function initSearchBarEffects() {
    const searchBars = document.querySelectorAll('.search-bar');
    
    searchBars.forEach(searchBar => {
        const input = searchBar.querySelector('input');
        const icon = searchBar.querySelector('i');
        
        if (!input || !icon) return;
        
        // Add focus effect
        input.addEventListener('focus', () => {
            searchBar.classList.add('focused');
            icon.classList.add('animated');
        });
        
        // Remove focus effect
        input.addEventListener('blur', () => {
            searchBar.classList.remove('focused');
            icon.classList.remove('animated');
        });
        
        // Add subtle animation to search icon on hover
        searchBar.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotate(-10deg) scale(1.1)';
        });
        
        searchBar.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotate(0) scale(1)';
        });
    });
} 