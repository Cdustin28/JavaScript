/*

@Author - Cole Dustin

This is a program that will create a simulation of a grid with a predetermined number of cells 
that follows the given stipulations. It is based of of John Conway's Game of life from 1970.
If you want to read more you can go to 

https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
or
http://pi.math.cornell.edu/~lipa/mec/lesson6.html

//TODO Implement some interesting predetermined board from the known oscillations and cool fizzles

*/



//The grid that will store the values of each cell
let grid;

//Size of the grid
let rows;
let cols;

//Images
let pause;
let play;
let randomImage;

let mouseClickY = -1;
let mouseClickX = -1;

let clickedX;
let clickedY;

let isPlaying = 0;

//Make sure the resolution works with the canvas size
resolution = 10;

function pausePlay(){
  if(isPlaying == 1){
    isPlaying = 0;
  }
  else if(isPlaying == 0){
    isPlaying = 1;
  }
  
}

//This function is used to make and return an two dimensional array
function make2DArray(cols, rows){
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++){
    arr[i] = new Array(rows);
  }

  return arr;
}

//This function is used to determine where the mouse is clicked and then execute the proper functions
function mouseClicked() {
  mouseClickY = pmouseY;
  mouseClickX = pmouseX;

  if(mouseClickY >= 805 && mouseClickY < 850){
    if(mouseClickX > (width/2)-(resolution/2) && mouseClickX < (width/2)-(resolution/2) + 40){
      pausePlay();
    }
    else if(mouseClickX > 700 && mouseClickX < 800){
      randomCells();
    }
    else if(mouseClickX > 0 && mouseClickX < 100){
      clearCells();
    }

  }


  

}

//Fills the array randomly with alive and dead cells
function randomCells() {
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      grid[i][j] = floor(random(2));
    }
  }
}


//Takes the mouse position during a click and changes the state of the corresponding cell
function updateNewClick() {
  clickedX = floor((mouseClickX / resolution));
  clickedY = floor((mouseClickY / resolution));

  //Keep it in the boundries
  if(mouseClickX < width && mouseClickY < height){

    if(grid[clickedX][clickedY] == 0){
      grid[clickedX][clickedY] = 1;
    }
    else if(grid[clickedX][clickedY] == 1){
      grid[clickedX][clickedY] = 0;
    }


  }

}

function clearCells(){
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      grid[i][j] = 0;
    }
  }
}




function setup() {
  //Choose a resolutions that is divisible by the height and width
  
  createCanvas(800, 850);
  cols = width / resolution;
  rows = (height-50) / resolution;

  //frameRate(6);

  

  pause = loadImage('images/pause.png');
  play = loadImage('images/play.png');
  randomImage = loadImage('images/random.png');
  clearImage = loadImage('images/clear.png');

  grid = make2DArray(cols, rows);

  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      grid[i][j] = 0;
    }
  }

}


function draw(){
  background(255);

  image(randomImage, 700, 800, 100);
  image(clearImage, 0, 800, 100);

  if(isPlaying == 1){
    image(pause, 400-(resolution/2), 805, 40, 40);
  }
  else if(isPlaying == 0){
    image(play, 400-(resolution/2), 805, 40, 40);
  }

  

  if(mouseClickX != -1 && mouseClickY != -1){
    updateNewClick()
    mouseClickX = -1;
    mouseClickY = -1;
  }
  

  
  
  //Creates the new array to store the newly calculated values 
  let next = make2DArray(cols,rows);

  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      
      //find the x and y location for each cell and uses that to know where to place it on the grid
      let x = i * resolution;
      let y = j * resolution;

      //Changes color to white for alive and black for dead
      if(grid[i][j] == 1){
        fill(255);
      } 
      else{
        fill(0);
      }

      //Creates a rectangle(square) at the proper location
      rect(x, y, resolution, resolution);

    }
  }
  
  //Create the next generation based on the current grid
    for(let i = 0; i < cols; i++){
      for(let j = 0; j < rows; j++){
        //Count the number of live neights for each cell in the grid
        let neighbors = 0;
        //Top left Corner
        if(i == 0 && j == 0){
          neighbors += grid[i+1][j];
          neighbors += grid[i][j+1];
          neighbors += grid[i+1][j+1];
        }

        //Top right corner
        else if(i == cols-1 && j == 0){
          neighbors += grid[i-1][j];
          neighbors += grid[i][j+1];
          neighbors += grid[i-1][j+1];
        }

        //Bottom left corner
        else if(i == 0 && j == rows - 1){
          neighbors += grid[i+1][j];
          neighbors += grid[i][j-1];
          neighbors += grid[i+1][j-1];
        }

        //Bottom right corner
        else if(i == cols-1 && j == rows - 1){
          neighbors += grid[i-1][j];
          neighbors += grid[i][j-1];
          neighbors += grid[i-1][j-1];
        }

        //Top side exclusive
        else if(j == 0 && i != 0 && i != cols -1){
          for(let p = i-1; p <= i+1; p++){
            for(let q = j; q <= j+1; q++){
              if(p == i && j == q){ continue; }
              neighbors += grid[p][q];
            }
          }
        }

        //Right side exclusive
        else if(i == cols-1 && j != 0 && j != rows-1){
          for(let p = i-1; p <= i; p++){
            for(let q = j-1; q <= j+1; q++){
              if(p == i && j == q){ continue; }
              neighbors += grid[p][q];
            }
          }
        }

        //Left side exclusive
        else if(i == 0 && j != 0 && j != rows-1){
          for(let p = i; p <= i+1; p++){
            for(let q = j-1; q <= j+1; q++){
              if(p == i && j == q){ continue; }
              neighbors += grid[p][q];
            }
          }
        }

        //Bottom side exclusive
        else if(j == rows-1 && i != 0 && i != cols -1){
          for(let p = i-1; p <= i+1; p++){
            for(let q = j-1; q <= j; q++){
              if(p == i && j == q){ continue; }
              neighbors += grid[p][q];
            }
          }
        }

        //center
        else if(j != 0 && i != 0 && i != cols-1 && j != rows-1){
          for(let p = i-1; p <= i+1; p++){
            for(let q = j-1; q <= j+1; q++){
              if(p == i && j == q){ continue; }
              neighbors += grid[p][q];
            }
          }
          
        }
        

        /*
        Creates the next grid with the following rules

        1. Any live cell with fewer than two live neighbors dies, as if by under population.
        2. Any live cell with two or three live neighbors lives on to the next generation.
        3. Any live cell with more than three live neighbors dies, as if by overpopulation.
        4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
        */
        if(isPlaying == 1){
          if(grid[i][j] == 1){
            if(neighbors < 2 || neighbors > 3){
              next[i][j] = 0;
            }
            else if(neighbors == 2 || neighbors == 3){
              next[i][j] = 1;
            }
            else{
              next[i][j] = 1;
            }
          }
          if(grid[i][j] == 0){
            if(neighbors == 3){
              next[i][j] = 1;
            }
            else{
              next[i][j] = 0;
            }
          }
        }

        

      
      }
    }

    //Assigns the new values to the grid to be printed at the beginning of the next loop
    if(isPlaying == 1){
      grid = next;
    }
    

    
  
    
}
