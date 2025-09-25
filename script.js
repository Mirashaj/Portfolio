/* ParticlesJS configuration */
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": { 
        "enable": true, 
        "value_area": 800 
      }
    },
    "color": { 
      "value": "#00ffff" 
    },
    "shape": {
      "type": "circle",
      "stroke": { 
        "width": 0, 
        "color": "#000000" 
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false
    },
    "size": {
      "value": 3,
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 120,
      "color": "#00ffff",
      "opacity": 0.3,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "bounce": false,
      "attract": { 
        "enable": false 
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { 
        "enable": true, 
        "mode": "grab" 
      },
      "onclick": { 
        "enable": true, 
        "mode": "push" 
      }
    },
    "modes": {
      "grab": { 
        "distance": 140, 
        "line_linked": { 
          "opacity": 1 
        }
      },
      "push": { 
        "particles_nb": 4 
      }
    }
  },
  "retina_detect": true
});
