export default class Circle {
   
    constructor(radius,centerX,centerY, animationFunc) {
        this.angle = 0;
        this.radius = radius;
        this.centerX = centerX;
        this.centerY = centerY;
        this.animationFunc = animationFunc;
    }

    draw(context, canvas) {
        // draw the circle
        this.animationFunc()
        context.beginPath();
        context.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2, false);
        context.closePath(); 
        // color in the circle
        context.fillStyle = "#000000";
        context.fill();
    
    }
    
}
 
