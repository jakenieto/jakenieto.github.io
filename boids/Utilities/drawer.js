export default class Drawer {
    constructor(canvas,context, width, height) {
        this.canvas = canvas
        this.context = context
        this.canvas.width = width
        this.canvas.height = height
        this.actors = []
        this.requestAnimationFrame = window.requestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.msRequestAnimationFrame;
    }

    addActor(actor) {
        this.actors.push(actor)
    }

    draw() {

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#ffffff00";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.actors.forEach(element => {
            element.draw(this.context,this.canvas);
        });
        requestAnimationFrame(() => this.draw());
    }

}