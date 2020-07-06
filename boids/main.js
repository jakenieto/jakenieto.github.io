import Boids from  "./boids/boids.js"

import Drawer from "./Utilities/drawer.js"

const canvas = document.querySelector('canvas') // Grab canvas from DOM
canvas.style.backgroundColor="transparent";
const context = canvas.getContext('2d') // Get context to access 2D canvas functions
context.globalAlpha = 0.0;
let drawer = new Drawer(canvas,context,window.innerWidth,window.innerHeight)
Boids.startBoids(drawer)
document.body.addEventListener('click', (e) => Boids.addBoid(e,drawer), true); 
drawer.draw()