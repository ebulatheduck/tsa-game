class Scene extends Phaser.Scene {
    preload = () => {
        this.load.image('chrome', 'assets/chrome-blank.png');
        this.load.image('train', 'assets/image0-17.png');
        this.load.image('ios', 'assets/ios_sample.png');
    }

    create = () => {
        this.add.image(800, 600, 'chrome');
        this.add.image(300, 500, 'ios').setScale(4, 2);
    }

    update = () => {
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
