'use strict';
class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'title' });
    }

    create() {
        this.add.image(400, 300, 'bg');
        let button = this.add.text(400, 300, 'Play', {
            fontFamily: '"Days One", "Trebuchet MS", sans-serif',
            fontSize: '40pt',
            color: 'green'
        }).setOrigin(0.5);
        button.setInteractive();

        button.on('pointerover', () => button.setColor('red'));
        button.on('pointerout', () => button.setColor('green'));
        button.on('pointerdown', () => this.scene.start('level'), this);
    }
}
