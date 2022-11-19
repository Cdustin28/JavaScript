const tiles = [];

const grid = [];

const DIM = 2;

const BLANK = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;
const LEFT = 4;

const rules = {
  BLANK:[
    [BLANK, UP],
    [BLANK, RIGHT],
    [BLANK, DOWN],
    [BLANK, LEFT]
  ],
  UP:[
    [LEFT, RIGHT, DOWN],
    [LEFT, DOWN, UP],
    [BLANK, DOWN],
    [RIGHT, UP, DOWN]
  ],
  RIGHT:[
    [RIGHT, LEFT, DOWN],
    [LEFT, UP, DOWN],
    [UP, LEFT, RIGHT],
    [BLANK, LEFT]
  ],
  DOWN:[
    [BLANK, UP],
    [LEFT, UP, DOWN],
    [LEFT, RIGHT, UP],
    [UP, RIGHT, DOWN]
  ],
  LEFT:[
    [DOWN, LEFT, RIGHT],
    [BLANK, RIGHT],
    [UP, RIGHT, LEFT],
    [UP, RIGHT, DOWN]
  ]
}

function checkValid(arr,valid) {
  // Valid: [BLANK< RIGHT]
  //ARR: [BLANK, UP, Right, LEFT, DOWN]
  //RESULT in moving up, down, left
  let element = arr[i];
  for(let i = arr.length-1; i >= 0; i--){
    if(!valid.includes[element]){
      arr.splice(i,0);
    }
  }
}

function preload(){
  tiles[0] = loadImage("pipes/blank.png");
  tiles[1] = loadImage("pipes/up.png");
  tiles[2] = loadImage("pipes/right.png");
  tiles[3] = loadImage("pipes/down.png");
  tiles[4] = loadImage("pipes/left.png");
}


function setup() {
  createCanvas(400, 400);

  for(i = 0; i < DIM * DIM; i++) {
    grid[i] = {
      collapsed: false, 
      options: [BLANK, UP, RIGHT, DOWN, LEFT],  
    };
  }

    
    grid[0].options = [UP, DOWN];
    grid[2].options = [UP, DOWN];
    
}

function draw() {
  background(0);
  
  // Pick cell with least entropy
  const gridCopy = grid.slice();
  gridCopy.sort((a, b) => {
    return a.options.length - b.options.length;
  });

  let len = gridCopy[0].options.length;
  let stopIndex = 0;
  for(let i = 1; i < gridCopy.length; i++) {
    if(gridCopy[i].options.length > len){
      stopIndex = i;
      break;
    }
  }
  if(stopIndex > 0)  gridCopy.splice(stopIndex);
  

  const cell = random(gridCopy);
  cell.collapsed = true;
  const pick = random(cell.options);
  cell.options[pick];
  

  const w = width / DIM;
  const h = height / DIM;
  for(let j = 0; j < DIM; j++){
    for(let i = 0; i < DIM; i++){
      let cell = grid[i + j * DIM];
      if(cell.collapsed){
        let index = cell.options[0];
        image(tiles[index], i * w, j * h, w, h);
      }
      else{
        fill(0);
        stroke(255);
        rect(i * w, j * h, w, h);
      }
    }
  }

  const nextTiles = [];
  for(let j = 0; j < DIM; j++){
    let index = i + j * DIM;
    for(let i = 0; i < DIM; i++){
      if(tiles[index].collapsed){
        nextTiles[index] = tiles[index];
      }
      else{
        let options = [BLANK, LEFT, RIGHT, UP, DOWN];

        //Look up
        if(j > 0){
          let up = tiles[i+ (j-1) * DIM];
          for(let options of up.options){
            let valid = rules[options][2] ;
            checkValid(options, valid);
          }
        }
        
      }
    }
  }

  noLoop();
}
