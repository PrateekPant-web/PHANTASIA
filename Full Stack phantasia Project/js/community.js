// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize create discussion modal
    initDiscussionModal();
    
    // Initialize voting functionality
    initVotingSystem();
    
    // Initialize tag system for question form
    initTagsInput();
    
    // Initialize study group joining functionality
    initStudyGroups();
    
    // Initialize connect buttons for active users
    initConnectButtons();
    
    // Apply animations to elements
    animateElements();
    
    // Initialize question submission
    submitQuestion();
    
    // Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding panel
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-panel`).classList.add('active');
        });
    });
    
    // Question Title Similar Questions
    const questionTitle = document.getElementById('question-title');
    if (questionTitle) {
        questionTitle.addEventListener('input', debounce(function() {
            const value = this.value.trim();
            const similarQuestionsDiv = document.querySelector('.similar-questions');
            
            if (value.length > 10) {
                // Show similar questions with animation
                similarQuestionsDiv.style.display = 'block';
                setTimeout(() => {
                    similarQuestionsDiv.style.opacity = '1';
                }, 10);
            } else {
                // Hide similar questions
                similarQuestionsDiv.style.opacity = '0';
                setTimeout(() => {
                    similarQuestionsDiv.style.display = 'none';
                }, 300);
            }
        }, 500));
    }
    
    // Tag Suggestions
    const tagSuggestions = document.querySelectorAll('.tag-suggestion');
    const tagsInput = document.querySelector('.tags-input input');
    
    tagSuggestions.forEach(tag => {
        tag.addEventListener('click', () => {
            addTag(tag.textContent);
        });
    });
    
    // Add tag when Enter is pressed
    if (tagsInput) {
        tagsInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && tagsInput.value.trim() !== '') {
                e.preventDefault();
                addTag(tagsInput.value.trim());
                tagsInput.value = '';
            }
        });
    }
    
    // Remove tag when × is clicked
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-tag')) {
            e.target.parentElement.remove();
        }
    });
    
    // File Upload Preview
    const fileInput = document.getElementById('question-attachment');
    if (fileInput) {
        fileInput.addEventListener('change', () => {
            const fileInfo = document.querySelector('.file-info');
            const fileCount = fileInput.files.length;
            
            if (fileCount > 0) {
                const fileNames = Array.from(fileInput.files)
                    .map(file => file.name)
                    .join(', ');
                
                fileInfo.innerHTML = `Selected ${fileCount} file${fileCount > 1 ? 's' : ''}: ${fileNames}`;
                fileInfo.style.color = 'var(--primary-color)';
            } else {
                fileInfo.innerHTML = 'Max 5 files (PNG, JPG, PDF - 5MB each)';
                fileInfo.style.color = 'var(--text-muted)';
            }
        });
    }
    
    // Rich Text Editor Functionality
    const editorButtons = document.querySelectorAll('.editor-btn');
    const editorTextarea = document.getElementById('question-details');
    
    if (editorButtons.length && editorTextarea) {
        editorButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.getAttribute('title').toLowerCase();
                formatText(action, editorTextarea);
            });
        });
    }
    
    // Preview Question Button
    const previewButton = document.querySelector('.preview-question');
    if (previewButton) {
        previewButton.addEventListener('click', () => {
            // Show preview in a modal (simplified for this example)
            alert('Preview functionality would show formatted question with Markdown/code highlighting');
        });
    }
    
    // AI Assistant Functionality
    const aiInput = document.querySelector('.ai-input textarea');
    const aiSendButton = document.querySelector('.ai-send');
    const aiMessages = document.querySelector('.ai-messages');
    const aiSuggestions = document.querySelectorAll('.ai-suggestion');
    
    if (aiInput && aiSendButton && aiMessages) {
        // Send message when button is clicked
        aiSendButton.addEventListener('click', () => {
            if (aiInput.value.trim() !== '') {
                sendAIMessage(aiInput.value.trim());
                aiInput.value = '';
            }
        });
        
        // Send message when Enter is pressed (without Shift)
        aiInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (aiInput.value.trim() !== '') {
                    sendAIMessage(aiInput.value.trim());
                    aiInput.value = '';
                }
            }
        });
        
        // Auto-resize textarea as user types
        aiInput.addEventListener('input', () => {
            aiInput.style.height = 'auto';
            aiInput.style.height = (aiInput.scrollHeight) + 'px';
        });
        
        // AI Suggestion Buttons
        aiSuggestions.forEach(suggestion => {
            suggestion.addEventListener('click', () => {
                aiInput.value = suggestion.textContent;
                aiInput.style.height = 'auto';
                aiInput.style.height = (aiInput.scrollHeight) + 'px';
                aiInput.focus();
            });
        });
    }
    
    // Form Submission (prevent default for demo)
    const questionForm = document.querySelector('.question-form');
    if (questionForm) {
        questionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Question submitted successfully!');
        });
        
        // Submit button click handler
        const submitButton = document.querySelector('.submit-question');
        if (submitButton) {
            submitButton.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Question submitted successfully!');
            });
        }
    }
    
    // Initialize dashboard animations
    initDashboardAnimations();
});

/**
 * Initialize the discussion creation modal
 */
function initDiscussionModal() {
    const createDiscussionBtn = document.querySelector('.community-actions .btn-primary');
    const modal = document.getElementById('discussionModal');
    const closeBtn = modal.querySelector('.close-modal');
    const cancelBtn = modal.querySelector('.cancel-discussion');
    const createBtn = modal.querySelector('.create-discussion');
    
    // Show modal when create discussion button is clicked
    createDiscussionBtn.addEventListener('click', function() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close if clicked outside the modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Handle discussion creation
    createBtn.addEventListener('click', function() {
        const title = document.getElementById('discussion-title').value;
        const category = document.getElementById('discussion-category').value;
        const content = document.getElementById('discussion-content').value;
        
        if (!title || !category || !content) {
            showAlert('Please fill all required fields', 'error');
            return;
        }
        
        // Simulate successful creation
        showAlert('Discussion created successfully!', 'success');
        closeModal();
        
        // Reset form
        document.getElementById('discussion-title').value = '';
        document.getElementById('discussion-category').value = '';
        document.getElementById('discussion-content').value = '';
    });
}

/**
 * Initialize voting system for discussions
 */
function initVotingSystem() {
    const voteButtons = document.querySelectorAll('.vote-btn');
    
    voteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const voteCount = this.parentElement.querySelector('.vote-count');
            const currentCount = parseInt(voteCount.textContent);
            const isUpvote = this.innerHTML.includes('fa-chevron-up');
            
            // Check if user has already voted (would be tracked in a real application)
            const hasVoted = false; // This would be a real check in a production app
            
            if (hasVoted) {
                showAlert('You have already voted on this discussion', 'info');
                return;
            }
            
            // Update vote count
            if (isUpvote) {
                voteCount.textContent = currentCount + 1;
                this.style.color = '#4f46e5'; // primary color value
            } else {
                voteCount.textContent = currentCount - 1;
                this.style.color = '#f97316'; // secondary color value
            }
            
            // Simulate sending to server
            console.log(`User ${isUpvote ? 'upvoted' : 'downvoted'} discussion`);
        });
    });
}

/**
 * Initialize tag input system
 */
function initTagsInput() {
    const tagsContainers = document.querySelectorAll('.tags-input');
    
    tagsContainers.forEach(container => {
        const input = container.querySelector('input');
        
        // Add new tag when pressing Enter or comma
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                
                const tagText = this.value.trim();
                if (tagText && !tagExists(container, tagText)) {
                    addTag(container, tagText);
                }
                
                this.value = '';
            }
        });
        
        // Set up remove tag functionality for existing tags
        const removeBtns = container.querySelectorAll('.remove-tag');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                this.parentElement.remove();
            });
        });
    });
    
    // Check if tag already exists
    function tagExists(container, text) {
        const existingTags = container.querySelectorAll('.tag');
        for (let i = 0; i < existingTags.length; i++) {
            if (existingTags[i].textContent.slice(0, -1).toLowerCase() === text.toLowerCase()) {
                return true;
            }
        }
        return false;
    }
    
    // Add a new tag to the container
    function addTag(container, text) {
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.classList.add('no-select');
        tag.textContent = text;
        
        const removeBtn = document.createElement('span');
        removeBtn.className = 'remove-tag';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            tag.remove();
        });
        
        tag.appendChild(removeBtn);
        container.insertBefore(tag, container.querySelector('input'));
    }
}

/**
 * Initialize study group joining functionality
 */
function initStudyGroups() {
    const joinButtons = document.querySelectorAll('.study-group-item .btn-primary');
    
    joinButtons.forEach(button => {
        button.addEventListener('click', function() {
            const groupName = this.parentElement.querySelector('h3').textContent;
            
            // Visual feedback
            this.textContent = 'Joined';
            this.classList.remove('btn-primary');
            this.classList.add('btn-outline');
            
            // Parent element style
            this.parentElement.classList.add('active');
            
            showAlert(`You've joined the "${groupName}" study group!`, 'success');
        });
    });
}

