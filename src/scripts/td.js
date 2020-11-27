import * as BABYLON from "babylonjs";

export default class Td {
    constructor() {}
    static createScene(canvas, engine = new BABYLON.Engine(canvas, true)) {
        const scene = new BABYLON.Scene(engine);
        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
        camera.attachControl(canvas, true);

        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
        const sound = new BABYLON.Sound("name", "url to sound file", scene, null, {
            loop: true,
            autoplay: true
        });
        const box = this.buildBox();
        const roof = this.buildRoof();
        const ground = this.buildGround(); 
        const house= BABYLON.Mesh.MergeMeshes([box,roof]);
        return scene;
    }
    static buildGround() {
        const groundMat = new BABYLON.StandardMaterial("groundMat");
        groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);

        const ground = BABYLON.MeshBuilder.CreateGround("ground", {
            width: 10,
            height: 10
        });
        ground.material = groundMat;
        return ground;
    }

    static buildBox() {
        const boxMat = new BABYLON.StandardMaterial("boxMat");
        boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png");
        const faceUV = [];
        faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
        faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
        faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right face
        faceUV[3] = new BABYLON.Vector4(0.75, 0.0, 1.0, 1.0); //left face

        const box = BABYLON.MeshBuilder.CreateBox("box", {
            faceUV: faceUV,
            wrap: true
        });
        box.material = boxMat;
        box.position.y = 0.5;
        return box;
    }
    static buildRoof() {
        const roofMat = new BABYLON.StandardMaterial("roofMat");
        roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");

        const roof = new BABYLON.MeshBuilder.CreateCylinder("roof", {
            diameter: 1.3,
            height: 1.2,
            tessellation: 3
        });

        roof.material = roofMat;
        roof.scaling.x = 0.75;
        roof.rotation.z = Math.PI / 2;
        roof.position.y = 1.22;

        return roof;
    }
}