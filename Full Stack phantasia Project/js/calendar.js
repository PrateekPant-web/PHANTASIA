document.addEventListener('DOMContentLoaded', function() {
    // Initialize calendar
    initCalendar();
    
    // Initialize event interactions
    initEventInteractions();
    
    // Initialize add event functionality
    initAddEvent();
    
    // Update current time indicator
    updateCurrentTimeIndicator();
    
    // Update the current time indicator every minute
    setInterval(updateCurrentTimeIndicator, 60000);
    
    initCalendarAnimations();
    initCalendarInteractions();
    initDynamicTimeIndicator();
    setupEventInteractions();
    setupModalHandling();
    createDayCells(); // Create individual day cells for better interaction
});

// Initialize calendar functions
function initCalendar() {
    // View switching
    const viewButtons = document.querySelectorAll('.view-btn');
    const calendarView = document.querySelector('.calendar-view');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get view type
            const viewType = button.dataset.view;
            
            // This would normally switch between different view types
            // For demo purposes, we're just showing a message
            console.log(`Switching to ${viewType} view`);
            
            // Show a toast notification
            showToast(`${viewType.charAt(0).toUpperCase() + viewType.slice(1)} view selected`);
        });
    });
    
    // Month navigation
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    const currentMonthEl = document.querySelector('.current-month');
    
    let currentDate = new Date();
    
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendarHeader();
        showToast('Previous month loaded');
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendarHeader();
        showToast('Next month loaded');
    });
    
    function updateCalendarHeader() {
        const options = { month: 'long', year: 'numeric' };
        currentMonthEl.textContent = currentDate.toLocaleDateString('en-US', options);
    }
}

// Initialize interactions with calendar events
function initEventInteractions() {
    const calendarEvents = document.querySelectorAll('.calendar-event');
    
    calendarEvents.forEach(event => {
        // Event click
        event.addEventListener('click', () => {
            const eventTitle = event.querySelector('.event-title').textContent;
            const eventTime = event.querySelector('.event-time').textContent;
            
            // In a full implementation, this would open an event details modal
            // For demo purposes, we're just showing a toast
            showToast(`Event: ${eventTitle}, ${eventTime}`);
        });
        
        // Event hover effect
        event.addEventListener('mouseenter', () => {
            // Find matching events in the sidebar
            const eventTitle = event.querySelector('.event-title').textContent;
            const upcomingEvents = document.querySelectorAll('.event-item');
            
            upcomingEvents.forEach(upcomingEvent => {
                if (upcomingEvent.querySelector('h4').textContent === eventTitle) {
                    upcomingEvent.classList.add('highlighted');
                }
            });
        });
        
        event.addEventListener('mouseleave', () => {
            document.querySelectorAll('.event-item.highlighted').forEach(item => {
                item.classList.remove('highlighted');
            });
        });
    });
    
    // Upcoming events interactions
    const upcomingEvents = document.querySelectorAll('.event-item');
    
    upcomingEvents.forEach(item => {
        item.addEventListener('click', () => {
            const eventTitle = item.querySelector('h4').textContent;
            
            // Find matching calendar event and scroll to it
            const calendarEvents = document.querySelectorAll('.calendar-event');
            let matchingEvent = null;
            
            calendarEvents.forEach(event => {
                if (event.querySelector('.event-title').textContent === eventTitle) {
                    matchingEvent = event;
                }
            });
            
            if (matchingEvent) {
                // Scroll the event into view
                matchingEvent.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Highlight the event
                matchingEvent.classList.add('pulse');
                setTimeout(() => {
                    matchingEvent.classList.remove('pulse');
                }, 1000);
            }
        });
    });
}

// Initialize add event functionality
function initAddEvent() {
    const addEventBtn = document.querySelector('.add-event-btn');
    const modal = document.getElementById('addEventModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const eventForm = document.getElementById('eventForm');
    
    // Show modal when Add Event button is clicked
    addEventBtn.addEventListener('click', () => {
        modal.classList.add('show');
        
        // Set default date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('eventDate').value = today;
    });
    
    // Close modal functions
    function closeModal() {
        modal.classList.remove('show');
    }
    
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Form submission
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;
        const type = document.getElementById('eventType').value;
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value || startTime;
        const details = document.getElementById('eventDetails').value;
        const location = document.getElementById('eventLocation').value;
        const reminder = document.getElementById('remindMe').checked;
        
        // In a full implementation, this would save the event to a database
        // For demo purposes, we're just showing a toast notification
        showToast(`Event "${title}" created successfully!`);
        
        // Log the event data
        console.log({title, date, type, startTime, endTime, details, location, reminder});
        
        // Close the modal
        closeModal();
        
        // Reset form
        eventForm.reset();
    });
}

