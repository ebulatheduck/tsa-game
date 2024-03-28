'use strict';
const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#B6D9E7',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 350 },
            debug: true
        }
    },
    scene: [PreloadScene, TitleScene, LevelScene, CreditsScene]
});

// debugging keybinds
document.body.addEventListener('keypress', e => {
    if (e.key == 'q') debugger;
    if (e.key == 'e') game.scene.scenes[2]?.nextLevel();
    if (e.key == 'f') {
        let scene = game.scene.scenes[2];
        if (scene.physics.world.drawDebug) {
            scene.physics.world.drawDebug = false;
            scene.physics.world.debugGraphic.clear();
        } else {
            scene.physics.world.drawDebug = true;
        }
    }
});
