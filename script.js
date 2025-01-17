// Font definition - each letter is now defined by a 4x3 matrix
const FONT = {
  'A': [
    [1,1,1],
    [1,0,1],
    [1,1,1],
    [1,0,1]
  ],
  'B': [
    [1,1,0],
    [1,1,1],
    [1,0,1],
    [1,1,1]
  ],
  'C': [
    [1,1,1],
    [1,0,0],
    [1,0,0],
    [1,1,1]
  ],
  'D': [
    [1,1,0],
    [1,0,1],
    [1,0,1],
    [1,1,0]
  ],
  'E': [
    [1,1,1],
    [1,1,0],
    [1,0,0],
    [1,1,1]
  ],
  'F': [
    [1,1,1],
    [1,1,0],
    [1,0,0],
    [1,0,0]
  ],
  'G': [
    [1,1,1],
    [1,0,0],
    [1,0,1],
    [1,1,1]
  ],
  'H': [
    [1,0,1],
    [1,1,1],
    [1,0,1],
    [1,0,1]
  ],
  'I': [
    [1,1,1],
    [0,1,0],
    [0,1,0],
    [1,1,1]
  ],
  'J': [
    [0,1,1],
    [0,0,1],
    [1,0,1],
    [1,1,1]
  ],
  'K': [
    [1,0,1],
    [1,1,0],
    [1,1,0],
    [1,0,1]
  ],
  'L': [
    [1,0,0],
    [1,0,0],
    [1,0,0],
    [1,1,1]
  ],
  'M': [
    [1,1,1],
    [1,0,1],
    [1,0,1],
    [1,0,1]
  ],
  'N': [
    [1,1,1],
    [1,0,1],
    [1,0,1],
    [1,0,1]
  ],
  'O': [
    [1,1,1],
    [1,0,1],
    [1,0,1],
    [1,1,1]
  ],
  'P': [
    [1,1,1],
    [1,0,1],
    [1,1,1],
    [1,0,0]
  ],
  'Q': [
    [1,1,1],
    [1,0,1],
    [1,1,1],
    [0,0,1]
  ],
  'R': [
    [1,1,1],
    [1,0,1],
    [1,1,0],
    [1,0,1]
  ],
  'S': [
    [1,1,1],
    [1,0,0],
    [0,1,1],
    [1,1,1]
  ],
  'T': [
    [1,1,1],
    [0,1,0],
    [0,1,0],
    [0,1,0]
  ],
  'U': [
    [1,0,1],
    [1,0,1],
    [1,0,1],
    [1,1,1]
  ],
  'V': [
    [1,0,1],
    [1,0,1],
    [1,0,1],
    [0,1,0]
  ],
  'W': [
    [1,0,1],
    [1,0,1],
    [1,0,1],
    [1,1,1]
  ],
  'X': [
    [1,0,1],
    [0,1,0],
    [0,1,0],
    [1,0,1]
  ],
  'Y': [
    [1,0,1],
    [1,0,1],
    [0,1,0],
    [0,1,0]
  ],
  'Z': [
    [1,1,1],
    [0,1,0],
    [1,0,0],
    [1,1,1]
  ]
};

function generateAsciiArt(text, foreground = '☀️', background = '🌊') {
  text = text.toUpperCase();
  const lines = [];
  const height = 4;
  
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
        lines[i].push(...pattern[i].map(pixel => pixel ? foreground : background), background);
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