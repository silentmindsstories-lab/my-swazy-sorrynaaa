const floatLayer = document.getElementById('floatLayer');
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

function floatHearts(amount = 12) {
  const symbols = ['♡', '♥', '✧', '✿', '✦'];
  for (let i = 0; i < amount; i++) {
    const item = document.createElement('span');
    item.className = 'floaty';
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.left = `${Math.random() * 100}%`;
    item.style.setProperty('--duration', `${5 + Math.random() * 5}s`);
    item.style.setProperty('--size', `${12 + Math.random() * 18}px`);
    item.style.animationDelay = `${Math.random() * 1.2}s`;
    floatLayer.appendChild(item);
    item.addEventListener('animationend', () => item.remove(), { once: true });
  }
}

// Decorative, generated soft sounds: no external audio files are needed.
let audioContext = null;
let soundEnabled = false;
function playChime() {
  if (!soundEnabled) return;
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    [659.25, 783.99, 987.77].forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, now + index * 0.11);
      gain.gain.exponentialRampToValueAtTime(0.045, now + index * 0.11 + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.11 + 0.42);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(now + index * 0.11);
      oscillator.stop(now + index * 0.11 + 0.45);
    });
  } catch (error) {
    // The site still works if the browser blocks audio.
  }
}

document.getElementById('soundToggle').addEventListener('click', async () => {
  soundEnabled = !soundEnabled;
  const button = document.getElementById('soundToggle');
  button.setAttribute('aria-pressed', String(soundEnabled));
  document.getElementById('soundIcon').textContent = soundEnabled ? '♫' : '♪';
  document.getElementById('soundLabel').textContent = soundEnabled ? 'sounds on' : 'soft sounds';
  if (soundEnabled) {
    try { audioContext ||= new (window.AudioContext || window.webkitAudioContext)(); await audioContext.resume(); } catch (error) {}
    playChime();
    showToast('A tiny little melody, just for you ♡');
  } else {
    showToast('Soft sounds are off 🌙');
  }
});

document.getElementById('openNote').addEventListener('click', () => {
  document.getElementById('letter').scrollIntoView({ behavior: 'smooth' });
  floatHearts(18);
  playChime();
});

document.getElementById('highlightNote').addEventListener('click', () => {
  const card = document.getElementById('letterCard');
  card.classList.remove('highlighted');
  void card.offsetWidth;
  card.classList.add('highlighted');
  floatHearts(10);
  playChime();
  showToast('I really do mean every word. Take your time ♡');
});

document.querySelectorAll('.reason-card').forEach((card) => {
  card.addEventListener('click', () => {
    const expanded = card.getAttribute('aria-expanded') === 'true';
    card.setAttribute('aria-expanded', String(!expanded));
    if (!expanded) playChime();
  });
});

document.getElementById('readyButton').addEventListener('click', () => {
  document.getElementById('responseMessage').textContent = 'Thank you for being open to it. I want to listen, not argue. ♡';
  floatHearts(16);
  playChime();
});

document.getElementById('timeButton').addEventListener('click', () => {
  document.getElementById('responseMessage').textContent = 'Of course. Take all the time you need. I will respect that. 🌙';
  showToast('No pressure, no deadline. Take care of yourself ♡');
});

document.getElementById('surpriseButton').addEventListener('click', () => {
  const surprise = document.getElementById('surpriseMessage');
  surprise.hidden = !surprise.hidden;
  document.getElementById('surpriseButton').innerHTML = surprise.hidden ? 'A tiny surprise for you <span>✧</span>' : 'Keep this little reminder ♡';
  if (!surprise.hidden) {
    surprise.scrollIntoView({ behavior: 'smooth', block: 'center' });
    floatHearts(24);
    playChime();
  }
});

// A few gentle decorations drift through the page without blocking interaction.
setTimeout(() => floatHearts(8), 900);
