'use strict';
class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'preload' });
    }

    preload() {
        this.load.image('bg', 'assets/background/uncolored_plain.png');
        this.load.image('frog1', 'assets/frog/1.png');
        this.load.image('frog2', 'assets/frog/2.png');
        this.load.image('tad1', 'assets/tadpole/1.png');
        this.load.image('tad2', 'assets/tadpole/2.png');
        this.load.image('tad3', 'assets/tadpole/3.png');
        this.load.image('tad4', 'assets/tadpole/4.png');
        this.load.image('kenney', 'assets/tileset/kenney_platformer.png');
        this.load.tilemapTiledJSON(1, 'assets/tilemap/level1.json');
        this.load.tilemapTiledJSON(2, 'assets/tilemap/test.json');
        this.load.tilemapTiledJSON(3, 'assets/tilemap/untitled.json');
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
