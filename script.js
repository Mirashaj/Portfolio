// =================== PARTICLES.JS CONFIGURATION ===================

// Matrix mode state - deve essere globale per essere accessibile ovunque
let matrixModeActive = false;

function initParticles() {
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#00f5ff'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#00f5ff',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 6,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
    });
    console.log('Particles.js initialized successfully');
  } else {
    console.warn('particles.js not ready, retrying in 200ms...');
    setTimeout(initParticles, 200);
  }
}

// Verifica multipla per il caricamento di particles.js
function waitForParticlesJS() {
  let attempts = 0;
  const maxAttempts = 20; // Max 4 secondi di attesa
  
  function checkAndInit() {
    attempts++;
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
      initParticles();
    } else if (attempts < maxAttempts) {
      console.log(`Attempt ${attempts}: Waiting for particles.js...`);
      setTimeout(checkAndInit, 200);
    } else {
      console.error('Failed to load particles.js after maximum attempts');
    }
  }
  
  checkAndInit();
}

// Initialize particles when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  waitForParticlesJS();
});

// Fallback per window.load nel caso DOMContentLoaded non funzioni
window.addEventListener('load', function() {
  // Se particles.js non è ancora inizializzato, prova di nuovo
  if (!document.querySelector('#particles-js canvas')) {
    console.log('Particles not found on window load, retrying...');
    waitForParticlesJS();
  }
});

// Snake game removed
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =================== SMOOTH SCROLLING ===================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// =================== SCROLL ANIMATIONS ===================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in, .timeline-item, .about-text p');
  fadeElements.forEach(el => observer.observe(el));
});

// =================== LIVE CODING ANIMATION ===================
const codeLines = [
  "const developer = {",
  "  name: 'Erik',",
  "  passion: 'Web Development',",
  "  skills: ['HTML', 'CSS', 'JavaScript'],",
  "  learning: ['React', 'Node.js', 'Python'],",
  "  motto: 'Code, Learn, Repeat!'",
  "};",
  "",
  "// Sempre alla ricerca di nuove sfide",
  "developer.createAmazingThings();"
];

function startLiveCoding() {
  const codeOutput = document.querySelector('.code-output');
  if (!codeOutput) return;
  
  let lineIndex = 0;
  let charIndex = 0;
  
  function typeCode() {
    if (lineIndex < codeLines.length) {
      const currentLine = codeLines[lineIndex];
      
      if (charIndex <= currentLine.length) {
        const displayText = codeLines.slice(0, lineIndex).join('\n') + 
                           (lineIndex > 0 ? '\n' : '') + 
                           currentLine.substring(0, charIndex);
        codeOutput.textContent = displayText;
        charIndex++;
        setTimeout(typeCode, 50);
      } else {
        lineIndex++;
        charIndex = 0;
        setTimeout(typeCode, 300);
      }
    } else {
      // Restart animation after a pause
      setTimeout(() => {
        lineIndex = 0;
        charIndex = 0;
        codeOutput.textContent = '';
        typeCode();
      }, 3000);
    }
  }
  
  typeCode();
}

// Start live coding when skills section is visible
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startLiveCoding();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  skillsObserver.observe(skillsSection);
}

// =================== HERO TYPEWRITER ===================
function startHeroTypewriter() {
  const el = document.querySelector('.typewriter');
  if (!el) return;
  const phrases = ["Ciao, sono Erik", "Sviluppatore Web", "Creo esperienze digitali"];
  let pi = 0, ci = 0;

  function type() {
    const text = phrases[pi];
    el.textContent = text.substring(0, ci);
    ci++;
    if (ci > text.length) {
      setTimeout(() => {
        ci = 0;
        pi = (pi + 1) % phrases.length;
        type();
      }, 1500);
    } else {
      setTimeout(type, 80);
    }
  }

  type();
}

document.addEventListener('DOMContentLoaded', () => {
  startHeroTypewriter();
});

