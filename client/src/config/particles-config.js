const particlesConfig = {
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#f0932b", "#eb4d4b", "#6c5ce7", "#a29bfe", "#fd79a8", "#fdcb6e"]
    },
    shape: {
      type: ["circle", "triangle", "polygon"],
      polygon: {
        nb_sides: 6
      }
    },
    opacity: {
      value: 0.7,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.3,
        sync: false
      }
    },
    size: {
      value: 4,
      random: true,
      anim: {
        enable: true,
        speed: 3,
        size_min: 1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.6,
      width: 2
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: true,
      attract: {
        enable: true,
        rotateX: 1200,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: ["grab", "bubble", "repulse"]
      },
      onclick: {
        enable: true,
        mode: ["push", "remove"]
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 200,
        line_opacity: 1
      },
      bubble: {
        distance: 250,
        size: 8,
        duration: 2,
        opacity: 1,
        speed: 3
      },
      repulse: {
        distance: 150,
        duration: 0.4
      },
      push: {
        particles_nb: 5
      },
      remove: {
        particles_nb: 3
      }
    }
  },
  retina_detect: true
};

export default particlesConfig;