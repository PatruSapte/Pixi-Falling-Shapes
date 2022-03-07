import { Shape } from "./shape";
import { random } from "../others";

export class Circle extends Shape {
    constructor(x, y, width, height, points:{x:any,y:any}[], sprite, id)
    {
        super(x, y, width, height, points, sprite, id);
    }

    render() {
        let g = new PIXI.Graphics();
        g.lineStyle(1,0x000000);
        g.beginFill(this.color);
        g.drawCircle(this.x, this.y, this.width / 2);
        g.endFill();
        return g;
    }

    getArea() {
        return Math.PI * Math.pow(this.width / 2, 2);
    }

}

export class Ellipse extends Shape {
    constructor(x, y, width, height, points:{x:any,y:any}[], sprite, id)
    {
        super(x, y, width, height, points, sprite, id);
    }

    render() {
        let g = new PIXI.Graphics();
        g.lineStyle(1,0x000000);
        g.beginFill(this.color);
        g.drawEllipse(this.x, this.y, this.width / 2, this.height / 2);
        g.endFill();
        return g;
    }

    getArea() {
        return Math.PI * (this.width / 2) * (this.height / 2);
    }

}


export class Rectangle extends Shape {
    constructor(x, y, width, height, points:{x:any,y:any}[], sprite, id)
    {
        super(x, y, width, height, points, sprite, id);
    }

    render() {
        let g = new PIXI.Graphics();
        g.lineStyle(1,0x000000);
        g.beginFill(this.color);
        g.drawRect(this.x, this.y, this.width , this.height);
        g.endFill();
        return g;
    }

    getArea() {
        return this.width * this.height;
    }

}

export class Triangle extends Shape {
    constructor(x, y, width, height, points:{x:any,y:any}[], sprite, id)
    {
        points.push({ x: random(0, x + width / 2), y: random(y + height / 3, y + height) });
        points.push({ x: random(Math.max(0, x - width / 2), x), y: random(y + height / 3, y + height) });
        
        super(x, y, width, height, points, sprite, id);
    }
    
}

export class Pentagon extends Shape {
    constructor(x, y, width, height, points:{x:any,y:any}[], sprite, id)
    {
        points.push({ x: random(x, x + width / 2), y: random(y, y + height / 2) });
        points.push({ x: random(x, x + width / 2), y: random(y + height / 2, y + height) });
        points.push({ x: random(Math.max(0, x - width / 2), x), y: random(y + height / 2, y + height) });
        points.push({ x: random(Math.max(0, x - width / 2), x), y: random(y, y + height / 2) });

        super(x, y, width, height, points, sprite, id);
    }
}

export class Hexagon extends Shape {
    constructor(x, y, width, height, points:{x:any,y:any}[], sprite, id)
    {
        points.push({ x: random(x, x + width / 2), y: random(y, y + height / 2) });
        points.push({ x: random(x, x + width / 2), y: random(y + height / 2, y + height) });
        points.push({ x: x, y: y + height });
        points.push({ x: random(Math.max(0, x - width / 2), x), y: random(y + height / 2, y + height) });
        points.push({ x: random(Math.max(0, x - width / 2), x), y: random(y, y + height / 2) })
       
        super(x, y, width, height, points, sprite, id);
    }
}