/**
 * Initialize connect buttons for users
 */
function initConnectButtons() {
    const connectButtons = document.querySelectorAll('.user-card-footer .btn-sm:not(.btn-connected)');
    
    connectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userName = this.parentElement.parentElement.querySelector('h3').textContent;
            
            // Visual feedback
            this.textContent = 'Connected';
            this.classList.add('btn-connected');
            
            showAlert(`You are now connected with ${userName}`, 'success');
        });
    });
}

/**
 * Show alert/notification
 * @param {string} message - Alert message
 * @param {string} type - Alert type (success, error, info, warning)
 */
function showAlert(message, type = 'info') {
    // Create alert container if it doesn't exist
    let alertContainer = document.querySelector('.alert-container');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.className = 'alert-container';
        document.body.appendChild(alertContainer);
        
        // Style alert container
        Object.assign(alertContainer.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: '1000',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        });
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-icon">
            <i class="fas ${getIconForType(type)}"></i>
        </div>
        <div class="alert-content">${message}</div>
        <button class="alert-close">&times;</button>
    `;
    
    // Style alert
    Object.assign(alert.style, {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 16px',
        backgroundColor: 'white',
        borderRadius: '6px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '350px',
        opacity: '0',
        transform: 'translateY(-20px)',
        transition: 'all 0.3s ease',
        borderLeft: `4px solid ${getColorForType(type)}`
    });
    
    // Style alert icon
    const alertIcon = alert.querySelector('.alert-icon');
    Object.assign(alertIcon.style, {
        color: getColorForType(type),
        fontSize: '1.25rem'
    });
    
    // Style alert content
    const alertContent = alert.querySelector('.alert-content');
    Object.assign(alertContent.style, {
        flex: '1',
        fontSize: '0.875rem',
        color: '#1e293b'
    });
    
    // Style close button
    const closeButton = alert.querySelector('.alert-close');
    Object.assign(closeButton.style, {
        background: 'none',
        border: 'none',
        fontSize: '1.25rem',
        cursor: 'pointer',
        color: '#94a3b8',
        padding: '0'
    });
    
    // Add alert to container
    alertContainer.appendChild(alert);
    
    // Trigger animation
    setTimeout(() => {
        alert.style.opacity = '1';
        alert.style.transform = 'translateY(0)';
    }, 10);
    
    // Close button click event
    closeButton.addEventListener('click', function() {
        closeAlert(alert);
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        closeAlert(alert);
    }, 5000);
    
    // Helper functions
    function getIconForType(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            case 'info':
            default: return 'fa-info-circle';
        }
    }
    
    function getColorForType(type) {
        switch (type) {
            case 'success': return '#10b981';
            case 'error': return '#ef4444';
            case 'warning': return '#f59e0b';
            case 'info':
            default: return '#3b82f6';
        }
    }
    
    function closeAlert(alertEl) {
        alertEl.style.opacity = '0';
        alertEl.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            alertEl.remove();
            
            // Remove container if no alerts left
            if (alertContainer.children.length === 0) {
                alertContainer.remove();
            }
        }, 300);
    }
}

/**
 * Apply animations to elements
 */
function animateElements() {
    // Animate discussion items with staggered delay
    const discussionItems = document.querySelectorAll('.discussion-item');
    discussionItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            // Trigger repaint
            item.getBoundingClientRect();
            
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Animate study group items
    const studyGroups = document.querySelectorAll('.study-group-item');
    studyGroups.forEach((group, index) => {
        setTimeout(() => {
            group.style.opacity = '0';
            group.style.transform = 'translateX(-20px)';
            group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            // Trigger repaint
            group.getBoundingClientRect();
            
            group.style.opacity = '1';
            group.style.transform = 'translateX(0)';
        }, 300 + (index * 100));
    });
    
    // Animate user cards
    const userCards = document.querySelectorAll('.user-card');
    userCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            // Trigger repaint
            card.getBoundingClientRect();
            
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, 500 + (index * 100));
    });
}

/**
 * Submit a question to the community
 */
function submitQuestion() {
    document.querySelector('.submit-question').addEventListener('click', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('question-title').value;
        const category = document.getElementById('question-category').value;
        const details = document.getElementById('question-details').value;
        
        if (!title || !category || !details) {
            showAlert('Please fill all required fields', 'error');
            return;
        }
        
        // Get all tags
        const tagsContainer = document.querySelector('.question-form .tags-input');
        const tags = Array.from(tagsContainer.querySelectorAll('.tag')).map(tag => 
            tag.textContent.slice(0, -1)
        );
        
        // Simulate successful question post
        showAlert('Your question has been posted successfully!', 'success');
        
        // In a real application, we would send this data to the server
        console.log({
            title,
            category,
            details,
            tags
        });
        
        // Reset form
        document.getElementById('question-title').value = '';
        document.getElementById('question-category').value = '';
        document.getElementById('question-details').value = '';
        
        // Remove all tags except the input
        const tagElements = tagsContainer.querySelectorAll('.tag');
        tagElements.forEach(tag => tag.remove());
    });
}

// Helper Functions

// Add tag to the tags input
function addTag(tagText) {
    const tagsInput = document.querySelector('.tags-input');
    const input = document.querySelector('.tags-input input');
    
    // Check if tag already exists
    const existingTags = document.querySelectorAll('.tag');
    for (let tag of existingTags) {
        if (tag.textContent.replace('×', '').trim() === tagText) {
            // Highlight existing tag briefly
            tag.style.transform = 'scale(1.1)';
            setTimeout(() => {
                tag.style.transform = 'scale(1)';
            }, 300);
            return;
        }
    }
    
    // Determine tag category
    let tagClass = '';
    const lowerTagText = tagText.toLowerCase();
    if (lowerTagText.includes('javascript') || lowerTagText.includes('js')) {
        tagClass = 'javascript';
    } else if (lowerTagText.includes('react') || lowerTagText.includes('vue') || lowerTagText.includes('angular')) {
        tagClass = 'react';
    } else if (lowerTagText.includes('html') || lowerTagText.includes('css')) {
        tagClass = 'html-css';
    } else if (lowerTagText.includes('node') || lowerTagText.includes('express') || lowerTagText.includes('server')) {
        tagClass = 'backend';
    }
    
    // Create and insert tag before the input
    const tag = document.createElement('div');
    tag.className = `tag ${tagClass}`;
    tag.innerHTML = `${tagText}<span class="remove-tag">×</span>`;
    tagsInput.insertBefore(tag, input);
}

// Format text in the editor
function formatText(action, textarea) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let formattedText = '';
    
    switch (action) {
        case 'bold':
            formattedText = `**${selectedText}**`;
            break;
        case 'italic':
            formattedText = `*${selectedText}*`;
            break;
        case 'code':
            formattedText = '`' + selectedText + '`';
            break;
        case 'link':
            formattedText = `[${selectedText}](url)`;
            break;
        case 'image':
            formattedText = `![alt text](image-url)`;
            break;
        case 'code block':
            formattedText = `\`\`\`\n${selectedText}\n\`\`\``;
            break;
        default:
            formattedText = selectedText;
    }
    
    // Insert the formatted text
    textarea.focus();
    const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    textarea.value = newValue;
    
    // Set selection to the end of the inserted text
    const newCursorPos = start + formattedText.length;
    textarea.setSelectionRange(newCursorPos, newCursorPos);
}

