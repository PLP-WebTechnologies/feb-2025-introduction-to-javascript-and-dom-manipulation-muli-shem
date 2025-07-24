// JavaScript DOM Manipulation Assignment
// This file demonstrates dynamic text changes, style modifications, and element management

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    initializeEventListeners();
    setupInteractiveFeatures();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Text content manipulation
    document.getElementById('change-text-btn').addEventListener('click', changeTextContent);
    document.getElementById('reset-text-btn').addEventListener('click', resetTextContent);
    
    // CSS style manipulation
    document.getElementById('change-color-btn').addEventListener('click', changeBoxColors);
    document.getElementById('change-size-btn').addEventListener('click', toggleBoxSize);
    document.getElementById('change-border-btn').addEventListener('click', changeBorder);
    document.getElementById('reset-styles-btn').addEventListener('click', resetStyles);
    
    // Element addition/removal
    document.getElementById('add-element-btn').addEventListener('click', addListElement);
    document.getElementById('clear-all-btn').addEventListener('click', clearAllElements);
    document.getElementById('count-items-btn').addEventListener('click', countItems);
    
    // Interactive features
    document.getElementById('toggle-visibility-btn').addEventListener('click', toggleCardVisibility);
    
    // Form handling
    document.getElementById('demo-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('clear-form-btn').addEventListener('click', clearForm);
    
    // Input enter key handling
    document.getElementById('new-item-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addListElement();
        }
    });
}

// 1. DYNAMIC TEXT CONTENT CHANGES
const textMessages = [
    "🎉 Text changed successfully using JavaScript!",
    "🚀 DOM manipulation is powerful!",
    "✨ This demonstrates dynamic content updates!",
    "🎯 JavaScript makes web pages interactive!",
    "💡 You can change any text content dynamically!",
    "🌟 This is the magic of DOM manipulation!"
];

let currentTextIndex = 0;

function changeTextContent() {
    const textElement = document.getElementById('dynamic-text');
    const newText = textMessages[currentTextIndex % textMessages.length];
    
    // Add animation effect
    textElement.style.opacity = '0';
    textElement.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        textElement.textContent = newText;
        textElement.style.opacity = '1';
        textElement.style.transform = 'translateY(0)';
        textElement.style.background = getRandomColor();
        textElement.style.color = getContrastColor(textElement.style.background);
    }, 300);
    
    currentTextIndex++;
}

function resetTextContent() {
    const textElement = document.getElementById('dynamic-text');
    textElement.textContent = "This text will change when you click the button below!";
    textElement.style.background = '#ecf0f1';
    textElement.style.color = '#333';
    textElement.style.opacity = '1';
    textElement.style.transform = 'translateY(0)';
    currentTextIndex = 0;
}

// 2. CSS STYLE MODIFICATIONS VIA JAVASCRIPT
const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#34495e'];
const borderStyles = ['solid', 'dashed', 'dotted', 'double'];
let isBoxEnlarged = false;

function changeBoxColors() {
    const styleBox = document.getElementById('style-box');
    const bgColor = colors[Math.floor(Math.random() * colors.length)];
    const textColor = getContrastColor(bgColor);
    
    // Apply new styles with smooth transition
    styleBox.style.background = `linear-gradient(45deg, ${bgColor}, ${adjustColor(bgColor, 30)})`;
    styleBox.style.color = textColor;
    styleBox.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
        styleBox.style.transform = 'scale(1)';
    }, 200);
    
    // Update content to reflect change
    const paragraphs = styleBox.querySelectorAll('p');
    paragraphs[0].textContent = `Background color changed to ${bgColor}!`;
    paragraphs[1].textContent = `Text color automatically adjusted for contrast!`;
}

function toggleBoxSize() {
    const styleBox = document.getElementById('style-box');
    
    if (!isBoxEnlarged) {
        styleBox.style.padding = '50px';
        styleBox.style.fontSize = '1.3em';
        styleBox.style.borderRadius = '20px';
        isBoxEnlarged = true;
    } else {
        styleBox.style.padding = '30px';
        styleBox.style.fontSize = '1em';
        styleBox.style.borderRadius = '10px';
        isBoxEnlarged = false;
    }
}

function changeBorder() {
    const styleBox = document.getElementById('style-box');
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomStyle = borderStyles[Math.floor(Math.random() * borderStyles.length)];
    const randomWidth = Math.floor(Math.random() * 8) + 2;
    
    styleBox.style.border = `${randomWidth}px ${randomStyle} ${randomColor}`;
    styleBox.style.boxShadow = `0 0 20px ${randomColor}40`;
}

function resetStyles() {
    const styleBox = document.getElementById('style-box');
    styleBox.style.background = '#ecf0f1';
    styleBox.style.color = '#333';
    styleBox.style.padding = '30px';
    styleBox.style.fontSize = '1.1em';
    styleBox.style.border = '2px solid #bdc3c7';
    styleBox.style.borderRadius = '10px';
    styleBox.style.boxShadow = 'none';
    styleBox.style.transform = 'scale(1)';
    isBoxEnlarged = false;
    
    const paragraphs = styleBox.querySelectorAll('p');
    paragraphs[0].textContent = 'This box will change styles dynamically!';
    paragraphs[1].textContent = 'Click the buttons below to see the magic happen.';
}

