import confetti from "canvas-confetti";

export const Confetti = {
  show: () => {
    const count = 600;
    const defaults = {
      origin: { y: 0.9 }
    };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, {
      spread: 26,
      gravity: 0.1,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
      gravity: 0.1,
    });
    fire(0.35, {
      spread: 100,
      gravity: 0.1,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      gravity: 0.1,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      gravity: 0.1,
      startVelocity: 45,
    });
  }
};