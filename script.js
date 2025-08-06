class ColorMatchGame {
    constructor() {
        this.score = 0;
        this.level = 1;
        this.timeLeft = 40; // 40 seconds per level
        this.gameRunning = false;
        this.timer = null;
        this.targetColor = '';
        this.correctTile = null;
        
        // All colors (unchanged)
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

        // Bright, saturated colors
        this.brightColors = [
            '#FF0000', '#FF4500', '#FF8C00', '#FFD700', '#FFFF00',
            '#39FF14', '#00FF00', '#00FA9A', '#00FFFF', '#1E90FF',
            '#0000FF', '#8A2BE2', '#FF00FF', '#FF1493', '#FF69B4',
            '#FF6347', '#FF7F50', '#00CED1', '#40E0D0', '#00BFFF',
            '#7CFC00', '#32CD32', '#ADFF2F', '#00FF7F', '#00FFEF',
            '#FF00CC', '#FF0099', '#FF007F', '#FF0066', '#FF0055',
            '#FF0044', '#FF0033', '#FF0022', '#FF0011', '#FF00AA',
            '#FF00BB', '#FF00DD', '#FF00EE', '#FF00FF', '#FF3300',
            '#FF6600', '#FF9900', '#FFCC00', '#FFFF33', '#FFFF66',
            '#FFFF99', '#33FF00', '#66FF00', '#99FF00', '#CCFF00',
            '#00FF33', '#00FF66', '#00FF99', '#00FFCC', '#00FFFF',
            '#33FFFF', '#66FFFF', '#99FFFF', '#CCFFFF', '#3300FF',
            '#6600FF', '#9900FF', '#CC00FF', '#FF33FF', '#FF66FF',
            '#FF99FF', '#FFCCFF', '#FF0033', '#FF3366', '#FF6699',
            '#FF99CC', '#FFCCFF', '#FF0066', '#FF3399', '#FF66CC',
            '#FF99FF', '#FFCCFF', '#FF00CC', '#FF33CC', '#FF66CC',
            '#FF99CC', '#FFCC99', '#FFCC66', '#FFCC33', '#FFCC00',
            '#FF9900', '#FF6600', '#FF3300', '#FF0000', '#FF0033',
            '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#CC00FF',
            '#9900FF', '#6600FF', '#3300FF', '#0000FF', '#0033FF',
            '#0066FF', '#0099FF', '#00CCFF', '#00FFFF', '#00FFCC',
            '#00FF99', '#00FF66', '#00FF33', '#00FF00', '#33FF00',
            '#66FF00', '#99FF00', '#CCFF00', '#FFFF00', '#FFCC00',
            '#FF9900', '#FF6600', '#FF3300', '#FF0000'
        ];

        // Light, pastel colors
        this.lightColors = [
            '#FFB6C1', '#FFC0CB', '#FFE4E1', '#FFF0F5', '#FDF5E6',
            '#F5DEB3', '#F0E68C', '#F0F8FF', '#E6E6FA', '#F8F8FF',
            '#F0FFF0', '#F5FFFA', '#F0FFFF', '#F0F8FF', '#E6F3FF',
            '#E6F7FF', '#E6FBFF', '#F0F8FF', '#F5F5DC', '#FAF0E6',
            '#FDF5E6', '#FFF8DC', '#FFFACD', '#FFFFE0', '#FFFFF0',
            '#FAFAD2', '#F0FFF0', '#F0F8FF', '#E0FFFF', '#E6E6FA',
            '#F8F8FF', '#F5F5F5', '#F0F0F0', '#E8E8E8', '#DCDCDC',
            '#D3D3D3', '#C0C0C0', '#A9A9A9', '#808080', '#696969',
            '#FFE4B5', '#FFDAB9', '#FFE4C4', '#FFD8BF', '#FFE4D4',
            '#FFE4E1', '#FFE4F3', '#FFE4F7', '#FFE4FA', '#FFE4FD',
            '#E6E6FA', '#E6F3FF', '#E6F7FF', '#E6FBFF', '#E6FFFF',
            '#F0F8FF', '#F0F0FF', '#F0F8FF', '#F0FFFF', '#F0FFF0',
            '#F5F5DC', '#F5F5F5', '#F5FFFA', '#F5FFFF', '#FAF0E6',
            '#FAFAD2', '#FAFAFA', '#FDF5E6', '#FDFFF0', '#FFFFE0',
            '#FFFFF0', '#FFFFFA', '#FFFFFF', '#F8F8FF', '#F0F8FF',
            '#E6E6FA', '#E0FFFF', '#E0F8FF', '#E0F0FF', '#E0E8FF',
            '#E0E0FF', '#E0D8FF', '#E0D0FF', '#E0C8FF', '#E0C0FF',
            '#E0B8FF', '#E0B0FF', '#E0A8FF', '#E0A0FF', '#E098FF',
            '#E090FF', '#E088FF', '#E080FF', '#E078FF', '#E070FF',
            '#E068FF', '#E060FF', '#E058FF', '#E050FF', '#E048FF',
            '#E040FF', '#E038FF', '#E030FF', '#E028FF', '#E020FF',
            '#E018FF', '#E010FF', '#E008FF', '#E000FF', '#D8F8FF',
            '#D0F0FF', '#C8E8FF', '#C0E0FF', '#B8D8FF', '#B0D0FF',
            '#A8C8FF', '#A0C0FF', '#98B8FF', '#90B0FF', '#88A8FF',
            '#80A0FF', '#7898FF', '#7090FF', '#6888FF', '#6080FF',
            '#5878FF', '#5070FF', '#4868FF', '#4060FF', '#3858FF',
            '#3050FF', '#2848FF', '#2040FF', '#1838FF', '#1030FF',
            '#0828FF', '#0020FF', '#0018FF', '#0010FF', '#0008FF'
        ];

        // Track current color mode (bright or light)
        this.currentColorMode = 'bright'; // Start with bright colors

        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
    }
    
    setRandomTargetColor() {
        // Pick a random color from either bright or light colors
        const allColors = [...this.brightColors, ...this.lightColors];
        const randomColor = allColors[Math.floor(Math.random() * allColors.length)];
        this.targetColorElement.style.backgroundColor = randomColor;
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
        
        // Set a random color in the target circle on page load
        this.setRandomTargetColor();
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
        this.timeLeft = 40; // Reset to 40 seconds
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
        
        // Determine number of boxes based on level (4 levels only)
        const boxesPerLevel = {
            1: 3,  // Level 1: 3 boxes
            2: 4,  // Level 2: 4 boxes
            3: 5,  // Level 3: 5 boxes
            4: 6   // Level 4: 6 boxes
        };
        
        const gridSize = boxesPerLevel[this.level] || 6; // Max 6 boxes for level 4
        const tiles = [];

        // Alternate between bright and light colors
        this.currentColorMode = this.currentColorMode === 'bright' ? 'light' : 'bright';
        let colorSource = this.currentColorMode === 'bright' ? this.brightColors : this.lightColors;

        // Select target color
        this.targetColor = colorSource[Math.floor(Math.random() * colorSource.length)];
        this.targetColorElement.style.backgroundColor = this.targetColor;
        
        // Add correct color tile
        tiles.push(this.targetColor);
        
        // Add similar but different colors
        const similarColors = this.generateSimilarColors(this.targetColor, gridSize - 1, colorSource);
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
        
        // Update grid layout based on number of tiles
        this.updateGridLayout(gridSize);
    }
    
    updateGridLayout(gridSize) {
        // Determine grid columns based on number of tiles (4 levels max)
        let columns;
        if (gridSize <= 3) {
            columns = 3; // Level 1: 3 boxes in a row
        } else if (gridSize <= 6) {
            columns = 3; // Levels 2-4: 3 boxes per row, multiple rows
        }
        
        this.gameGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }
    
    showLevelUpMessage() {
        // Create level up notification
        const levelUpDiv = document.createElement('div');
        levelUpDiv.className = 'level-up-message';
        
        let message;
        if (this.level === 4) {
            message = `
                <div class="level-up-content">
                    <h2>🎉 Final Level! 🎉</h2>
                    <p>Level 4: Choose from ${this.getBoxesForLevel(this.level)} boxes!</p>
                    <p>You've reached the maximum level!</p>
                </div>
            `;
        } else {
            const nextPointsNeeded = this.level === 1 ? 250 : this.level === 2 ? 350 : 400;
            message = `
                <div class="level-up-content">
                    <h2>🎉 Level ${this.level}! 🎉</h2>
                    <p>Now choose from ${this.getBoxesForLevel(this.level)} boxes!</p>
                    <p>Next level at ${nextPointsNeeded} points</p>
                </div>
            `;
        }
        
        levelUpDiv.innerHTML = message;
        document.body.appendChild(levelUpDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (levelUpDiv.parentNode) {
                levelUpDiv.parentNode.removeChild(levelUpDiv);
            }
        }, 3000);
    }
    
    getBoxesForLevel(level) {
        const boxesPerLevel = {
            1: 3, 2: 4, 3: 5, 4: 6
        };
        return boxesPerLevel[level] || 6;
    }
    
    generateSimilarColors(targetColor, count, colorSource) {
        // Pick random colors from the current color source (bright or light)
        const colors = [];
        while (colors.length < count) {
            let randomColor;
            do {
                randomColor = colorSource[Math.floor(Math.random() * colorSource.length)];
            } while (randomColor === targetColor || colors.includes(randomColor));
            colors.push(randomColor);
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
            
            // Check if player should level up (increased points for levels 1-3)
            let pointsNeeded;
            if (this.level === 1) {
                pointsNeeded = 150; // Level 1: 150 points (was 100)
            } else if (this.level === 2) {
                pointsNeeded = 250; // Level 2: 250 points (was 200)
            } else if (this.level === 3) {
                pointsNeeded = 350; // Level 3: 350 points (was 300)
            } else {
                pointsNeeded = 400; // Level 4: 400 points (unchanged)
            }

            let newLevel = Math.min(4, Math.floor(this.score / pointsNeeded) + 1);
            if (this.level < 4 && newLevel > this.level) {
                this.level = newLevel;
                this.timeLeft = 40; // Reset to 40 seconds for new level
                this.showLevelUpMessage();
            }
            
            setTimeout(() => {
                tile.classList.remove('correct');
                this.generateNewRound();
            }, 500);
            
        } else {
            // Wrong!
            tile.classList.add('wrong');
            this.score = Math.max(0, this.score - 5);
            this.timeLeft = Math.max(0, this.timeLeft - 2); // Decrease time by 2 seconds
            
            // Add visual timer penalty effect
            this.timerElement.classList.add('timer-penalty');
            setTimeout(() => {
                this.timerElement.classList.remove('timer-penalty');
            }, 500);
            
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
        
        // Add final score message
        const finalScoreMessage = document.getElementById('final-score-message');
        if (finalScoreMessage) {
            finalScoreMessage.textContent = `Congratulations! You scored ${this.score} points!`;
        }
        
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