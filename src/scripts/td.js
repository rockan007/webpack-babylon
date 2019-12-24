import * as BABYLON from "babylonjs";
import {
    Vector4
} from "babylonjs";
export default class Td {
    constructor() {

    }
    static createScene(canvas, engine = new BABYLON.Engine(canvas, true)) {
        let boxVector = new BABYLON.Vector4(1, 0.2, 1, 1);
        var vectorList = [boxVector, boxVector, boxVector, boxVector, boxVector, boxVector];
        //create the scene space
        let scene = new BABYLON.Scene(engine);
        let camero = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 4, Math.PI / 3, 120, BABYLON.Vector3.Zero(), scene);
        camero.attachControl(canvas, true);
        //all lights to the scene
        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 160, 0), scene);
        var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 100, 10), scene);

        var wall0 = new BABYLON.MeshBuilder.CreatePlane("wall0", {
            width: 80,
            height: 10,
            frontUVs: new BABYLON.Vector4(0, 0.1, 0.6, 0),
            backUVs: new BABYLON.Vector4(0.2, 0.3, 0.4, 1),
            sideOrientation: 1,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE,
            sourcePlane: new BABYLON.Plane(0, 0, 1, 40)
        }, scene);
        var wall1 = new BABYLON.MeshBuilder.CreatePlane("wall1", {
            width: 80,
            height: 10,
            sideOrientation: 2,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE,
            sourcePlane: new BABYLON.Plane(0, 0, 1, -40)
        }, scene);
        var wall2 = new BABYLON.MeshBuilder.CreatePlane("wall2", {
            width: 80,
            height: 10,
            sideOrientation: 1,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE,
            sourcePlane: new BABYLON.Plane(1, 0, 0, -40)
        }, scene);
        var wall3 = new BABYLON.MeshBuilder.CreatePlane("wall3", {
            width: 80,
            height: 10,
            sideOrientation: 1,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE,
            sourcePlane: new BABYLON.Plane(1, 0, 0, 40)
        }, scene);
        var ground = new BABYLON.MeshBuilder.CreatePlane("ground", {
            width: 80,
            height: 80,
            sideOrientation: 2,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE,
            sourcePlane: new BABYLON.Plane(0, 10, 0, 0.5)
        }, scene);
        var box0 = new BABYLON.MeshBuilder.CreateBox("box0", {
            height: 8,
            width: 8,
            depth: 6,
            faceUV: vectorList,
        }, scene);
        box0.position = new BABYLON.Vector3(-25, 0, -20);
        var box1 = new BABYLON.MeshBuilder.CreateBox("box1", {
            height: 8,
            width: 4,
            depth: 4,
            faceUV: vectorList,
        }, scene);
        box1.position = new BABYLON.Vector3(-18.9, 0, -19);
        var box2 = new BABYLON.MeshBuilder.CreateBox("box2", {
            height: 8,
            width: 4,
            depth: 4
        }, scene);
        box2.position = new BABYLON.Vector3(-14.8, 0, -19);
        var box3 = new BABYLON.MeshBuilder.CreateBox("box3", {
            height: 8,
            width: 4,
            depth: 4
        }, scene);
        box3.position = new BABYLON.Vector3(-10.7, 0, -19);
        var box4 = new BABYLON.MeshBuilder.CreateBox("box4", {
            height: 8,
            width: 4,
            depth: 4
        }, scene);
        box4.position = new BABYLON.Vector3(-6.6, 0, -19);
        //左上
        var box5 = new BABYLON.MeshBuilder.CreateBox("box5", {
            height: 8,
            width: 4,
            depth: 4
        }, scene);
        box5.position = new BABYLON.Vector3(-19.9, 0, 19);
        var box6 = new BABYLON.MeshBuilder.CreateBox("box6", {
            height: 8,
            width: 4,
            depth: 4
        }, scene);
        box6.position = new BABYLON.Vector3(-15.8, 0, 19);
        var box7 = new BABYLON.MeshBuilder.CreateBox("box7", {
            height: 8,
            width: 4,
            depth: 4
        }, scene);
        box7.position = new BABYLON.Vector3(-11.7, 0, 19);
        var box8 = new BABYLON.MeshBuilder.CreateBox("box8", {
            height: 8,
            width: 4,
            depth: 4
        }, scene);
        box8.position = new BABYLON.Vector3(-7.6, 0, 19);
        // 右下配电室配电柜
        var box9 = new BABYLON.MeshBuilder.CreateBox("box9", {
            height: 8,
            width: 8,
            depth: 6
        }, scene);
        box9.position = new BABYLON.Vector3(20, 0, -25);
        box9.rotation = new BABYLON.Vector3(0, 1.56, 0);
        var box10 = new BABYLON.MeshBuilder.CreateBox("box10", {
            height: 8,
            width: 4,
            depth: 4
        }, scene);
        box10.position = new BABYLON.Vector3(21, 0, -18.9);
        var box11 = new BABYLON.MeshBuilder.CreateBox("box11", {
            height: 8,
            width: 4,
            depth: 4
        }, scene);
        box11.position = new BABYLON.Vector3(21, 0, -14.8);
        var box12 = new BABYLON.MeshBuilder.CreateBox("box12", {
            height: 8,
            width: 4,
            depth: 4
        }, scene);
        box12.position = new BABYLON.Vector3(21, 0, -10.7);
        var box13 = new BABYLON.MeshBuilder.CreateBox("box13", {
            height: 8,
            width: 4,
            depth: 4
        }, scene);
        box13.position = new BABYLON.Vector3(21.0, 0, -6.6);
        //右上
        var box14 = new BABYLON.MeshBuilder.CreateBox("box14", {
            height: 8,
            width: 8,
            depth: 6
        }, scene);
        box14.position = new BABYLON.Vector3(20, 0, 25);
        box14.rotation = new BABYLON.Vector3(0, 1.56, 0);
        var box15 = new BABYLON.MeshBuilder.CreateBox("box15", {
            height: 8,
            width: 4,
            depth: 4
        }, scene);
        box15.position = new BABYLON.Vector3(21, 0, 18.9);
        var box16 = new BABYLON.MeshBuilder.CreateBox("box16", {
            height: 8,
            width: 4,
            depth: 4
        }, scene);
        box16.position = new BABYLON.Vector3(21, 0, 14.8);
        var box17 = new BABYLON.MeshBuilder.CreateBox("box17", {
            height: 8,
            width: 4,
            depth: 4
        }, scene);
        box17.position = new BABYLON.Vector3(21, 0, 10.7);
        var box18 = new BABYLON.MeshBuilder.CreateBox("box18", {
            height: 8,
            width: 4,
            depth: 4
        }, scene);
        box18.position = new BABYLON.Vector3(21.0, 0, 6.6);
        return scene;
    }
    //立体
    static createBox() {

    }
}