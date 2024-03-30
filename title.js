'use strict';
class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'title' });
    }

    create() {
        this.add.image(400, 300, 'bg');
        this.add.image(400, 150, 'title').setScale(0.7);
        this.add.image(76, 530, 'wasd').setScale(0.1);
        this.add.image(747, 549, 'frog1').setScale(0.5);
        let button = this.add.text(400, 350, 'Play', {
            fontFamily: '"Days One", "Trebuchet MS", sans-serif',
            fontSize: '40pt',
            color: '#4CF587',
            stroke: '#29B364',
            strokeThickness: 10
        }).setOrigin(0.5);
        button.setInteractive();

        button.on('pointerover', () => button.setColor('#31DE7A'));
        button.on('pointerout', () => button.setColor('#4CF587'));
        button.on('pointerdown', () => this.scene.start('level'), this);
    }
}
