document.addEventListener('DOMContentLoaded', function() {

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }

  // Header scroll effect
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Smooth horizontal scroll with mouse drag
  const horizontalScroll = document.getElementById('horizontalScroll');
  if (horizontalScroll) {
    let isDown = false;
    let startX;
    let scrollLeft;

    horizontalScroll.addEventListener('mousedown', (e) => {
      isDown = true;
      horizontalScroll.style.cursor = 'grabbing';
      startX = e.pageX - horizontalScroll.offsetLeft;
      scrollLeft = horizontalScroll.scrollLeft;
    });

    horizontalScroll.addEventListener('mouseleave', () => {
      isDown = false;
      horizontalScroll.style.cursor = 'grab';
    });

    horizontalScroll.addEventListener('mouseup', () => {
      isDown = false;
      horizontalScroll.style.cursor = 'grab';
    });

    horizontalScroll.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - horizontalScroll.offsetLeft;
      const walk = (x - startX) * 2;
      horizontalScroll.scrollLeft = scrollLeft - walk;
    });
  }

  // Intersection Observer for sections
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => observer.observe(section));

  // Cookie Banner (in-memory storage)
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");

  // Show banner
  if (cookieBanner && acceptBtn) {
    cookieBanner.style.display = "flex";

    // Handle accept button click
    acceptBtn.addEventListener("click", () => {
      console.log("Accept button clicked!");
      cookieBanner.style.display = "none";
    });
  }

}); 


  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); 

    const formData = new FormData(form);
    const action = form.getAttribute('action');

    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        alert('Thanks for your message! I’ll get back to you soon.');
        form.reset(); 
      } else {
        alert('Oops! There was a problem submitting your form.');
      }
    }).catch(() => {
      alert('Something went wrong. Please try again.');
    });
  });

  // ChatBot
    const chatButton = document.getElementById('chatButton');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const quickQuestions = document.querySelectorAll('.quick-question');

    // Predefined responses
    const responses = {
      'services': 'I create elegant, intuitive digital experiences—from branding and web design to mobile and UI/UX.',
      'portfolio': 'You can view my portfolio at the Portfolio page. I have projects including Good Food, Tony\'s Pizza, OleDiaEvents, and more!',
      'contact': 'You can reach me at marianna.iatsko@gmail.com, through the Contact Me Form, or connect with me on LinkedIn—I\’d love to hear from you!',
      'pricing': 'My rates are tailored to each project\'s scope and complexity. To receive a custom quote, please reach out with details about your goals and timeline—I\'d be happy to explore how we can collaborate.',
      'default': 'ThatI\'s a great question! For more details, feel free to reach out directly at marianna.iatsko@gmail.com or via the Contact Me Form — I\'d love to hear from you.'
    };

    // Toggle chat window
    chatButton.addEventListener('click', () => {
      chatWindow.classList.toggle('active');
      if (chatWindow.classList.contains('active')) {
        chatInput.focus();
      }
    });

    chatClose.addEventListener('click', () => {
      chatWindow.classList.remove('active');
    });

    // Add message to chat
    function addMessage(text, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
      
      const bubble = document.createElement('div');
      bubble.className = 'message-bubble';
      bubble.textContent = text;
      
      messageDiv.appendChild(bubble);
      chatMessages.appendChild(messageDiv);
      
      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get bot response
    function getBotResponse(userMessage) {
      const message = userMessage.toLowerCase();
      
      if (message.includes('service') || message.includes('what do you do')) {
        return responses.services;
      } else if (message.includes('portfolio') || message.includes('work') || message.includes('project')) {
        return responses.portfolio;
      } else if (message.includes('contact') || message.includes('email') || message.includes('reach')) {
        return responses.contact;
      } else if (message.includes('price') || message.includes('cost') || message.includes('rate')) {
        return responses.pricing;
      } else if (message.includes('hello') || message.includes('hi')) {
        return 'Hello👋! How can I help you today?';
      } else {
        return responses.default;
      }
    }

    // Send message
    function sendMessage() {
      const message = chatInput.value.trim();
      if (!message) return;

      // Add user message
      addMessage(message, true);
      chatInput.value = '';

      // Simulate bot typing delay
      setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, false);
      }, 500);
    }

    // Event listeners
    chatSend.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    // Quick questions
    quickQuestions.forEach(button => {
      button.addEventListener('click', () => {
        const question = button.getAttribute('data-question');
        addMessage(question, true);
        
        setTimeout(() => {
          const response = getBotResponse(question);
          addMessage(response, false);
        }, 500);
      });
    });
 