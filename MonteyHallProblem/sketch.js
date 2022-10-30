const doors = [];

function setup() {
  noCanvas();

  for(let i = 0; i < 3; i++){
   
   doors[i] = createDiv("🐐");
   doors[i].class('door')

  }
  let prize = randoms(doors);
  prize.html("")
}

function draw() {
  background(51);
}
:anatomical_heart:

