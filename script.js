class ColorMatchGame {
    constructor() {
        this.score = 0;
        this.level = 1;
        this.timeLeft = 30;
        this.gameRunning = false;
        this.timer = null;
        this.targetColor = '';
        this.correctTile = null;
        
        this.colors = [
            // Reds and Pinks
            '#FF6B6B', '#FF3838', '#FF1744', 
            '#E91E63', '#C2185B', '#AD1457', '#880E4F', '#FF4081',
            '#F50057', '#FF1744', '#be04dfff', '#AA00FF', '#6200EA',
            
            // Oranges and Yellows
            '#FF9800', '#FF5722', '#FF7043', '#FF8A65', '#FFAB91',
            '#FFCC02', '#FFD600', '#FFEB3B', '#FFF176', '#FFF59D',
            '#FFF9C4', '#FF8F00', '#FF6F00', 
            
            // Greens
            '#4CAF50', '#8BC34A', '#CDDC39', '#9CCC65', '#7CB342',
            '#689F38', '#558B2F', '#33691E', '#1B5E20', '#00C853',
            '#00E676', '#00E5FF', '#00BCD4', '#009688', '#4DB6AC',
            '#26A69A', '#00897B', '#00695C', '#004D40', '#00BFA5',
            
            // Blues
            '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4FC3F7',
            '#29B6F6', '#0288D1', '#0277BD', '#01579B', '#0D47A1',
            '#1565C0', '#1976D2', '#1E88E5', '#42A5F5', '#64B5F6',
            '#90CAF9', '#BBDEFB', '#E3F2FD', '#E1F5FE', '#F3E5F5',
            
            // Purples and Violets
            '#9C27B0', '#673AB7', '#3F51B5', '#5E35B1', '#7B1FA2',
            '#6A1B9A', '#4A148C', '#311B92', '#1A237E', '#0D47A1',
            '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0',
            '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C', '#311B92',
            
            // Teals and Cyans
            '#009688', '#00BCD4', '#26C6DA', '#4DD0E1',
            '#B2EBF2', '#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC',
            '#26A69A', '#00897B', '#00695C', '#004D40', '#00BFA5',
            
            // Browns and Grays
            '#795548', '#8D6E63', '#A1887F', '#BCAAA4', '#d7ccc8c3',
            '#EFEBE9', '#5D4037', '#3E2723', '#212121',
            '#424242', '#616161', '#757575',
            '#f5f5f549', '#fafafaae', '#FFFFFF',
            
            // Additional vibrant colors
            '#FF1744', '#D500F9', '#AA00FF', '#6200EA', '#304FFE',
            '#2962FF', '#3c789dff', '#00B8D4', '#9cdfd6ff', '#00C853',
            '#64DD17', '#AEEA00', '#FFD600', '#FFAB00', '#FF6D00',
            '#FF3D00', '#993c25ff', '#FF1744', '#C51162', '#2fae26ff'
        ];
        
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
    }
    
    initializeElements() {
        this.scoreElement = document.getElementById('score');
        this.levelElement = document.getElementById('level');
        this.timerElement = document.getElementById('timer');
        this.targetColorElement = document.getElementById('target-color');
        this.gameGrid = document.getElementById('game-grid');
        this.startBtn = document.getElementById('start-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.gameOverModal = document.getElementById('game-over');
        this.finalScoreElement = document.getElementById('final-score');
        this.finalLevelElement = document.getElementById('final-level');
        this.playAgainBtn = document.getElementById('play-again-btn');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.playAgainBtn.addEventListener('click', () => this.playAgain());
    }
    
    startGame() {
        if (this.gameRunning) return;
        
        this.gameRunning = true;
        this.startBtn.textContent = 'Game Running...';
        this.startBtn.disabled = true;
        
        this.generateNewRound();
        this.startTimer();
    }
    
    resetGame() {
        this.stopGame();
        this.score = 0;
        this.level = 1;
        this.timeLeft = 30;
        this.updateDisplay();
        this.clearGrid();
        this.startBtn.textContent = 'Start Game';
        this.startBtn.disabled = false;
    }
    
    stopGame() {
        this.gameRunning = false;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }
    
    generateNewRound() {
        this.clearGrid();
        
        // Select target color
        this.targetColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.targetColorElement.style.backgroundColor = this.targetColor;
        
        // Create grid tiles
        const gridSize = Math.min(16, 8 + this.level * 2); // Increase grid size with level
        const tiles = [];
        
        // Add correct color tile
        tiles.push(this.targetColor);
        
        // Add similar but different colors
        const similarColors = this.generateSimilarColors(this.targetColor, gridSize - 1);
        tiles.push(...similarColors);
        
        // Shuffle tiles
        this.shuffleArray(tiles);
        
        // Create DOM elements
        tiles.forEach((color, index) => {
            const tile = document.createElement('div');
            tile.className = 'color-tile';
            tile.style.backgroundColor = color;
            
            if (color === this.targetColor) {
                this.correctTile = tile;
            }
            
            tile.addEventListener('click', () => this.handleTileClick(tile, color));
            this.gameGrid.appendChild(tile);
        });
    }
    
    generateSimilarColors(targetColor, count) {
        const colors = [];
        const targetRGB = this.hexToRgb(targetColor);
        
        for (let i = 0; i < count; i++) {
            let color;
            
            // Use different strategies to generate colors
            const strategy = Math.floor(Math.random() * 4);
            
            switch (strategy) {
                case 0:
                    // Similar color with slight variation
                    const variation = 20 + Math.random() * 40;
                    const r = Math.max(0, Math.min(255, targetRGB.r + (Math.random() - 0.5) * variation));
                    const g = Math.max(0, Math.min(255, targetRGB.g + (Math.random() - 0.5) * variation));
                    const b = Math.max(0, Math.min(255, targetRGB.b + (Math.random() - 0.5) * variation));
                    color = this.rgbToHex(r, g, b);
                    break;
                    
                case 1:
                    // Complementary color with variation
                    const compR = Math.max(0, Math.min(255, 255 - targetRGB.r + (Math.random() - 0.5) * 30));
                    const compG = Math.max(0, Math.min(255, 255 - targetRGB.g + (Math.random() - 0.5) * 30));
                    const compB = Math.max(0, Math.min(255, 255 - targetRGB.b + (Math.random() - 0.5) * 30));
                    color = this.rgbToHex(compR, compG, compB);
                    break;
                    
                case 2:
                    // Random color from our palette (but not the target)
                    let randomColor;
                    do {
                        randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
                    } while (randomColor === targetColor);
                    color = randomColor;
                    break;
                    
                case 3:
                    // Analogous color (shift hue)
                    const hsl = this.rgbToHsl(targetRGB.r, targetRGB.g, targetRGB.b);
                    const newHue = (hsl.h + (Math.random() - 0.5) * 60) % 360;
                    const newColor = this.hslToRgb(newHue, hsl.s, hsl.l);
                    color = this.rgbToHex(newColor.r, newColor.g, newColor.b);
                    break;
            }
            
            // Ensure we don't have duplicate colors
            if (!colors.includes(color) && color !== targetColor) {
                colors.push(color);
            } else {
                // If duplicate, try again with a different approach
                i--;
            }
        }
        
        return colors;
    }
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        return { h: h * 360, s: s * 100, l: l * 100 };
    }
    
    hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    handleTileClick(tile, color) {
        if (!this.gameRunning) return;
        
        if (color === this.targetColor) {
            // Correct!
            tile.classList.add('correct');
            this.score += 10 + this.level * 5;
            
            // Level up every 5 correct answers
            if (this.score % 50 === 0) {
                this.level++;
                this.timeLeft += 10; // Bonus time
            }
            
            setTimeout(() => {
                tile.classList.remove('correct');
                this.generateNewRound();
            }, 500);
            
        } else {
            // Wrong!
            tile.classList.add('wrong');
            this.score = Math.max(0, this.score - 5);
            
            setTimeout(() => {
                tile.classList.remove('wrong');
            }, 500);
        }
        
        this.updateDisplay();
    }
    
    clearGrid() {
        this.gameGrid.innerHTML = '';
        this.correctTile = null;
    }
    
    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.levelElement.textContent = this.level;
        this.timerElement.textContent = this.timeLeft;
    }
    
    endGame() {
        this.stopGame();
        this.finalScoreElement.textContent = this.score;
        this.finalLevelElement.textContent = this.level;
        this.gameOverModal.classList.remove('hidden');
    }
    
    playAgain() {
        this.gameOverModal.classList.add('hidden');
        this.resetGame();
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ColorMatchGame();
}); 