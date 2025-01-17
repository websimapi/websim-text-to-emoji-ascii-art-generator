// Font definition - each letter is defined by a 7x5 matrix
const FONT = {
  'H': [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1]
  ],
  'I': [
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [1,1,1,1,1]
  ],
  // Add more letters as needed
};

function generateAsciiArt(text, foreground = '☀️', background = '🌊') {
  text = text.toUpperCase();
  const lines = [];
  const height = 7;
  
  // Initialize empty lines
  for (let i = 0; i < height; i++) {
    lines[i] = [];
  }
  
  // Generate the pattern for each character
  for (const char of text) {
    if (FONT[char]) {
      const pattern = FONT[char];
      
      // Add character pattern to each line
      for (let i = 0; i < height; i++) {
        pattern[i].forEach(pixel => {
          lines[i].push(pixel ? foreground : background);
        });
        // Add space between letters
        lines[i].push(background);
      }
    }
  }
  
  // Convert lines to strings
  return lines.map(line => line.join('')).join('\n');
}

// DOM Elements
const textInput = document.getElementById('text');
const foregroundInput = document.getElementById('foreground');
const backgroundInput = document.getElementById('background');
const generateBtn = document.getElementById('generate');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copy');

// Event Listeners
generateBtn.addEventListener('click', () => {
  const text = textInput.value;
  const foreground = foregroundInput.value;
  const background = backgroundInput.value;
  
  const art = generateAsciiArt(text, foreground, background);
  output.textContent = art;
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(output.textContent)
    .then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    });
});

// Generate initial art
generateBtn.click();