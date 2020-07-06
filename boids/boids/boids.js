import Boid from "./boid.js"
import Vector from "./../Utilities/vector.js"

const populationSize = 50;


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
        let acc = new Vector([.5,.5])
        //create starting 0 velocity vector
        let v = new Vector([1,1])
        let newBoid = new Boid(pos,v,acc,population,index);
        //add boid to drawer
        drawer.addActor(newBoid.circle)
        //push the boid to the population list
        population.push(newBoid) 
    }

}

    static addBoid(e, drawer) {

    //generate random starting coords
    let startX = e.pageX 
    let startY = e.pageY
    //create position vector
    let pos = new Vector([startX,startY])
    //create random acceleration vector
    let acc = new Vector([.5,.5])
    //create starting 0 velocity vector
    let v = new Vector([1,1])
    let id = population[population.length-1].id + 1

    let newBoid = new Boid(pos, v, acc, population,id);
    //add boid to drawer
    drawer.addActor(newBoid.circle)
    //push the boid to the population list
    population.push(newBoid) 
}

}