// =================== SNAKE GAME ===================
class SnakeGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 20;
    this.tileCount = this.canvas.width / this.gridSize;
    
    this.snake = [
      {x: 10, y: 10}
    ];
    this.food = {};
    this.dx = 0;
    this.dy = 0;
    this.score = 0;
    this.gameRunning = false;
    
    this.technologies = ['JS', 'CSS', 'HTML', 'React', 'Node', 'Python', 'Git', 'API'];
    this.currentTech = '';
    
    this.generateFood();
    this.bindEvents();
  }
  
  generateFood() {
    this.food = {
      x: Math.floor(Math.random() * this.tileCount),
      y: Math.floor(Math.random() * this.tileCount)
    };
    this.currentTech = this.technologies[Math.floor(Math.random() * this.technologies.length)];
  }
  
  bindEvents() {
    document.addEventListener('keydown', (e) => {
      if (!this.gameRunning) return;
      
      const { key } = e;
      if (key === 'ArrowLeft' && this.dx !== 1) {
        this.dx = -1;
        this.dy = 0;
      } else if (key === 'ArrowUp' && this.dy !== 1) {
        this.dx = 0;
        this.dy = -1;
      } else if (key === 'ArrowRight' && this.dx !== -1) {
        this.dx = 1;
        this.dy = 0;
      } else if (key === 'ArrowDown' && this.dy !== -1) {
        this.dx = 0;
        this.dy = 1;
      }
    });
    
    const startBtn = document.getElementById('startGame');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startGame());
    }
  }
  
  startGame() {
    this.gameRunning = true;
    this.snake = [{x: 10, y: 10}];
    this.dx = 0;
    this.dy = 0;
    this.score = 0;
    this.updateScore();
    this.generateFood();
    this.gameLoop();
    
    const startBtn = document.getElementById('startGame');
    if (startBtn) startBtn.textContent = 'Restart Game';
  }
  
  gameLoop() {
    if (!this.gameRunning) return;
    
    setTimeout(() => {
      this.clearCanvas();
      this.moveSnake();
      this.drawFood();
      this.drawSnake();
      
      if (this.checkCollision()) {
        this.gameOver();
        return;
      }
      
      this.gameLoop();
    }, 150);
  }
  
  clearCanvas() {
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  moveSnake() {
    const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy};
    this.snake.unshift(head);
    
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.updateScore();
      this.generateFood();
    } else {
      this.snake.pop();
    }
  }
  
  drawSnake() {
    this.ctx.fillStyle = '#00f5ff';
    this.snake.forEach((segment, index) => {
      if (index === 0) {
        this.ctx.fillStyle = '#4ecdc4';
      } else {
        this.ctx.fillStyle = '#00f5ff';
      }
      this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
    });
  }
  
  drawFood() {
    this.ctx.fillStyle = '#ff6b6b';
    this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
    
    // Draw technology text
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '12px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      this.currentTech,
      this.food.x * this.gridSize + this.gridSize / 2,
      this.food.y * this.gridSize + this.gridSize / 2 + 4
    );
  }
  
  checkCollision() {
    const head = this.snake[0];
    
    // Wall collision
    if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
      return true;
    }
    
    // Self collision
    for (let i = 1; i < this.snake.length; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        return true;
      }
    }
    
    return false;
  }
  
  updateScore() {
    const scoreEl = document.getElementById('score');
    if (scoreEl) scoreEl.textContent = this.score;
  }
  
  gameOver() {
    this.gameRunning = false;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '24px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2 - 20);
    this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);
  }
}

// Initialize Snake Game
document.addEventListener('DOMContentLoaded', () => {
  const snakeCanvas = document.getElementById('snakeGame');
  if (snakeCanvas) {
    new SnakeGame('snakeGame');
  }
});

