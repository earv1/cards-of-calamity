import * as PIXI from 'pixi.js'
import {Movement} from './movement'
import {Cards} from './cards'

// create a Pixi application
let app = new PIXI.Application({ width: 1600, height: 900 });

// add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

let animatedCapguy: any, background: any, spritesheetname: any, buttona;

spritesheetname = "assets/2/1.json";
buttona = 'assets/2/b.jpg';

const movement = new Movement();
const cards = new Cards();


// load sprite sheet image + data file, call setup() if completed
// console.log("Tell me, whyyyy", PIXI.Loader.shared);
PIXI.Loader.shared
    .add(spritesheetname)
    .load(setup);


function setup() {
    // the sprite sheet we've just loaded:
    let sheet = PIXI.Loader.shared.resources[spritesheetname].spritesheet;

    // initialize background sprite

    background = new PIXI.Sprite(sheet.textures["background.png"]);
    if(!sheet.textures["background.png"]){
        console.error("Empty Background", sheet.textures);
    } else {
        console.log("Textures", sheet.textures);
    } 
    app.stage.addChild(background);

    // scale stage container that it fits into the view
    app.stage.scale.x = app.view.width / background.width;
    app.stage.scale.y = app.view.height / background.height;

    // create an animated sprite
    animatedCapguy = new PIXI.AnimatedSprite(sheet.animations["Cowboy2_walk with gun"]);

    // configure + start animation:
    animatedCapguy.animationSpeed = 0.167;                  // 6 fps

    const scale = 800;
    animatedCapguy.position.set(0, background.height - 100 - scale); // almost bottom-left corner of the canvas
    animatedCapguy.width = scale 
    animatedCapguy.height = scale 
    //animatedCapguy.scale.y = 20
    //animatedCapguy.scale.x = 10
    animatedCapguy.play();

    // Enable this to update the anchor points with each animation frame
     animatedCapguy.updateAnchor = true;

    // add it to the stage and render!
    app.stage.addChild(animatedCapguy);
    app.ticker.add(delta => gameLoop(delta));

    //Regular button
    // var textureButton = PIXI.Texture.from(buttona);
    // var button = new PIXI.Sprite(textureButton);
    // button.buttonMode = true;
    // button.interactive = true;
    // button.buttonMode = true;
    // button.anchor.set(0.5);
    // button.x = 300;
    // button.y = 800;
    // app.stage.addChild(button);

    // Create Card
    const createdCardArray: any[] = cards.createRandomCards(3);
    createdCardArray.forEach((createdCard)=>{
        app.stage.addChild(createdCard);
    });

}

function gameLoop(delta: any) {
    animatedCapguy.x = movement.calculateXMovement(delta, animatedCapguy, background.width);

    animatedCapguy.y = movement.calculateYMovement(animatedCapguy.y)
}


// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path


