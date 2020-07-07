export default class Bird {
   
    constructor(length,centerX,centerY, velocity, animationFunc) {
        this.velocity = velocity.normalize();
        this.length = length;
        this.radius = length
        this.centerX = centerX;
        this.centerY = centerY;
        this.animationFunc = animationFunc;
    }

    draw(context, canvas) {
        // draw the circle
        this.animationFunc()
        context.beginPath();
        let pointXcoord = this.centerX + this.length * this.velocity.components[0]
        let pointYcoord = this.centerY + this.length * this.velocity.components[1]
        context.moveTo(pointXcoord, pointYcoord)
        context.lineTo(pointXcoord - ((this.length * Math.sqrt(3))/2),pointYcoord - this.length/2);
        context.lineTo(pointXcoord - ((this.length * Math.sqrt(3))/2),pointYcoord + this.length/2);
        context.closePath(); 
        // color in the circle
        context.fillStyle = "#000000";
        context.fill();
    
    }
    
}
 
