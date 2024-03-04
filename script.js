'use strict';
let player, cursors, platforms;
let {KeyCodes} = Phaser.Input.Keyboard;

class Scene extends Phaser.Scene {
    preload = () => {
        cursors = this.input.keyboard.addKeys({
            W: KeyCodes.W,
            A: KeyCodes.A,
            S: KeyCodes.S,
            D: KeyCodes.D,
            up: KeyCodes.UP,
            down: KeyCodes.DOWN,
            left: KeyCodes.LEFT,
            right: KeyCodes.RIGHT
        });

        // TODO: Replace test images with actual sprites
        this.load.image('chrome', 'assets/chrome-blank.png');
        this.load.image('train', 'assets/image0-17.png');
        this.load.image('ios', 'assets/ios_sample.png');
    }

    create = () => {
        this.add.image(800, 500, 'chrome');

        platforms = this.physics.add.staticGroup();
        platforms.create(400, 450, 'train').setScale(0.5, 0.05).refreshBody();
        platforms.create(100, 300, 'train').setScale(0.5, 0.05).refreshBody();
        
        player = this.physics.add.image(700, 600, 'ios');
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platforms);
    }

    update = () => {
        player.setVelocityX(
            cursors.left.isDown || cursors.A.isDown ? -200 :
            cursors.right.isDown || cursors.D.isDown ? 200 : 0);

        if ((cursors.up.isDown || cursors.W.isDown) && player.body.blocked.down) {
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
            debug: true
        }
    },
    scene: Scene
});
