import * as PIXI from 'pixi.js'
// create a Pixi application
let app = new PIXI.Application({ width: 800, height: 450 });

// add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

let animatedCapguy, background, spritesheetname;

spritesheetname = "assets/archer.json";

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
    animatedCapguy = new PIXI.AnimatedSprite(sheet.animations["spr_ArcherIdle_strip_NoBkg"]);

    // configure + start animation:
    animatedCapguy.animationSpeed = 0.167;                  // 6 fps
    animatedCapguy.position.set(0, background.height - 100); // almost bottom-left corner of the canvas
    // animatedCapguy.scale.y = 20
	// animatedCapguy.scale.x = 10
    animatedCapguy.play();

    // Enable this to update the anchor points with each animation frame
     animatedCapguy.updateAnchor = true;

    // add it to the stage and render!
    app.stage.addChild(animatedCapguy);
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    animatedCapguy.x = (animatedCapguy.x + 5*delta) % (background.width + 200);
}