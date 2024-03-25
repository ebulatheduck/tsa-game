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
            color: '#31DE7A',
            stroke: '#23A35A',
            strokeThickness: 10
        }).setOrigin(0.5);
        button.setInteractive();

        button.on('pointerover', () => button.setColor('#21CE6A'));
        button.on('pointerout', () => button.setColor('#31DE7A'));
        button.on('pointerdown', () => this.scene.start('level'), this);
    }
}
