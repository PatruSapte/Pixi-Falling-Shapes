import { polygonArea, getConvextPolygonPath } from '../others';
import * as PIXI from "pixi.js"
import { Graphics, Application } from 'pixi.js';
import { AppModel } from './app-model';
export class Shape {
    id: any;
    width: any;
    height: any;
    color: any;
    points: {x:number,y:number}[];
    sprite: PIXI.Sprite;
    x: any;
    y: any;
    area: any;
    constructor(x, y, width, height, points:{x:number,y:number}[], sprite, id)
    {

        this.id = id;
        this.width = width;
        this.height = height;
        this.color = this.makeColor();
        this.points = points;
        this.sprite = sprite;
        this.x = x;
        this.y = y;
      
        this.area = this.getArea();
        this.initSprite(this.render());
    }
    move(deltaPosition) {
        this.sprite.position.x += deltaPosition.x;
        this.sprite.position.y += deltaPosition.y;
    }
    makeColor() {
        return parseInt(Math.floor(Math.random() * 16777215).toString(), 16);
    }
    initSprite(g: Graphics) {
        if (g != null) {
            this.sprite.texture = AppModel.app.renderer.generateTexture(g,1,1);
            this.sprite.setTransform(this.x,this.y,1,1);
            this.sprite.anchor.set(0.5,0.5);
            g.destroy();
        }   
    }
 
    render(): any {
        if(!this.points) {
            return;
        }
        
        let pixiPoints = getConvextPolygonPath(this.points,this.points.length);

        let g: PIXI.Graphics = new PIXI.Graphics();
        g.lineStyle(1, 0x000000);
        g.beginFill(this.color);
        //g.moveTo(this.x, this.y)
        g.drawPolygon(pixiPoints);
        g.closePath();
        return g;
    }
    
    getArea(): any {
        if(!this.points) {
            return;
        }
        let top = { x: this.x, y: this.y};
        return polygonArea([top].concat(this.points).concat([top]));
    }
}