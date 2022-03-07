import { random } from '../others';
import { EVENT_TYPES, SHAPE_SIZE_LIMIT } from '../others';
import { AppModel } from '../models/app-model';
import { Shape } from '../models/shape';
import { AppView } from '../view/app-view';
export class AppController {
    
    model: AppModel;
    view: AppView;
    constructor(model, view)
    {
        this.model = model;
        this.view = view;

    }

    tick(containerSize: { width: number; height: number; }, shouldGenerate: boolean) {
        if(shouldGenerate)
        {
            this.addRandomShape();    
        }
        this.removeOutsideShapes();
        this.model.moveShapes();
        const area = this.model.area;
        const nr = this.model.numberOfShapes;
        this.view.updateInfo(area,nr);
    }
   
    public addShapeAtMouse(e) {
        let x:number = e.data.global.x;
        let y:number = e.data.global.y;
        let width = random(SHAPE_SIZE_LIMIT.WIDTH.MIN,SHAPE_SIZE_LIMIT.WIDTH.MAX);
        let height = random(SHAPE_SIZE_LIMIT.HEIGHT.MIN,SHAPE_SIZE_LIMIT.HEIGHT.MAX);

        let shape = this.model.addShape(x, y, width, height,[{x:x,y:y}] ,0);
        this.view.addSprite(shape.sprite);
        console.log("adaugat la"+ x +", "+y);
    }
   
    addRandomShape() {
        for(let i = 0; i < this.model.shapesPerSecond; i++) {
            
            let x = random(this.view.app.screen.left,this.view.app.screen.right);
            let y = -50;
            let width = random(SHAPE_SIZE_LIMIT.WIDTH.MIN,SHAPE_SIZE_LIMIT.WIDTH.MAX);
            let height = random(SHAPE_SIZE_LIMIT.HEIGHT.MIN,SHAPE_SIZE_LIMIT.HEIGHT.MAX);

            let shape = this.model.addShape(x, y, width, height,[{x:x,y:y}] ,0);
            this.view.addSprite(shape.sprite);
        }
    }
    removeOutsideShapes() {
        for(let i = 0; i < this.model.shapes.length; i++) {
            if(this.model.shapes[i].sprite.y > this.view.app.screen.bottom)
            {
                this.view.removeSprite(this.model.shapes[i].sprite);
                this.model.removeShape(this.model.shapes[i]);     
            }
        }
    }
}
