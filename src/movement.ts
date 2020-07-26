export class Movement {
    moveRight = 0;
    readonly Y_BOUNDS = {top: 200, bottom: 280} ;

    constructor() {
        this.Y_BOUNDS 
        this.moveRight = 1;
    }

    calculateXMovement(delta: any, animatedCapGuy: any, backgroundWidth: any) {
        const currentXPosition = animatedCapGuy.x;
        var rightBound = backgroundWidth+200;
        let futurePosition = (currentXPosition + 5 * delta * this.moveRight)
        if(futurePosition > rightBound) {
            this.moveRight = -1;
            animatedCapGuy.scale.x *= -1;
        } else if (futurePosition < -800 ) {
            this.moveRight = 1;
            animatedCapGuy.scale.x *= -1;
        }
        return futurePosition;
    }

    calculateYMovement(currentYPosition: number) {

        if(currentYPosition > this.Y_BOUNDS.bottom) {
            console.log("BOTTOM")
                return currentYPosition - 1 
        }
        else if(currentYPosition < this.Y_BOUNDS.top) {
            console.log("TOP")
                return currentYPosition + 1 
        } else {
            let yMovement = (Math.floor(Math.random() * 3)) - 1;
            yMovement = yMovement * 2;
            return (currentYPosition +  yMovement)
        }
    }

}