// 3. ELEMENT ADDITION AND REMOVAL
let itemCounter = 3; // Starting with 3 initial items

function addListElement() {
    const input = document.getElementById('new-item-input');
    const list = document.getElementById('dynamic-list');
    const itemText = input.value.trim();
    
    if (itemText === '') {
        alert('Please enter some text for the new item!');
        input.focus();
        return;
    }
    
    // Create new list item
    const newItem = document.createElement('li');
    newItem.innerHTML = `
        ${itemText} 
        <button class="remove-btn" onclick="removeListItem(this)">×</button>
    `;
    
    // Add with animation
    newItem.style.opacity = '0';
    newItem.style.transform = 'translateX(-50px)';
    list.appendChild(newItem);
    
    // Animate in
    setTimeout(() => {
        newItem.style.opacity = '1';
        newItem.style.transform = 'translateX(0)';
    }, 100);
    
    // Clear input and increment counter
    input.value = '';
    itemCounter++;
    updateItemCounter();
    
    // Add success feedback
    showTemporaryMessage('Item added successfully! ✅');
}

function removeListItem(button) {
    const listItem = button.parentElement;
    
    // Animate out
    listItem.style.opacity = '0';
    listItem.style.transform = 'translateX(50px)';
    
    setTimeout(() => {
        listItem.remove();
        itemCounter--;
        updateItemCounter();
        showTemporaryMessage('Item removed! 🗑️');
    }, 300);
}

function clearAllElements() {
    const list = document.getElementById('dynamic-list');
    const items = list.querySelectorAll('li');
    
    if (items.length === 0) {
        alert('No items to clear!');
        return;
    }
    
    if (confirm('Are you sure you want to remove all items?')) {
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(50px)';
                setTimeout(() => item.remove(), 300);
            }, index * 100);
        });
        
        itemCounter = 0;
        setTimeout(() => {
            updateItemCounter();
            showTemporaryMessage('All items cleared! 🧹');
        }, items.length * 100 + 300);
    }
}

function countItems() {
    const list = document.getElementById('dynamic-list');
    const count = list.querySelectorAll('li').length;
    updateItemCounter();
    showTemporaryMessage(`Total items: ${count} 📊`);
}

function updateItemCounter() {
    const counter = document.getElementById('item-counter');
    const count = document.getElementById('dynamic-list').querySelectorAll('li').length;
    counter.textContent = `Current items in list: ${count}`;
    counter.style.display = 'block';
}

// 4. INTERACTIVE FEATURES
function setupInteractiveFeatures() {
    const card = document.getElementById('interactive-card');
    const status = document.getElementById('interaction-status');
    
    card.addEventListener('mouseenter', function() {
        status.textContent = 'Status: Mouse is hovering! 🖱️';
        card.style.transform = 'scale(1.02) rotate(1deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        status.textContent = 'Status: Mouse left the card 👋';
        card.style.transform = 'scale(1) rotate(0deg)';
    });
    
    card.addEventListener('click', function() {
        status.textContent = 'Status: Card was clicked! 👆';
        card.style.background = `linear-gradient(45deg, ${getRandomColor()}, ${getRandomColor()})`;
    });
}

function toggleCardVisibility() {
    const card = document.getElementById('interactive-card');
    
    if (card.style.display === 'none') {
        card.style.display = 'block';
        card.style.opacity = '0';
        setTimeout(() => {
            card.style.opacity = '1';
        }, 100);
    } else {
        card.style.opacity = '0';
        setTimeout(() => {
            card.style.display = 'none';
        }, 300);
    }
}

// 5. FORM HANDLING
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    const output = document.getElementById('form-output');
    output.innerHTML = `
        <h3>Form Submitted Successfully! ✅</h3>
        <p><strong>Username:</strong> ${formData.username}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
        <p><em>Form submitted at: ${new Date().toLocaleString()}</em></p>
    `;
    output.style.display = 'block';
    
    // Clear form after submission
    setTimeout(() => {
        clearForm();
    }, 3000);
}

function clearForm() {
    document.getElementById('demo-form').reset();
    document.getElementById('form-output').style.display = 'none';
    showTemporaryMessage('Form cleared! 📝');
}

// UTILITY FUNCTIONS
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function getContrastColor(hexColor) {
    // Simple contrast calculation
    if (hexColor.includes('rgb')) {
        return '#ffffff';
    }
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
}

function adjustColor(hexColor, percent) {
    const num = parseInt(hexColor.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function showTemporaryMessage(message) {
    // Create temporary message element
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        font-weight: bold;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(100px)';
        setTimeout(() => messageDiv.remove(), 300);
    }, 2000);
}

// Add CSS animation for temporary messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Console log for debugging
console.log('JavaScript DOM Manipulation script loaded successfully!');