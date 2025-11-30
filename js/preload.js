'use strict';
class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'preload' });
    }

    preload() {
        this.cameras.main.setBackgroundColor(''); // black background
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        this.add.text(400, 250, 'Loading...', {
            font: '20px Courier, monospace',
            fill: '#ffffff'
        }).setOrigin(0.5);

        var percentText = this.add.text(400, 295, '0%', {
            font: '18px Courier, monospace',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.load.on('progress', (v) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * v, 30);
            percentText.setText(parseInt(v * 100) + '%');
        });

        this.load.image('frog1', '../assets/frog1.png');
        this.load.image('frog2', '../assets/frog2.png');
        this.load.image('tad1', '../assets/tad1.png');
        this.load.image('tad2', '../assets/tad2.png');
        this.load.image('tad3', '../assets/tad3.png');
        this.load.image('tad4', '../assets/tad4.png');
        this.load.image('title', '../assets/title.png');
        this.load.image('wasd', '../assets/wasdarrows.png');
        this.load.image('bg', '../assets/uncolored_plain.png');
        this.load.image('kenney', '../assets/kenney_platformer.png');
        this.load.audio('jump', ['../assets/jump.mp3', '../assets/jump.ogg']);
        this.load.audio('win', ['../assets/win.mp3', '../assets/win.ogg']);
        this.load.tilemapTiledJSON(1, '../assets/level1.json');
        this.load.tilemapTiledJSON(2, '../assets/level2.json');
        this.load.tilemapTiledJSON(3, '../assets/level3.json');
    }

    async create() {
        try {
            await this.loadFonts('Days One', 'assets/DaysOne-Regular.ttf');
        } catch (error) {
            console.error('Could not load custom fonts');
        }

        this.scene.start('title');
    }

    async loadFonts(name, url) {
        const font = new FontFace(name, `url(${url})`);

        try {
            await font.load();
            document.fonts.add(font);
        } catch (error) {
            console.error(`Could not load font ${name}: ${error.message}`);
        };
    }
}
