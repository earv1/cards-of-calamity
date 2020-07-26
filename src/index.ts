import * as PIXI from 'pixi.js'
import {Movement} from './movement'

// create a Pixi application
let app = new PIXI.Application({ width: 1600, height: 900 });

// add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

let animatedCapguy: any, background: any, spritesheetname: any, buttona;

spritesheetname = "assets/2/1.json";
buttona = 'assets/2/b.jpg';

const movement = new Movement();

var card = {label:String, imageDirectory: String, id: Number}

let deck = [
    {label: "Blue Eyes White Dragon", imageDirectory: "assets/cards/2.jpg", id: 1},
    {label: "Pikachu", imageDirectory: "assets/cards/1.png", id: 2},
    {label: "Nicol Bolas, God-Pharoah", imageDirectory: "assets/cards/3.jpg", id: 3}
];

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
    drawRandomCard(3);

}

function gameLoop(delta: any) {
    animatedCapguy.x = movement.calculateXMovement(delta, animatedCapguy, background.width);

    animatedCapguy.y = movement.calculateYMovement(animatedCapguy.y)
}


// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path


function drawRandomCard(number: number){
    for( var i = 0; i < number; i++) {
        createCard ((300*i)+50, 800, i)
    }
}

function createCard(x: number, y: number, id: number)
{
    // create our little bunny friend..
    var texture = PIXI.Texture.from(deck[id].imageDirectory);
    var card = new PIXI.Sprite(texture);

    // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
    card.interactive = true;

    // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
    card.buttonMode = true;

    // center the bunny's anchor point
    card.anchor.set(0.5);

    // make it a bit bigger, so it's easier to grab
    card.scale.set(1);

    // setup events
    card
        // events for drag start
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        // events for drag end
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        // events for drag move
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);

    // move the sprite to its designated position
    card.position.x = x;
    card.position.y = y;

    card.name = deck[id].label;

    // add it to the stage
    app.stage.addChild(card);
}


function onDragStart(event: any)
{
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd()
{
    this.alpha = 1;

    this.dragging = false;

    checkCardRegion();

    // set the interaction data to null
    this.data = null;
    
}

function onDragMove()
{
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
}

function checkCardRegion() {

    // console.log("Chiul: " + app.stage.);
    

}