// =================== CONSOLE FUNCTIONALITY ===================
class Console {
  constructor(inputSelector, outputSelector) {
    this.input = document.querySelector(inputSelector);
    this.output = document.querySelector(outputSelector);
    this.commands = {
      help: () => this.showHelp(),
      about: () => this.showAbout(),
      skills: () => this.showSkills(),
      projects: () => this.showProjects(),
      contact: () => this.showContact(),
      clear: () => this.clearConsole(),
      hire: () => this.showHire(),
      matrix: () => this.startMatrix(),
      konami: () => this.showKonami()
    };
    this.bindEvents();
  }

  bindEvents() {
    if (!this.input) return;
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const command = this.input.value.trim().toLowerCase();
        this.executeCommand(command);
        this.input.value = '';
        // Close terminal overlay if this is the terminal input
        if (this.input.classList.contains('terminal-input')) {
          const terminalOverlay = document.querySelector('.terminal-overlay');
          if (terminalOverlay) {
            terminalOverlay.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      }
    });
  }
  
  executeCommand(command) {
    this.addLine(`erik@portfolio:~$ ${command}`, 'command');
    
    if (this.commands[command]) {
      this.commands[command]();
    } else if (command === '') {
      // Do nothing for empty command
    } else {
      this.addLine(`Command not found: ${command}. Type 'help' for available commands.`, 'error');
    }
  }
  
  addLine(text, type = 'response') {
    const line = document.createElement('div');
    line.className = `console-line console-${type}`;
    
    if (type === 'command') {
      line.innerHTML = `<span class="prompt">erik@portfolio:~$</span> <span class="command">${text.replace('erik@portfolio:~$ ', '')}</span>`;
    } else {
      line.innerHTML = text;
    }
    
    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }
  
  showHelp() {
    this.addLine(`Available commands:
- <span class="highlight">about</span>     : Chi sono
- <span class="highlight">skills</span>    : Le mie competenze  
- <span class="highlight">projects</span>  : I miei progetti
- <span class="highlight">contact</span>   : Come contattarmi
- <span class="highlight">clear</span>     : Pulisci schermo
- <span class="highlight">hire</span>      : Perché assumermi
- <span class="highlight">matrix</span>    : Modalità Matrix`);
  }
  
  showAbout() {
    setTimeout(() => {
      this.addLine("Ciao! Sono Erik, uno sviluppatore web appassionato...");
    }, 500);
    setTimeout(() => {
      this.addLine("Il mio percorso è iniziato con curiosità e si è trasformato in passione pura.");
    }, 1500);
    setTimeout(() => {
      this.addLine("Amo creare esperienze digitali uniche e funzionali! 🚀");
    }, 2500);
  }
  
  showSkills() {
    this.addLine("Caricamento competenze...");
    setTimeout(() => {
      this.addLine(`<span style="color: #00f5ff;">Frontend:</span> HTML5, CSS3, JavaScript, React, Vue.js
<span style="color: #ff6b6b;">Backend:</span> Node.js, Express, MongoDB, PostgreSQL  
<span style="color: #4ecdc4;">Tools:</span> Git, VS Code, Figma, Docker`);
    }, 1000);
  }
  
  showProjects() {
    this.addLine("Inizializzando progetti...");
    setTimeout(() => {
      this.addLine(`1. 🌐 Portfolio Website - Il sito che stai visitando ora
2. ⚡ Task Manager App - Gestione attività con drag & drop
3. 🛒 E-commerce Platform - Piattaforma completa con pagamenti`);
    }, 1200);
  }
  
  showContact() {
    this.addLine(`📧 Email: erikmirashaj10@gmail.com
💼 LinkedIn: linkedin.com/in/erik-mirashaj`);
  }
  
  showHire() {
    this.addLine("Perché dovresti assumermi?");
    setTimeout(() => {
      this.addLine("✅ Passione genuina per il codice");
    }, 800);
    setTimeout(() => {
      this.addLine("✅ Sempre aggiornato sulle nuove tecnologie");
    }, 1600);
    setTimeout(() => {
      this.addLine("✅ Problem solver creativo");
    }, 2400);
    setTimeout(() => {
      this.addLine("✅ Team player con ottime capacità comunicative");
    }, 3200);
    setTimeout(() => {
      this.addLine("Cosa aspetti? Contattami! 🚀");
    }, 4000);
  }
  
  clearConsole() {
    this.output.innerHTML = '';
  }
  
  startMatrix() {
    if (!matrixModeActive) {
      this.addLine("Inizializzazione Matrix Mode...");
      setTimeout(() => {
        document.body.style.filter = 'hue-rotate(120deg) brightness(1.3) contrast(1.1) saturate(1.5)';
        document.body.classList.add('matrix-mode');
        matrixModeActive = true;
  // Notify React cursor component
  window.matrixModeActive = true;
  window.dispatchEvent(new Event('matrix-mode-change'));
        
        console.log('Matrix Mode - Activation started');
        
        // Fix per il cursore in matrix mode - SOLUZIONI MULTIPLE
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        if (cursor && cursorFollower) {
          // 1. Libera completamente il cursore
          liberateMatrixCursor();

          // If React manages the cursor, skip forcing cssText overrides to avoid conflicts
          if (!window.reactCursorManaged) {
            // 2. Forza position absolute e rimuovi tutti i vincoli per Matrix Mode
            cursor.style.cssText = `
              position: absolute !important;
              z-index: 2147483647 !important;
              pointer-events: none !important;
              display: block !important;
              opacity: 1 !important;
              visibility: visible !important;
              width: 20px !important;
              height: 20px !important;
              border: 2px solid #00ff41 !important;
              border-radius: 50% !important;
              background: transparent !important;
              transition: none !important;
              transform: translate(-50%, -50%) !important;
              left: ${lastCursorX + window.scrollY}px !important;
              top: ${lastCursorY + window.scrollY}px !important;
              margin: 0 !important;
              padding: 0 !important;
              clip: auto !important;
              contain: none !important;
              box-shadow: 0 0 15px #00ff41 !important;
              mix-blend-mode: normal !important;
            `;

            cursorFollower.style.cssText = `
              position: absolute !important;
              z-index: 2147483646 !important;
              pointer-events: none !important;
              display: block !important;
              opacity: 1 !important;
              visibility: visible !important;
              width: 8px !important;
              height: 8px !important;
              background: #00ff41 !important;
              border-radius: 50% !important;
              transition: none !important;
              transform: translate(-50%, -50%) !important;
              left: ${lastCursorX + window.scrollY}px !important;
              top: ${lastCursorY + window.scrollY}px !important;
              margin: 0 !important;
              padding: 0 !important;
              clip: auto !important;
              contain: none !important;
              box-shadow: 0 0 10px #00ff41 !important;
            `;

            console.log('Matrix mode - Cursor liberation complete (legacy applied)');
          } else {
            console.log('Matrix mode - React manages cursor; skipped legacy css overrides');
          }
        }
        
        this.addLine("<span style='color: #00ff41;'>Matrix Mode attivato!</span>");
        this.addLine("<span style='color: #00ff41;'>Il cursore è ora libero dai vincoli della Matrix!</span>");
        this.addLine("<span style='color: #00ff41;'>Scrivi 'matrix' di nuovo per uscire dalla Matrix Mode</span>");
      }, 1000);
    } else {
      this.addLine("Disconnessione dalla Matrix Mode...");
      setTimeout(() => {
        document.body.style.filter = '';
        document.body.classList.remove('matrix-mode');
        matrixModeActive = false;
  // Notify React cursor component
  window.matrixModeActive = false;
  window.dispatchEvent(new Event('matrix-mode-change'));
        
        // Ripristina il cursore normale
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        if (cursor && cursorFollower) {
          // Ripristina gli stili originali del cursore
          if (!window.reactCursorManaged) {
            cursor.style.cssText = `
              position: fixed;
              z-index: 2147483647;
              pointer-events: none;
              display: block;
              opacity: 1;
              visibility: visible;
              width: 20px;
              height: 20px;
              border: 2px solid var(--primary-color);
              border-radius: 50%;
              background: transparent;
              transition: transform 0.2s ease;
              transform: translate(-50%, -50%);
            `;
            
            cursorFollower.style.cssText = `
              position: fixed;
              z-index: 2147483646;
              pointer-events: none;
              display: block;
              opacity: 1;
              visibility: visible;
              width: 8px;
              height: 8px;
              background: var(--primary-color);
              border-radius: 50%;
              transition: transform 0.15s ease;
              transform: translate(-50%, -50%);
            `;
          } else {
            console.log('Exiting Matrix: React manages cursor; skipped legacy restore');
          }
        }
        
        this.addLine("Bentornato nella realtà.");
      }, 1000);
    }
  }
  
  showKonami() {
    this.addLine("🎉 KONAMI CODE DISCOVERED! 🎉");
    setTimeout(() => {
      this.addLine("Hai sbloccato la modalità SUPER DEVELOPER!");
    }, 1000);
    setTimeout(() => {
      this.addLine("🚀 +30 punti sviluppatore");
    }, 2000);
    setTimeout(() => {
      this.addLine("🎮 +1 livello nerd");  
    }, 3000);
    setTimeout(() => {
      this.addLine("🏆 Achievement unlocked: 'Old School Gamer'");
    }, 4000);
  }
}