// Update current time indicator
function updateCurrentTimeIndicator() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // Calculate position based on current time
    // Each hour is 60px in our grid
    const topPosition = (hours * 60) + Math.floor(minutes * (60/60));
    
    const indicator = document.querySelector('.current-time-indicator');
    if (indicator) {
        indicator.style.top = `${topPosition}px`;
    }
}

// Show toast notification
function showToast(message) {
    // Check if toast container exists, if not create it
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
        
        // Add styles if not already defined in CSS
        if (!document.querySelector('style.toast-styles')) {
            const style = document.createElement('style');
            style.className = 'toast-styles';
            style.textContent = `
                .toast-container {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 9999;
                }
                
                .toast {
                    background-color: var(--primary-color);
                    color: white;
                    padding: 12px 20px;
                    border-radius: var(--radius-sm);
                    margin-top: 10px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                    opacity: 0;
                    transform: translateY(20px);
                }
                
                .toast.show {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .highlighted {
                    box-shadow: 0 0 0 2px var(--primary-color);
                    transform: translateY(-3px);
                }
                
                .pulse {
                    animation: pulse 1s;
                    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.3);
                }
                
                @keyframes pulse {
                    0% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(67, 97, 238, 0.5);
                    }
                    
                    70% {
                        transform: scale(1.05);
                        box-shadow: 0 0 0 10px rgba(67, 97, 238, 0);
                    }
                    
                    100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(67, 97, 238, 0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Initialize animations for calendar elements
function initCalendarAnimations() {
    // Add entrance animations to calendar sections
    animateElement('.calendar-header', 'slideInUp', 0);
    animateElement('.calendar-controls', 'slideInUp', 100);
    animateElement('.calendar-view', 'slideInLeft', 200);
    animateElement('.upcoming-events', 'slideInRight', 300);
    
    // Animate the current date indicator
    const currentDayElement = document.querySelector('.day-number.current-day');
    if (currentDayElement) {
        currentDayElement.classList.add('pulse-animation');
    }
    
    // Add staggered animations to calendar events
    const events = document.querySelectorAll('.calendar-event');
    events.forEach((event, index) => {
        setTimeout(() => {
            event.style.opacity = '1';
            event.style.transform = 'translateX(0)';
        }, 100 * (index + 1));
    });
}

// Initialize interactive behavior for calendar elements
function initCalendarInteractions() {
    // View buttons interactions
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            viewButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Visual feedback
            addRippleEffect(this);
            
            // Update view (placeholder for actual view change)
            const viewType = this.getAttribute('data-view');
            console.log(`Changing to ${viewType} view`);
            // Implement view change logic here
        });
    });
    
    // Month navigation
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    const currentMonthElement = document.querySelector('.current-month');
    
    if (prevMonthBtn && nextMonthBtn && currentMonthElement) {
        prevMonthBtn.addEventListener('click', function() {
            addRippleEffect(this);
            changeMonth(-1, currentMonthElement);
        });
        
        nextMonthBtn.addEventListener('click', function() {
            addRippleEffect(this);
            changeMonth(1, currentMonthElement);
        });
    }
    
    // Hover effects for days
    const dayColumns = document.querySelectorAll('.day-column');
    dayColumns.forEach(column => {
        column.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(67, 97, 238, 0.03)';
        });
        
        column.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Add click handlers for day columns - now we'll make it only apply to column header
    const dayColumnHeaders = document.querySelectorAll('.week-header .day-column');
    dayColumnHeaders.forEach((header, index) => {
        header.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Extract date information
            const dayName = header.querySelector('.day-name').textContent;
            const dayNumber = header.querySelector('.day-number').textContent;
            
            // Show toast with day information
            showToast(`Selected day: ${dayName} ${dayNumber}`);
            
            // Add a visual feedback without selecting text
            const pulse = document.createElement('div');
            pulse.className = 'day-pulse';
            pulse.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                width: 40px;
                height: 40px;
                background-color: rgba(67, 97, 238, 0.2);
                border-radius: 50%;
                z-index: 5;
                animation: dayPulse 0.5s forwards;
            `;
            header.appendChild(pulse);
            
            // Remove the pulse element after animation completes
            setTimeout(() => {
                pulse.remove();
            }, 500);
        });
    });
}

