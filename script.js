'use strict';
let player, cursors;

class Scene extends Phaser.Scene {
    preload = () => {
        cursors = this.input.keyboard.createCursorKeys();

        // TODO: Replace test images with actual sprites
        this.load.image('chrome', 'assets/chrome-blank.png');
        this.load.image('train', 'assets/image0-17.png');
        this.load.image('ios', 'assets/ios_sample.png');
    }

    create = () => {
        this.add.image(800, 500, 'chrome');
        player = this.physics.add.image(300, 100, 'ios');
        player.setCollideWorldBounds(true);
        player.setBounce(0.1);
    }

    update = () => {
        player.setVelocityX(
            cursors.left.isDown ? -200 :
            cursors.right.isDown ? 200 : 0);

        if (cursors.up.isDown && player.body.blocked.down) {
            player.setVelocityY(-330);
        }
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: Scene
});
