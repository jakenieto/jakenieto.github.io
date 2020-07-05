import Boid from "./boid.js"
import Vector from "./../Utilities/vector.js"

const populationSize = 50;


let population = [];

export default function startBoids(drawer) {
    
    for (let index = 0; index < populationSize; index++) {
        //generate random starting coords
        let startX = 200 * Math.random() + (window.innerWidth/2 - 100);
        let startY = 200 * Math.random() + (window.innerHeight/2 - 100);
        //create position vector
        let pos = new Vector([startX,startY])
        //create random acceleration vector
        let acc = new Vector([.5,.5])
        //create starting 0 velocity vector
        let v = new Vector([1,1])
        let newBoid = new Boid(drawer.canvas,pos,v,acc,population,index);
        //add boid to drawer
        drawer.addActor(newBoid.circle)
        //push the boid to the population list
        population.push(newBoid) 
    }

}