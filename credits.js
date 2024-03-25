'use strict';
class CreditsScene extends Phaser.Scene {
    constructor() {
        super({key: 'credits'});
    }

    create() {
        this.add.text(0, 0, 'yay you win', {
            fontFamily: '"Trebuchet MS", sans-serif'
        });
    }
}