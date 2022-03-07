import * as PIXI from "pixi.js"
import { Triangle, Rectangle, Circle, Ellipse, Pentagon, Hexagon } from "./shape-types"
import { random } from "../others"
import { Shape } from './shape';
import { AppView } from '../view/app-view';

let shapeClasses = [Circle, Ellipse, Rectangle, Triangle , Pentagon, Hexagon];

export class AppModel {
    static app: PIXI.Application;
    _gravity: number;
    _shapesPerSecond: number;
    shapes: Shape[];
 
    constructor() {
        this.shapes = [];
        this.gravity = 1;
        this.shapesPerSecond = 1;

    }

    addShape(x, y, width, height, points:{x:any,y:any}[], id) {
        let sprite = this.createEmptySprite();
        let ShapeClass = shapeClasses[random(0, 5)]; 
        let shape = new ShapeClass(x, y, width, height, points,sprite, id);
        this.shapes.push(shape); 
        shape.sprite.on("click",this.removeOnClick);
        console.log("ceva nou");
        return shape; 
    }
    removeOnClick(e)
    {
        
    }
    createEmptySprite() {
        let sprite = new PIXI.Sprite();
        sprite.interactive = true;
        sprite.on("pointerdown", (event) => {
            AppModel.app.stage.removeChild(sprite);
            
        });
        return sprite;
    }

    moveShapes() {
        this.shapes.forEach(shape => {
            shape.move({ x: 0, y: this.gravity });
        });
    }
    
    removeShape(shapeToRemove) {
        let shapeIndex = this.shapes.findIndex(shape => shape.id === shapeToRemove.id);
        this.shapes.splice(shapeIndex, 1); 
    }

    removeFinishedShapes(containerSize) {
        this.shapes
            .filter(shape => shape.x >= containerSize.width || shape.y >= containerSize.height+40)
            .forEach((shape) => {
                this.removeShape(shape);
            });
    }
    
    
    public get area() {
        return Math.ceil(this.shapes.reduce((prev, curr) => prev + curr.area, 0));
    }

    get gravity() {
        return this._gravity;
    }

    set gravity(value) {
        this._gravity = Number(value);
    }

    get shapesPerSecond() {
        return this._shapesPerSecond;
    }

    set shapesPerSecond(value) {
        this._shapesPerSecond = Number(value);
    }

    get numberOfShapes() {
        return this.shapes.length;
    }

}