// Send a message to the AI assistant
function sendAIMessage(message) {
    const aiMessages = document.querySelector('.ai-messages');
    
    // Add user message
    const userMessageHTML = `
        <div class="ai-message user-message">
            <div class="ai-bubble user-bubble">
                <p>${escapeHTML(message)}</p>
            </div>
            <div class="ai-avatar user-avatar">
                <i class="fas fa-user"></i>
            </div>
        </div>
    `;
    aiMessages.innerHTML += userMessageHTML;
    
    // Scroll to bottom
    aiMessages.scrollTop = aiMessages.scrollHeight;
    
    // Simulate AI thinking
    setTimeout(() => {
        // Add AI response
        const aiResponseHTML = `
            <div class="ai-message">
                <div class="ai-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="ai-bubble">
                    <p>${getAIResponse(message)}</p>
                </div>
            </div>
        `;
        aiMessages.innerHTML += aiResponseHTML;
        
        // Scroll to bottom again
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }, 1000);
}

// Escape HTML to prevent XSS
function escapeHTML(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Get AI response based on user query
function getAIResponse(query) {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('usestate') && lowerQuery.includes('react')) {
        return "useState is a React Hook that lets you add state to functional components. It returns a stateful value and a function to update it. For example: <br><code>const [count, setCount] = useState(0);</code><br>You can learn more in the React documentation.";
    } else if ((lowerQuery.includes('center') && lowerQuery.includes('div')) || (lowerQuery.includes('center') && lowerQuery.includes('css'))) {
        return "To center a div with CSS, you can use flexbox:<br><code>display: flex;<br>justify-content: center;<br>align-items: center;</code><br>Or with Grid:<br><code>display: grid;<br>place-items: center;</code><br>Or with position:<br><code>position: absolute;<br>top: 50%;<br>left: 50%;<br>transform: translate(-50%, -50%);</code>";
    } else if (lowerQuery.includes('async') && lowerQuery.includes('await')) {
        return "async/await is a way to handle promises in JavaScript. An async function returns a promise, and await pauses execution until a promise is resolved.<br><code>async function fetchData() {<br>  try {<br>    const response = await fetch(url);<br>    const data = await response.json();<br>    return data;<br>  } catch (error) {<br>    console.error(error);<br>  }<br>}</code>";
    } else {
        return "I don't have a specific answer for that question. To get the best response, you might want to post this as a question to the community. Our experts can provide detailed answers to your specific question.";
    }
}

