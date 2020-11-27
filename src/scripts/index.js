import Td from './td.js';
import "../styles/td.css";
import * as BABYLON from "babylonjs";

function component() {
    const element = document.createElement('canvas');
    element.id = "renderCanvas";
    return element;
}
function renderDiv(element) {
    let engine = new BABYLON.Engine(element, true);
    let scene = Td.createScene(element, engine);
    engine.runRenderLoop(function () {
        scene.render();
    })
    window.addEventListener('resize', () => {
        engine.resize();
    })
}
let divCom = component();
document.body.appendChild(divCom);
renderDiv(divCom);