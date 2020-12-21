import * as BABYLON from "babylonjs";

export default class Td {
    constructor() {}
    static createScene(canvas, engine = new BABYLON.Engine(canvas, true)) {
        const scene = new BABYLON.Scene(engine);
        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
        camera.attachControl(canvas, true);

        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
        const sound = new BABYLON.Sound("name", "url to sound file", scene, null, {
            loop: true,
            autoplay: true
        });
        const ground = this.buildGround();

        const detached_house = this.buildHouse(1);
        detached_house.rotation.y = -Math.PI / 16;
        detached_house.position.x = -6.8;
        detached_house.position.z = 2.5;

        const semi_house = this.buildHouse(2);
        semi_house.rotation.y = -Math.PI / 16;
        semi_house.position.x = -4.5;
        semi_house.position.z = 3;

        this.positionHouses(detached_house, semi_house);
        const car= this.buildCar(scene);
        this.setCarAnimation(car,scene);
        return scene;
    }
    static buildCar(scene) {
        const outline = [
            new BABYLON.Vector3(-0.3, 0, -0.1),
            new BABYLON.Vector3(0.2, 0, -0.1)
        ]
        for (let i = 0; i < 20; i++) {
            outline.push(new BABYLON.Vector3(0.2 * Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1));
        }
        outline.push(new BABYLON.Vector3(0, 0, 0.1));
        outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));

        //face UVs
        const faceUV = [];
        faceUV[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1);
        faceUV[1] = new BABYLON.Vector4(0, 0, 1, 0.5);
        faceUV[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5);
        const carMat = new BABYLON.StandardMaterial("carMat");
        carMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/car.png");
        const car = BABYLON.MeshBuilder.ExtrudePolygon("car", {
            shape: outline,
            depth: 0.2,
            faceUV: faceUV,
            wrap: true
        });
        car.material = carMat;
        car.rotation = new BABYLON.Vector3(-Math.PI / 2, 0, Math.PI / 2);
        car.position.y = 0.16;
        car.position.x = 3;
        car.position.z = 7;

        this.buildWheels(car, scene);
      
        return car;
    }
    static setCarAnimation(car,scene) {
        const animCar = new BABYLON.Animation("carAnimation", "position.z", 30,
         BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
         const carKeys=[];
         carKeys.push({
             frame:0,
             value:7
         });
         carKeys.push({
             frame:150,
             value:-7,
         });
         carKeys.push({
             frame:200,
             value:-7
         });
         animCar.setKeys(carKeys);
         car.animations=[];
         car.animations.push(animCar);
         scene.beginAnimation(car,0,200,true);
    }
    //构建车轮
    static buildWheels(car, scene) {
        //wheel face UVs
        const wheelUV = [];
        wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
        wheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5);
        wheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1);

        //car material
        const wheelMat = new BABYLON.StandardMaterial("wheelMat");
        wheelMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/wheel.png");
        const wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", {
            diameter: 0.125,
            height: 0.05,
            faceUV: wheelUV,
            wrap: true
        });
        wheelRB.material = wheelMat;
        this.setWheelAnimation(wheelRB, scene);

        wheelRB.parent = car;
        wheelRB.position.z = -0.1;
        wheelRB.position.x = -0.2;
        wheelRB.position.y = 0.035;
        const wheelRF = wheelRB.clone("wheelRF");
        wheelRF.position.x = 0.1;

        const wheelLB = wheelRB.clone("wheelLB");
        wheelLB.position.y = -0.2 - 0.035;
        const wheelLF = wheelRF.clone("wheelLF");
        wheelLF.position.y = -0.2 - 0.035;
        this.setWheelAnimation(wheelLB, scene);
        this.setWheelAnimation(wheelRF, scene);
        this.setWheelAnimation(wheelRF, scene);
    }
    //wheelAnmation
    static setWheelAnimation(wheelRB, scene) {
        const animWheel = new BABYLON.Animation("wheelAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        const wheelKeys = [];
        //At the animation key 0, the value of rotation.y is 0
        wheelKeys.push({
            frame: 0,
            value: 0
        });
        //At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation
        wheelKeys.push({
            frame: 30,
            value: 2 * Math.PI
        });
        //set the keys
        animWheel.setKeys(wheelKeys);
        //Link this animation to the right back wheel
        wheelRB.animations = [];
        wheelRB.animations.push(animWheel);
        //Begin animation - object to animate, first frame, last frame and loop if true
        scene.beginAnimation(wheelRB, 0, 30, true);
    }
    static positionHouses(detached_house, semi_house) {
        const places = []; //each entry is an array [house type, rotation, x, z]
        places.push([1, -Math.PI / 16, -6.8, 2.5]);
        places.push([2, -Math.PI / 16, -4.5, 3]);
        places.push([2, -Math.PI / 16, -1.5, 4]);
        places.push([2, -Math.PI / 3, 1.5, 6]);
        places.push([2, 15 * Math.PI / 16, -6.4, -1.5]);
        places.push([1, 15 * Math.PI / 16, -4.1, -1]);
        places.push([2, 15 * Math.PI / 16, -2.1, -0.5]);
        places.push([1, 5 * Math.PI / 4, 0, -1]);
        places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3]);
        places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5]);
        places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7]);
        places.push([2, Math.PI / 1.9, 4.75, -1]);
        places.push([1, Math.PI / 1.95, 4.5, -3]);
        places.push([2, Math.PI / 1.9, 4.75, -5]);
        places.push([1, Math.PI / 1.9, 4.75, -7]);
        places.push([2, -Math.PI / 3, 5.25, 2]);
        places.push([1, -Math.PI / 3, 6, 4]);

        //Create instances from the first two that were built 
        const houses = [];
        for (let i = 0; i < places.length; i++) {
            if (places[i][0] === 1) {
                houses[i] = detached_house.createInstance("house" + i);
            } else {
                houses[i] = semi_house.createInstance("house" + i);
            }
            houses[i].rotation.y = places[i][1];
            houses[i].position.x = places[i][2];
            houses[i].position.z = places[i][3];
        }
    }
    static buildHouse(width) {
        const box = this.buildBox(width);
        const roof = this.buildRoof(width);
        return BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true, );
    }

    static buildGround() {
        const groundMat = new BABYLON.StandardMaterial("groundMat");
        groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);

        const ground = BABYLON.MeshBuilder.CreateGround("ground", {
            width: 15,
            height: 16
        });
        ground.material = groundMat;
        return ground;
    }
    //房屋主体
    static buildBox(width) {
        const boxMat = new BABYLON.StandardMaterial("boxMat");
        if (width == 2) {
            boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/semihouse.png");
        } else {
            boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png");
        }
        //options parameter to set different images on each side
        const faceUV = [];
        if (width == 2) {
            faceUV[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); //rear face
            faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); //front face
            faceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side
            faceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side
        } else {
            faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
            faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
            faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
            faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
        }

        const box = BABYLON.MeshBuilder.CreateBox("box", {
            width,
            faceUV: faceUV,
            wrap: true
        });
        box.material = boxMat;
        box.position.y = 0.5;
        return box;
    }
    //屋顶
    static buildRoof(width) {
        const roofMat = new BABYLON.StandardMaterial("roofMat");
        roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");

        const roof = new BABYLON.MeshBuilder.CreateCylinder("roof", {
            diameter: 1.3,
            height: 1.2,
            tessellation: 3
        });
        roof.material = roofMat;
        roof.scaling.x = 0.75;
        roof.scaling.y = width;
        roof.rotation.z = Math.PI / 2;
        roof.position.y = 1.22;

        return roof;
    }
}