// Set up dynamic time indicator that updates position
function initDynamicTimeIndicator() {
    // Get time indicator element
    const timeIndicator = document.querySelector('.current-time-indicator');
    if (!timeIndicator) return;
    
    // Update the position based on current time
    updateTimeIndicator(timeIndicator);
    
    // Update time indicator position every minute
    setInterval(() => {
        updateTimeIndicator(timeIndicator);
    }, 60000); // 60000ms = 1 minute
}

// Update time indicator position based on current time
function updateTimeIndicator(indicator) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // Calculate position based on 8am to 8pm time range (12 hours)
    // Each hour is 60px in height
    const startHour = 8; // 8am
    const hourHeight = 60; // 60px per hour
    
    let topPosition = ((hours - startHour) * hourHeight) + ((minutes / 60) * hourHeight);
    
    // Ensure indicator stays within the visible grid
    if (topPosition < 0) topPosition = 0;
    if (topPosition > 12 * hourHeight) topPosition = 12 * hourHeight;
    
    // Update position
    indicator.style.top = `${topPosition}px`;
    
    // Add subtle animation to draw attention
    indicator.classList.add('pulse');
    setTimeout(() => {
        indicator.classList.remove('pulse');
    }, 1000);
}

// Set up interactions for calendar events
function setupEventInteractions() {
    const events = document.querySelectorAll('.calendar-event');
    events.forEach(event => {
        // Add click handler to open event details
        event.addEventListener('click', function() {
            // Get event details for modal
            const title = this.querySelector('.event-title').textContent;
            const time = this.querySelector('.event-time').textContent;
            
            // Open modal with event details
            openEventModal(title, time, this.classList[1]);
        });
        
        // Add hover effects
        event.addEventListener('mouseenter', function() {
            this.style.zIndex = '100';
        });
        
        event.addEventListener('mouseleave', function() {
            setTimeout(() => {
                this.style.zIndex = '1';
            }, 300);
        });
    });
    
    // Add event button interaction
    const addEventBtn = document.querySelector('.add-event-btn');
    if (addEventBtn) {
        addEventBtn.addEventListener('click', function() {
            openAddEventModal();
            addRippleEffect(this);
        });
    }
}

// Modal handling functions
function setupModalHandling() {
    // Close modal when clicking the 'x' button or outside the modal
    document.addEventListener('click', function(event) {
        if (event.target.matches('.close-modal') || event.target.matches('.modal')) {
            closeModal();
        }
    });
    
    // Prevent clicks inside modal from closing it
    const modalContent = document.querySelectorAll('.modal-content');
    modalContent.forEach(content => {
        content.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
}

// Open event details modal
function openEventModal(title, time, eventType) {
    const modal = document.querySelector('.modal');
    if (!modal) return;
    
    // Set modal content
    const modalTitle = modal.querySelector('.modal-header h3');
    if (modalTitle) modalTitle.textContent = title;
    
    // Display event details
    const modalBody = modal.querySelector('.modal-body');
    if (modalBody) {
        modalBody.innerHTML = `
            <p><i class="far fa-clock"></i> ${time}</p>
            <p><i class="fas fa-tag"></i> ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}</p>
            <!-- Add more event details here as needed -->
        `;
    }
    
    // Show modal
    modal.classList.add('show');
    
    // Add entrance animation
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.animation = 'modalFadeIn 0.3s forwards';
    }
}

// Open add event modal
function openAddEventModal() {
    const modal = document.querySelector('.modal');
    if (!modal) return;
    
    // Set modal content for adding new event
    const modalTitle = modal.querySelector('.modal-header h3');
    if (modalTitle) modalTitle.textContent = 'Add New Event';
    
    // Display event form
    const modalBody = modal.querySelector('.modal-body');
    if (modalBody) {
        modalBody.innerHTML = `
            <form id="add-event-form">
                <div class="form-group">
                    <label for="event-title">Event Title</label>
                    <input type="text" id="event-title" placeholder="Enter event title">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="event-date">Date</label>
                        <input type="date" id="event-date">
                    </div>
                    <div class="form-group">
                        <label for="event-time">Time</label>
                        <input type="time" id="event-time">
                    </div>
                </div>
                <div class="form-group">
                    <label for="event-type">Event Type</label>
                    <select id="event-type">
                        <option value="lecture">Lecture</option>
                        <option value="lab">Lab</option>
                        <option value="assignment">Assignment</option>
                        <option value="deadline">Deadline</option>
                        <option value="study-group">Study Group</option>
                        <option value="workshop">Workshop</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="event-details">Details (Optional)</label>
                    <textarea id="event-details" placeholder="Add event details"></textarea>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn-primary">Add Event</button>
                    <button type="button" class="btn-secondary close-modal">Cancel</button>
                </div>
            </form>
        `;
        
        // Add form submission handler
        const form = modalBody.querySelector('#add-event-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // Here you would handle the form submission
                // For now, just close the modal
                closeModal();
                showToast('Event added successfully!');
            });
        }
    }
    
    // Show modal
    modal.classList.add('show');
    
    // Add entrance animation
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.animation = 'modalFadeIn 0.3s forwards';
    }
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (!modal) return;
    
    // Add exit animation
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.animation = 'modalFadeOut 0.3s forwards';
        
        // Remove show class after animation completes
        setTimeout(() => {
            modal.classList.remove('show');
        }, 300);
    } else {
        modal.classList.remove('show');
    }
}

