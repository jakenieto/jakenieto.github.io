import Circle from "../Utilities/circle.js"
import Vector from "../Utilities/vector.js";

const desiredSeparation = 50.0;
const maxVelocity = 5;
const maxForce = 0.1;
const neighborDist = 40;

export default class Boid {
    constructor(pos, startVelocity, acc,flockList,id) {
        
        this.canvas = document.querySelector('canvas') 
        this.circle = new Circle(3,pos.components[0],pos.components[1],() => this.flock())
        this.position = pos
        this.velocity = startVelocity
        this.acceleration = acc
        this.flockList = flockList
        this.mousePos = {}
        this.canvas.addEventListener("mousemove", (evt) => this.setMousePos(this.canvas,evt), false)
        this.id = id
    
    }

    setMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        this.mousePos = {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    mouseBehav() {
        if (this.mousePos.x === undefined || this.mousePos.y === undefined) return new Vector([0,0])
        return this.seek(new Vector([this.mousePos.x,this.mousePos.y]))
    }

    flock() {
        let sep = this.separate();   // Separation
        let ali = this.align();      // Alignment
        let coh = this.cohesion();   // Cohesion
        let mou = this.mouseBehav()

        //Arbitrarily weight these forces
        sep.scale(1.5);
        ali.scale(3.5);
        coh.scale(1.5);
        mou.scale(-10)
        //Add the force vectors to acceleration
        this.applyForce(sep);
        this.applyForce(ali);
        this.applyForce(coh);
        this.applyForce(mou);
        this.transition()

    }

    applyForce(force) {
         this.acceleration.add(force);
    }

    seek(target) {
        let desired = Vector.sub(target, this.position);  // A vector pointing from the position to the target
        // Scale to maximum speed
        desired.normalize();
        desired.scale(maxVelocity);
    
        // Above two lines of code below could be condensed with new PVector setMag() method
        // Not using this method until Processing.js catches up
        // desired.setMag(maxspeed);
    
        // Steering = Desired minus Velocity
        let steer = Vector.sub(desired, this.velocity);
        steer.limit(maxForce);  // Limit to maximum steering force
        return steer;


    }

    separate() {
        
        let steer = new Vector([0, 0]);
        let count = 0;
        // For every boid in the system, check if it's too close
        this.flockList.forEach(element => {
            let d = Vector.dist(this.position, element.position);
            // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
            if ((d > 0) && (d < desiredSeparation)) {
        // Calculate vector pointing away from neighbor
                let diff = Vector.sub(this.position, element.position);
                diff.normalize();
                diff.scale(1/d);        // Weight by distance
                steer.add(diff);
                count++;            // Keep track of how many
            }
        });
      
        // Average -- divide by how many
        if (count > 0) {
            steer.scale(1/count);
        }

        // As long as the vector is greater than 0
        if (steer.mag() > 0) {
        // First two lines of code below could be condensed with new PVector setMag() method
        // Not using this method until Processing.js catches up
        // steer.setMag(maxspeed);

        // Implement Reynolds: Steering = Desired - Velocity
            steer.normalize();
            steer.scale(maxVelocity);
            steer.sub(this.velocity);
            steer.limit(maxForce);
        }
        return steer;
    }

    align () {
         
        let sum = new Vector([0, 0]);
        let count = 0;
        this.flockList.forEach(element => {
            let d = Vector.dist(this.position, element.position);
            if ((d > 0) && (d < neighborDist)) {
              sum.add(element.velocity);
              count++;
            }
            
        });
      
        if (count > 0) {
          sum.scale(1/count);
          // First two lines of code below could be condensed with new PVector setMag() method
          // Not using this method until Processing.js catches up
          // sum.setMag(maxspeed);
    
          // Implement Reynolds: Steering = Desired - Velocity
          sum.normalize();
          sum.scale(maxVelocity);
          let steer = Vector.sub(sum, this.velocity);
          steer.limit(maxForce);
          return steer;
        } 
        else {
          return new Vector([0, 0]);
        }

    } 
    
    // Cohesion
    // For the average position (i.e. center) of all nearby boids, calculate 
    //steering vector towards that position
    cohesion () {
        let sum = new Vector([0, 0]);   // Start with empty vector to accumulate all positions
        let count = 0;
        this.flockList.forEach((element) => {
            let d = Vector.dist(this.position, element.position);
            if ((d > 0) && (d < neighborDist)) {
              sum.add(element.position); // Add position
              count++;
            }
        });
          
        if (count > 0) {
            sum.scale(1/count);
            return this.seek(sum);  // Steer towards the position
        } 
        else {
          return new Vector([0, 0]);
        }
    }
      
    transition() {
         // Update velocity
        if (! Number.isNaN(this.acceleration.components[0])) {
            this.velocity.add(this.acceleration);
            // Limit speed
            this.velocity.limit(maxVelocity);
            this.position.add(this.velocity);
        }
        
        // Reset accelertion to 0 each cycle
        this.acceleration = new Vector([0,0])
        
        this.circle.centerX += this.velocity.components[0]
        this.circle.centerY += this.velocity.components[1]

        if (this.circle.centerX  < -1 * this.circle.radius && this.velocity.components[0]  < 0) {
            this.circle.centerX = window.innerWidth
        }
        if (this.circle.centerX > window.innerWidth + this.circle.radius && this.velocity.components[0] > 0) {
            this.circle.centerX = -1 * this.circle.radius
        }
        if (this.circle.centerY  < -1 * this.circle.radius && this.velocity.components[1] < 0) {
            this.circle.centerY = window.innerHeight
        }
        if (this.circle.centerY  >  this.circle.radius  +  window.innerHeight && this.velocity.components[1] > 0) {
            this.circle.centerY = -1 * this.circle.radius
        }
    }

}