// Initialize Console
document.addEventListener('DOMContentLoaded', () => {
  // Regular console
  new Console('.console-input', '.console-output');
  
  // Terminal overlay console
  new Console('.terminal-input', '.terminal-output');
});

// =================== TERMINAL OVERLAY ===================
document.addEventListener('DOMContentLoaded', () => {
  const terminalToggle = document.querySelector('.terminal-toggle');
  const terminalOverlay = document.querySelector('.terminal-overlay');
  const terminalClose = document.querySelector('.terminal-close');
  
  if (terminalToggle && terminalOverlay) {
    terminalToggle.addEventListener('click', () => {
      terminalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (terminalClose && terminalOverlay) {
    terminalClose.addEventListener('click', () => {
      terminalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Close terminal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && terminalOverlay && terminalOverlay.classList.contains('active')) {
      terminalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// =================== CONTACT FORM ===================
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission
      const btn = contactForm.querySelector('.btn');
      const originalText = btn.textContent;
      
      btn.textContent = 'Invio in corso...';
      btn.disabled = true;
      
      setTimeout(() => {
        btn.textContent = 'Messaggio Inviato! ✓';
        btn.style.background = '#4ecdc4';
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          contactForm.reset();
        }, 3000);
      }, 2000);
    });
  }
});

// =================== KONAMI CODE EASTER EGG ===================
let konamiCode = [];
const konamiSequence = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.code);
  
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.length === konamiSequence.length) {
    const isMatch = konamiCode.every((code, index) => code === konamiSequence[index]);
    
    if (isMatch) {
      // Konami code success!
      document.body.style.animation = 'rainbow 2s infinite';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 5000);
      
      // Show secret message
      const secretDiv = document.createElement('div');
      secretDiv.innerHTML = '🎉 KONAMI CODE! Old school gamer detected! 🎮';
      secretDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #00f5ff, #ff6b6b);
        color: white;
        padding: 20px 40px;
        border-radius: 15px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 10001;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        animation: bounce 0.5s ease;
      `;
      
      document.body.appendChild(secretDiv);
      
      setTimeout(() => {
        secretDiv.remove();
      }, 3000);
      
      konamiCode = [];
    }
  }
});

// Add rainbow animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);

// =================== PERFORMANCE OPTIMIZATIONS ===================
// Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// =================== LOADING ANIMATION ===================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Show elements with stagger animation
  const elements = document.querySelectorAll('.hero-text h1, .hero-buttons, .social-links');
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

console.log('🚀 Portfolio loaded successfully! Welcome to Erik\'s digital world.');
console.log('💡 Tip: Try the terminal button in the navigation or use the Konami code for surprises!');
console.log('🎮 Konami Code: ↑↑↓↓←→←→BA');
