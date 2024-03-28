'use strict';
class CreditsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'credits' });
    }

    preload() {
        this.physics.world.drawDebug = false;
    }

    create() {
        this.add.text(400, 100, 'You Win!\nThanks for playing', {
            align: 'center',
            color: 'orange',
            fontFamily: '"Trebuchet MS", sans-serif',
            fontSize: '48pt',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        this.floor = this.physics.add.existing(this.add.line(225, 450, 450, 0).setOrigin(0), true);

        this.chars = this.physics.add.group();
        this.chars.create(290, 423, 'frog1').setScale(0.4);
        this.chars.create(350, 431, 'tad1').setScale(0.3);
        this.chars.create(400, 431, 'tad2').setScale(0.3);
        this.chars.create(450, 431, 'tad3').setScale(0.3);
        this.chars.create(500, 431, 'tad4').setScale(0.3);
        this.physics.add.collider(this.chars, this.floor);

        let members = this.chars.getChildren();
        let index = 0;
        setInterval(() => {
            if (index >= members.length) return index = 0;
            members[index].setVelocityY(-200);
            index++;
        }, 300);
    }
}