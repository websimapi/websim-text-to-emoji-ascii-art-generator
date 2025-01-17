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

// Enhanced color to emoji mapping with more accurate colors
const COLOR_EMOJIS = {
  red: '❤️',
  orange: '🧡',
  yellow: '💛',
  green: '💚',
  blue: '💙',
  purple: '💜',
  brown: '🤎',
  black: '🖤',
  white: '🤍',
  pink: '🎀',
  teal: '🔷',
  gray: '⬜️'
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

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function findClosestColorEmoji(r, g, b, a) {
  // Skip fully transparent pixels
  if (a === 0) return ' ';

  // Enhanced color reference points for better matching
  const colors = {
    red: [255, 0, 0],
    orange: [255, 165, 0],
    yellow: [255, 255, 0],
    green: [0, 128, 0],
    blue: [0, 0, 255],
    purple: [128, 0, 128],
    brown: [139, 69, 19],
    black: [0, 0, 0],
    white: [255, 255, 255],
    pink: [255, 192, 203],
    teal: [0, 128, 128],
    gray: [128, 128, 128]
  };

  // Calculate color distances using a weighted approach
  let minDistance = Infinity;
  let closestColor = 'black';

  // Weighted components for human perception
  const weights = {
    r: 0.299,
    g: 0.587,
    b: 0.114
  };

  for (const [color, [r2, g2, b2]] of Object.entries(colors)) {
    const distance = Math.sqrt(
      weights.r * Math.pow(r - r2, 2) + 
      weights.g * Math.pow(g - g2, 2) + 
      weights.b * Math.pow(b - b2, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = color;
    }
  }

  return COLOR_EMOJIS[closestColor];
}

function convertImageToEmojis(imageElement, maxWidth, maxHeight) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Calculate new dimensions maintaining aspect ratio
  const aspectRatio = imageElement.width / imageElement.height;
  let newWidth = maxWidth;
  let newHeight = maxWidth / aspectRatio;

  if (newHeight > maxHeight) {
    newHeight = maxHeight;
    newWidth = maxHeight * aspectRatio;
  }

  canvas.width = Math.floor(newWidth);
  canvas.height = Math.floor(newHeight);
  
  // Use better image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // Clear canvas and draw image
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  
  let result = '';
  
  // Process pixels with proper orientation
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const i = (y * canvas.width + x) * 4;
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];
      
      result += findClosestColorEmoji(r, g, b, a);
    }
    result += '\n';
  }
  
  return result;
}

// DOM Elements
const textInput = document.getElementById('text');
const foregroundInput = document.getElementById('foreground');
const backgroundInput = document.getElementById('background');
const generateBtn = document.getElementById('generate');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copy');
const imageUpload = document.getElementById('image-upload');
const convertImageBtn = document.getElementById('convert-image');
const maxWidthInput = document.getElementById('max-width');
const maxHeightInput = document.getElementById('max-height');
const preview = document.getElementById('preview');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Tab switching
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
  });
});

// Text to Emoji events
generateBtn.addEventListener('click', () => {
  const text = textInput.value;
  const foreground = foregroundInput.value;
  const background = backgroundInput.value;
  
  const art = generateAsciiArt(text, foreground, background);
  output.textContent = art;
});

// Image to Emoji events
imageUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        preview.style.display = 'block';
        const ctx = preview.getContext('2d');
        
        // Maintain aspect ratio for preview
        const maxPreviewWidth = 300;
        const maxPreviewHeight = 300;
        let previewWidth = img.width;
        let previewHeight = img.height;
        
        if (previewWidth > maxPreviewWidth) {
          previewHeight = (maxPreviewWidth / previewWidth) * previewHeight;
          previewWidth = maxPreviewWidth;
        }
        if (previewHeight > maxPreviewHeight) {
          previewWidth = (maxPreviewHeight / previewHeight) * previewWidth;
          previewHeight = maxPreviewHeight;
        }
        
        preview.width = previewWidth;
        preview.height = previewHeight;
        ctx.clearRect(0, 0, preview.width, preview.height);
        ctx.drawImage(img, 0, 0, preview.width, preview.height);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

convertImageBtn.addEventListener('click', () => {
  const img = new Image();
  img.onload = () => {
    const result = convertImageToEmojis(
      img, 
      parseInt(maxWidthInput.value), 
      parseInt(maxHeightInput.value)
    );
    output.textContent = result;
  };
  img.src = preview.toDataURL();
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