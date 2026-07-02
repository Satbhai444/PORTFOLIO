document.addEventListener('DOMContentLoaded', () => {
    // Do not show on the registration page (index.html)
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        return;
    }

    // Create container
    const chatContainer = document.createElement('div');
    chatContainer.id = 'persona-chat-container';
    
    const userName = localStorage.getItem("userName");
    const hour = new Date().getHours();
    let timeGreeting = "Hello";
    if (hour < 5) timeGreeting = "Hey there night owl 🦉";
    else if (hour < 12) timeGreeting = "Good morning ☀️";
    else if (hour < 18) timeGreeting = "Good afternoon 🌤️";
    else timeGreeting = "Good evening 🌙";

    let personalizedGreeting = timeGreeting;
    if (userName) {
        personalizedGreeting += `, ${userName}`;
    }

    // Inject HTML structure
    chatContainer.innerHTML = `
        <div id="persona-chat-window">
            <div class="chat-header">
                <span>🤖 NEXA</span>
                <div class="header-controls">
                    <button id="clear-chat" title="Clear Chat">🗑️</button>
                    <button id="close-chat" class="close-chat" title="Close">&times;</button>
                </div>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="message bot-message">
                    ${personalizedGreeting}! I'm NEXA, Darshan's AI Assistant. You can ask me to navigate to Projects, About, or Contact pages!
                </div>
            </div>
            <div class="quick-actions">
                <button class="action-btn" data-text="Projects">Projects 🚀</button>
                <button class="action-btn" data-text="Resume">Resume 📄</button>
                <button class="action-btn" data-text="Contact">Contact 📞</button>
                <button class="action-btn" data-text="Tell me a joke">Joke 😂</button>
            </div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Type a message..." />
                <button id="send-btn"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
        <button id="persona-chat-toggle" class="bounce-animation" aria-label="Toggle Chat">
            🤖
        </button>
    `;
    
    document.body.appendChild(chatContainer);

    // Inject CSS for typing animation
    const chatStyle = document.createElement('style');
    chatStyle.textContent = `
        .typing-indicator { font-size: 1.5rem; line-height: 1rem; padding: 10px 15px; }
        .typing-indicator span { animation: blink 1.4s infinite both; margin: 0 2px; display: inline-block; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink { 0% { opacity: 0.2; } 20% { opacity: 1; } 100% { opacity: 0.2; } }
        
        /* Bounce Animation */
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        .bounce-animation { animation: bounce 2s infinite; }

        /* Quick Actions */
        .quick-actions { padding: 10px 15px; display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; }
        .quick-actions::-webkit-scrollbar { display: none; }
        .action-btn { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 6px 12px; border-radius: 20px; cursor: pointer; font-size: 0.8rem; white-space: nowrap; transition: 0.3s; }
        .action-btn:hover { background: linear-gradient(135deg, #6a11cb, #2575fc); border-color: transparent; transform: translateY(-2px); }

        /* Draggable Header */
        .chat-header { cursor: move; user-select: none; }
        .chat-header:active { cursor: grabbing; }
    `;
    document.head.appendChild(chatStyle);

    const toggleBtn = document.getElementById('persona-chat-toggle');
    const chatWindow = document.getElementById('persona-chat-window');
    const closeBtn = document.getElementById('close-chat');
    const clearBtn = document.getElementById('clear-chat');
    const sendBtn = document.getElementById('send-btn');
    const inputField = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');
    const chatHeader = chatWindow.querySelector('.chat-header');

    // Draggable Logic
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    chatHeader.addEventListener('mousedown', (e) => {
        if (e.target.closest('.close-chat')) return; // Don't drag if clicking close button
        isDragging = true;
        const rect = chatWindow.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        
        // Switch to absolute positioning coordinates
        chatWindow.style.right = 'auto';
        chatWindow.style.bottom = 'auto';
        chatWindow.style.left = `${rect.left}px`;
        chatWindow.style.top = `${rect.top}px`;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        chatWindow.style.left = `${e.clientX - dragOffsetX}px`;
        chatWindow.style.top = `${e.clientY - dragOffsetY}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Bot State
    const botState = {
        userName: localStorage.getItem('userName') || null,
        awaitingName: false
    };

    // Auto-open chat after 5 seconds (if not disabled)
    let autoOpenTimer = null;
    if (!localStorage.getItem('chat_disabled')) {
        autoOpenTimer = setTimeout(() => {
            if (!chatWindow.classList.contains('visible')) {
                chatWindow.classList.add('visible');
                toggleBtn.classList.remove('bounce-animation'); // Stop bouncing
                // Play notification sound
                const audio = new Audio('../SOUNDS/notification.mp3');
                audio.volume = 0.5;
                audio.play().catch(e => console.log("Audio play blocked:", e));
                addMessage("Are you feeling lost? I can help you navigate to the Projects, About, or Contact pages.", 'bot');
            }
        }, 5000);
    } else {
        toggleBtn.classList.remove('bounce-animation'); // Don't bounce if disabled
    }

    // Toggle Chat Window
    toggleBtn.addEventListener('click', () => {
        if (autoOpenTimer) clearTimeout(autoOpenTimer); // Cancel auto-open if user interacts manually
        toggleBtn.classList.remove('bounce-animation'); // Stop bouncing
        chatWindow.classList.toggle('visible');
        if (chatWindow.classList.contains('visible')) {
            inputField.focus();
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('visible');
        localStorage.setItem('chat_disabled', 'true'); // Remember user closed it
    });

    // Clear Chat History
    clearBtn.addEventListener('click', () => {
        messagesContainer.innerHTML = '<div class="message bot-message">Chat history cleared. How can I help?</div>';
    });

    // Add Message to Chat
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Typing Indicator Logic
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot-message', 'typing-indicator');
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<span>•</span><span>•</span><span>•</span>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) typingDiv.remove();
    }

    // Process User Input
    function processUserMessage() {
        const text = inputField.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        inputField.value = '';
        showTypingIndicator();

        // Simulate thinking delay
        setTimeout(() => {
            removeTypingIndicator();
            handleBotResponse(text);
        }, 1500);
    }

    // Bot Logic
    function handleBotResponse(rawText) {
        const text = rawText.toLowerCase();
        let response = "";
        let action = null;

        // 1. Handle Name Input
        if (botState.awaitingName) {
            botState.userName = rawText;
            localStorage.setItem('userName', rawText);
            botState.awaitingName = false;
            response = `Nice to meet you, ${botState.userName}! How can I help you today?`;
        }
        // 2. Greetings & Name Reset
        else if (text.match(/\b(hi|hello|hey|hola)\b/)) {
            if (botState.userName) {
                response = `Hello again, ${botState.userName}! 👋 How can I assist you?`;
            } else {
                response = "Hello there! 👋 I'm Darshan's Assistant. What's your name?";
                botState.awaitingName = true;
            }
        }
        else if (text.includes('change name') || text.includes('reset name')) {
            botState.userName = null;
            localStorage.removeItem('userName');
            response = "Okay, I've forgotten your name. What should I call you?";
            botState.awaitingName = true;
        }
        else if (text.includes('who am i') || text.includes('what is my name')) {
            if (botState.userName) {
                response = `Your name is ${botState.userName}.`;
            } else {
                response = "I don't know your name yet. What should I call you?";
                botState.awaitingName = true;
            }
        }
        // 3. Advanced Features (Theme, Resume, Time, Jokes)
        else if (text.includes('theme') || text.includes('dark') || text.includes('light') || text.includes('mode')) {
            response = "Switching the theme for you! 🌗";
            action = () => {
                const themeBtn = document.getElementById('theme-toggle');
                if (themeBtn) themeBtn.click();
            };
        }
        else if (text.includes('resume') || text.includes('cv') || text.includes('download')) {
            response = "Downloading Darshan's Resume... 📄";
            action = () => {
                const link = document.createElement('a');
                link.href = '../IMAGES/Darshan_Fresher_Resume.pdf';
                link.download = 'Darshan_Fresher_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
        }
        else if (text.includes('time') || text.includes('date')) {
            const now = new Date();
            response = `It's currently ${now.toLocaleTimeString()} on ${now.toLocaleDateString()}. ⌚`;
        }
        else if (text.includes('joke') || text.includes('funny')) {
            const jokes = [
                "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
                "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
                "I would tell you a UDP joke, but you might not get it.",
                "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings."
            ];
            response = jokes[Math.floor(Math.random() * jokes.length)];
        }
        else if (text.includes('party') || text.includes('celebrate') || text.includes('confetti')) {
            response = "Woohoo! Let's party! 🎉";
            action = () => {
                if (typeof triggerConfetti === 'function') {
                    triggerConfetti();
                }
            };
        }
        else if (text.startsWith('calculate') || text.startsWith('calc')) {
            const expression = text.replace(/calculate|calc/g, '').trim();
            if (!expression) {
                response = "Please provide a math expression. e.g., 'calculate 5 + 5'";
            } else {
                try {
                    // Sanitize: allow only numbers and math operators
                    if (/^[0-9+\-*/().\s]+$/.test(expression)) {
                        // Safe evaluation using Function constructor
                        const result = new Function('return ' + expression)();
                        response = `The result is ${result} 🧮`;
                    } else {
                        response = "I can only calculate basic math expressions (numbers, +, -, *, /).";
                    }
                } catch (e) {
                    response = "Oops! I couldn't calculate that. Check your format.";
                }
            }
        }
        else if (text.includes('quote') || text.includes('inspire') || text.includes('motivation')) {
            const quotes = [
                "The only way to do great work is to love what you do. – Steve Jobs",
                "Code is like humor. When you have to explain it, it’s bad. – Cory House",
                "First, solve the problem. Then, write the code. – John Johnson",
                "Experience is the name everyone gives to their mistakes. – Oscar Wilde",
                "Simplicity is the soul of efficiency. – Austin Freeman",
                "Java is to JavaScript what car is to Carpet. – Chris Heilmann"
            ];
            response = quotes[Math.floor(Math.random() * quotes.length)] + " ✨";
        }
        else if (text.includes('help') || text.includes('command')) {
            response = "Here's what I can do:\n• Navigate (Projects, Contact, About)\n• 'Resume' to download CV\n• 'Theme' to toggle dark mode\n• 'Calculate 5+5' for math 🧮\n• 'Quote' for inspiration ✨\n• 'Party' for a surprise 🎉\n• 'Clear' to reset chat";
        }
        // 4. Navigation
        else if (text.includes('project') || text.includes('work') || text.includes('portfolio')) {
            response = "Taking you to the Projects page! 🚀";
            action = () => window.location.href = 'projects.html';
        } else if (text.includes('contact') || text.includes('email') || text.includes('hire') || text.includes('call')) {
            response = "Let's get in touch! Redirecting to Contact page... 📞";
            action = () => window.location.href = 'contactme.html';
        } else if (text.includes('about') || text.includes('who') || text.includes('skill')) {
            response = "Want to know more about Darshan? Going to About page... 👤";
            action = () => window.location.href = 'about.html';
        } else if (text.includes('home') || text.includes('start')) {
            response = "Heading back Home! 🏠";
            action = () => window.location.href = 'home.html';
        } else if (text.includes('clear')) {
            response = "Chat cleared! 🧹";
            action = () => {
                messagesContainer.innerHTML = '<div class="message bot-message">Chat cleared. How can I help?</div>';
            };
        } else if (text.includes('bye')) {
            response = `Goodbye ${botState.userName || ''}! Have a great day! 👋`;
        } else {
            response = "I'm just a simple bot 🤖. Try asking for 'Projects', 'Resume', 'Theme', 'Joke', or just say 'Hello'!";
        }

        addMessage(response, 'bot');

        if (action) {
            setTimeout(action, 1500);
        }
    }

    // Quick Actions Logic
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            inputField.value = btn.getAttribute('data-text');
            processUserMessage();
        });
    });

    // Event Listeners for Sending
    sendBtn.addEventListener('click', processUserMessage);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') processUserMessage();
    });
});