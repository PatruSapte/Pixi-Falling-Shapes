const PIXI = require('pixi.js');
import { random } from '../others';
import { EVENT_TYPES, SHAPE_SIZE_LIMIT } from '../others';
import { AppController } from '../controller/app-controller';

/*
* The purpose of View class is to notify controller about changes in DOM
* and to expose API for DOM manipulations
* */
export class AppView {
    public app: PIXI.Application;
    $numberOfShapes: HTMLElement;
    $coveredArea: HTMLElement;
    background: any;

    constructor(app) {
        this.app = app;
        this.$numberOfShapes = document.getElementById('number-of-shapes');
        this.$coveredArea = document.getElementById('covered-area');
        this.addBackground();
        
    }

    tick(){
        
    }
    addBackground() {
        const g:PIXI.Graphics = new PIXI.Graphics();
        g.beginFill(0xffffff);
        g.lineStyle(1,0x000000);
        g.drawRect(0, 0, this.app.screen.width-1, this.app.screen.height-1);
        g.endFill();
        
        this.background = new PIXI.Sprite(this.app.renderer.generateTexture(g,1,1));
        this.background.interactive = true;
        this.app.stage.addChild(this.background);
    }

    addSprite(sprite) {
        this.app.stage.addChild(sprite);
    }

    removeSprite(sprite) {
        this.app.stage.removeChild(sprite);
        sprite.click = null;
        sprite.destroy();
    }

    updateInfo(coveredArea, numberOfShapes) {
        this.$coveredArea.innerText = `${coveredArea} px^2`;
        this.$numberOfShapes.innerText = numberOfShapes;
    }

    _getRandomShapeData(position) {
        return Object.assign({}, position, {
            width: random(SHAPE_SIZE_LIMIT.WIDTH.MIN, SHAPE_SIZE_LIMIT.WIDTH.MAX),
            height: random(SHAPE_SIZE_LIMIT.HEIGHT.MIN, SHAPE_SIZE_LIMIT.HEIGHT.MAX)
        });
    }
}