// Debounce function to limit how often a function is called
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize dashboard animations
function initDashboardAnimations() {
    // Animate numbers (vote counts, member counts, etc.)
    animateCounters();
    
    // Add scroll reveal for dashboard cards if they're not in viewport initially
    observeElements('.dashboard-card', handleDashboardReveal);
    
    // Add hover sound effect to important buttons
    addButtonSoundEffects();
    
    // Add interaction to discussion cards
    addDiscussionInteraction();
    
    // Add sparkle effect to hot discussions
    addSparkleEffect();
}

// Animate all counter elements
function animateCounters() {
    // Animate vote counts
    document.querySelectorAll('.vote-count').forEach(counter => {
        const target = parseInt(counter.textContent, 10);
        animateCounter(counter, 0, target, 1500);
    });
    
    // Animate member counts in study groups
    document.querySelectorAll('.group-meta span:first-child').forEach(span => {
        const text = span.textContent;
        const match = text.match(/(\d+)/);
        if (match) {
            const target = parseInt(match[0], 10);
            span.innerHTML = span.innerHTML.replace(target, `<span class="counter-num">0</span>`);
            const countElement = span.querySelector('.counter-num');
            animateCounter(countElement, 0, target, 2000);
        }
    });
    
    // Animate event attendees
    document.querySelectorAll('.event-meta span:last-child').forEach(span => {
        const text = span.textContent;
        const match = text.match(/(\d+)/);
        if (match) {
            const target = parseInt(match[0], 10);
            span.innerHTML = span.innerHTML.replace(target, `<span class="counter-num">0</span>`);
            const countElement = span.querySelector('.counter-num');
            animateCounter(countElement, 0, target, 2000);
        }
    });
    
    // Animate stats in the Ask Community section
    document.querySelectorAll('.question-stats span').forEach(span => {
        const text = span.textContent;
        const match = text.match(/(\d+\.?\d*)/);
        if (match) {
            const target = parseFloat(match[0]);
            span.innerHTML = span.innerHTML.replace(match[0], `<span class="counter-num">0</span>`);
            const countElement = span.querySelector('.counter-num');
            animateCounter(countElement, 0, target, 1500, target % 1 !== 0);
        }
    });
}

