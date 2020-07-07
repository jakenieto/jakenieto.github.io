import Boid from "./boid.js"
import Vector from "./../Utilities/vector.js"

const populationSize = 25;


let population = [];


export default class Boids {

static startBoids(drawer) {
    for (let index = 0; index < populationSize; index++) {
        //generate random starting coords
        let startX = 200 * Math.random() + (window.innerWidth/2 - 100);
        let startY = 200 * Math.random() + (window.innerHeight/2 - 100);
        //create position vector
        let pos = new Vector([startX,startY])
        //create random acceleration vector
        let acc = new Vector([.5,0])
        //create starting 0 velocity vector
        let v = new Vector([.5,0])
        let newBoid = new Boid(pos,v,acc,population,index);
        //add boid to drawer
        drawer.addActor(newBoid.circle)
        //push the boid to the population list
        population.push(newBoid) 
    }

}

    static addBoid(e, drawer,num) {
        if (population.length >= 100) return

    //generate random starting coords
    for (let index = 0; index < num; index++) {
        let x = Math.cos((2*Math.PI * index)/num) 
        let y = Math.sin((2*Math.PI * index)/num) 
        let radius = 40
        let startX = e.pageX + radius * x
        let startY = e.pageY + radius * y
       
        //create position vector
        let pos = new Vector([startX,startY])
        //create random acceleration vector
        let acc = new Vector([0,0])
        //create starting 0 velocity vector
        let v = new Vector([0.01,0.0])
        let id = population[population.length-1].id + 1

        let newBoid = new Boid(pos, v, acc, population,id);
        //add boid to drawer
        drawer.addActor(newBoid.circle)
        //push the boid to the population list
        population.push(newBoid) 
        
    }
    
}

}
