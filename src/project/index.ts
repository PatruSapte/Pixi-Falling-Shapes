import * as PIXI from "pixi.js";
import { AppModel } from "./models/app-model";
import { AppController } from './controller/app-controller';
import { AppView } from "./view/app-view";

const appContainer = document.getElementById('app');
const app = new PIXI.Application();
//const app = new PIXI.Application({resizeTo:window});

app.stage.interactive = true;

appContainer.appendChild(app.view);

AppModel.app = app;

let view = new AppView(app);
const model = new AppModel();
const controller = new AppController(model, view);
let renderCounter = 0;
window.onload  =function () {
    app.stage.on("pointerdown", (e) => {
        controller.addShapeAtMouse(e);
    })

}
app.ticker.add(() => {
    const containerSize = { width: app.view.clientWidth, height: app.view.clientHeight };
    const tickerInterval = app.ticker.elapsedMS; // ~16.6667ms by default
    const shouldGenerate = renderCounter * tickerInterval % 1000 < tickerInterval;
    //view.tick();
    controller.tick(containerSize, shouldGenerate);
    view.tick();
    renderCounter++;
});