// Animate a counter from start to target
function animateCounter(element, start, target, duration, isDecimal = false) {
    const range = target - start;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(() => {
        current += 1;
        if (isDecimal) {
            element.textContent = current / 10;
        } else {
            element.textContent = current;
        }
        
        if (current >= target) {
            clearInterval(timer);
            element.textContent = target;
        }
    }, stepTime);
}

// Intersection Observer for revealing elements on scroll
function observeElements(selector, callback) {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0 || !('IntersectionObserver' in window)) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Handle dashboard card reveal animations
function handleDashboardReveal(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
}

// Add subtle sound effects to buttons
function addButtonSoundEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-sm, .vote-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Create subtle hover sound (optional, can be uncommented if audio available)
            // playSound('hover-sound.mp3', 0.1);
        });
        
        button.addEventListener('click', () => {
            // Create subtle click sound (optional, can be uncommented if audio available)
            // playSound('click-sound.mp3', 0.2);
            
            // Add ripple effect
            createRipple(button);
        });
    });
}

// Create ripple effect on button click
function createRipple(button) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add discussion item interactions
function addDiscussionInteraction() {
    const discussionItems = document.querySelectorAll('.discussion-item');
    
    discussionItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const title = item.querySelector('.discussion-title');
            if (title) {
                title.style.color = 'var(--primary-color)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const title = item.querySelector('.discussion-title');
            if (title) {
                title.style.color = '';
            }
        });
    });
}

// Add sparkle effect to hot discussions
function addSparkleEffect() {
    const hotDiscussions = document.querySelectorAll('.discussion-item.hot');
    
    hotDiscussions.forEach(discussion => {
        setInterval(() => {
            createSparkle(discussion);
        }, 300);
    });
}

// Create a single sparkle element
function createSparkle(parent) {
    const sparkle = document.createElement('span');
    sparkle.classList.add('sparkle');
    
    // Random position within the element
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    
    sparkle.style.top = `${top}%`;
    sparkle.style.left = `${left}%`;
    
    parent.appendChild(sparkle);
    
    // Remove after animation completes
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
} 