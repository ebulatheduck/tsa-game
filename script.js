'use strict';
const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 350 },
            debug: true
        }
    },
    scene: [PreloadScene, TitleScene, LevelScene, CreditsScene]
});

document.body.addEventListener('keypress', e => {
    if (e.key == 'e') game.scene.scenes[2]?.nextLevel();
});