// Add ripple effect to buttons
function addRippleEffect(button) {
    // Remove any existing ripples
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    button.appendChild(ripple);
    
    // Set size and position
    const size = Math.max(button.offsetWidth, button.offsetHeight);
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    
    // Position ripple relative to click position
    const rect = button.getBoundingClientRect();
    ripple.style.left = -10 + 'px';
    ripple.style.top = -10 + 'px';
    
    // Remove ripple after animation completes
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Helper function to animate elements
function animateElement(selector, animationClass, delay) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    setTimeout(() => {
        element.classList.add(animationClass);
    }, delay);
}

// Change month displayed in calendar
function changeMonth(direction, monthElement) {
    // Get current month
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Parse current month and year
    const current = monthElement.textContent.split(' ');
    let monthIndex = months.indexOf(current[0]);
    let year = parseInt(current[1]);
    
    // Calculate new month
    monthIndex += direction;
    
    // Handle year change
    if (monthIndex > 11) {
        monthIndex = 0;
        year++;
    } else if (monthIndex < 0) {
        monthIndex = 11;
        year--;
    }
    
    // Update display with animation
    monthElement.style.opacity = '0';
    monthElement.style.transform = direction > 0 ? 'translateX(-20px)' : 'translateX(20px)';
    
    setTimeout(() => {
        monthElement.textContent = `${months[monthIndex]} ${year}`;
        monthElement.style.opacity = '1';
        monthElement.style.transform = 'translateX(0)';
    }, 200);
    
    // Here you would update the calendar view based on the new month
    // For this demo, we'll just pretend it's updated
}

/**
 * Create individual day cells for each day column to improve click interaction
 */
function createDayCells() {
    // Get all day columns in the week grid
    const dayColumns = document.querySelectorAll('.week-grid .day-column');
    
    // For each day column, create 12 hour cells (assuming 12 hour day view)
    dayColumns.forEach(column => {
        // Clear any existing content first (except events)
        const events = column.querySelectorAll('.calendar-event');
        const eventsArray = Array.from(events);
        column.innerHTML = '';
        
        // Add events back
        eventsArray.forEach(event => column.appendChild(event));
        
        // Create 12 individual cells for each hour
        for (let i = 0; i < 12; i++) {
            const cell = document.createElement('div');
            cell.className = 'day-cell';
            cell.dataset.hour = i + 8; // Assuming 8AM start time
            
            // Add click handler for just this cell
            cell.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent click from bubbling to column
                
                // Get the day and hour information
                const dayIndex = Array.from(dayColumns).indexOf(column);
                const hour = cell.dataset.hour;
                
                // Show toast with information about clicked cell
                showToast(`Selected time slot: Day ${dayIndex + 1}, ${hour}:00`);
                
                // Briefly highlight the clicked cell
                cell.classList.add('cell-clicked');
                setTimeout(() => {
                    cell.classList.remove('cell-clicked');
                }, 300);
            });
            
            column.appendChild(cell);
        }
    });
}

/**
 * Helper function to add CSS keyframes for the day pulse animation
 */
function addDayPulseAnimation() {
    // Create a style element if it doesn't exist
    let style = document.getElementById('calendar-dynamic-styles');
    if (!style) {
        style = document.createElement('style');
        style.id = 'calendar-dynamic-styles';
        document.head.appendChild(style);
    }
    
    // Add the keyframes for the day pulse animation
    const css = `
        @keyframes dayPulse {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        
        .cell-clicked {
            background-color: rgba(67, 97, 238, 0.1) !important;
            transition: background-color 0.3s ease;
        }
    `;
    
    style.innerHTML = css;
}

// Call this function during initialization
document.addEventListener('DOMContentLoaded', function() {
    addDayPulseAnimation();
}); 