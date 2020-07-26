import * as PIXI from 'pixi.js'

export class Cards {

    readonly card = {label:String, imageDirectory: String, id: Number}

    readonly deck = [
        {label: "Blue Eyes White Dragon", imageDirectory: "assets/cards/2.jpg", id: 1},
        {label: "Pikachu", imageDirectory: "assets/cards/1.png", id: 2},
        {label: "Nicol Bolas, God-Pharoah", imageDirectory: "assets/cards/3.jpg", id: 3}
    ];

    data: any; 
    alpha: any;
    dragging: any;
    position:{x:number, y:number}

    constructor() { }

    createRandomCards(number: number){
        let cards: any[] = [];
        for( var i = 0; i < number; i++) {
            cards.push(this.createCard ((300*i)+50, 800, i))
        }
        return cards;

    }

    createCard(x: number, y: number, id: number)
    {
        // create our little bunny friend..
        var texture = PIXI.Texture.from(this.deck[id].imageDirectory);
        var card: any = new PIXI.Sprite(texture);

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
            .on('mousedown', this.onDragStart)
            .on('touchstart', this.onDragStart)
            // events for drag end
            .on('mouseup', this.onDragEnd)
            .on('mouseupoutside', this.onDragEnd)
            .on('touchend', this.onDragEnd)
            .on('touchendoutside', this.onDragEnd)
            // events for drag move
            .on('mousemove', this.onDragMove)
            .on('touchmove', this.onDragMove);

        // move the sprite to its designated position
        card.position.x = x;
        card.position.y = y;

        card.name = this.deck[id].label;

        // add it to the stage
        return card;
    }

    onDragStart(event: any)
    {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }

    onDragEnd()
    {
        this.alpha = 1;

        this.dragging = false;

        //this.checkCardRegion();

        // set the interaction data to null
        this.data = null;
        
    }

    onDragMove(event: any)
    {
        if (this.dragging)
        {
            //@ts-ignore
            var newPosition = this.data.getLocalPosition(this.parent);
            this.position.x = newPosition.x;
            this.position.y = newPosition.y;
        }
    }

    checkCardRegion() {
        // console.log("Chiul: " + app.stage.);
    }
}