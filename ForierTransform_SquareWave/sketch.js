let time = 0;
let wave = [];

//m is the number of sub-circles that will be created
let m = 1;

let slider;


function setup() {
  createCanvas(600, 400);
  slider = createSlider(1, 100, 1);
}



  //e^(t* 2 * PI * i), where i = sqrt(-1) and t is time
  //this function will precisely follow a circle of radius 1 and will take one second to complete one rotation
  //this function drawn over time is the definition of a sine wave and will create a sine wave that will run forever
function draw() {
  background(0);

  translate(200, 200);



  let x = 0;
  let y = 0;

  
  for(let i = 0; i < m; i++){

    //before assigning a new value to x and y we will save the previous values to use as the starting point for the new circle
    let prevx = x;
    let prevy = y;

    /*
    The next four lines of code are to generate as close to a square wave as possible, 
    as n appraoches infinity they will create a perfect square wave(not an approximate, perfect)
    The equation used is 
    
    x(t) = 4/Pi (sin(wt) + (1/3)sin(3wt) + (1/5)sin(5wt) + .... (1/2k+1)sin( (2k+1)wt )), where w = 2 * Pi * frequency

    They are labeled **Uncomment the one you want to see**
    
    */

    /*
    Square Wave
    */
    let n =  i * 2 + 1;
    let radius = 50 * (4 / (n * PI));
    x += radius * cos(n * time);
    y += radius * sin(n * time);
    

    /*
    Sawtooth wave
    */
    // let radius = 50 * (4 / PI);
    // x += radius * sin(i * PI * time)/i;
    // y += radius * sin(i * PI * time)/i;
    


    /*
    Pulse Wave
    
    let n = ((-1)^((i % 2) + 1));
    let radius = 50 * PI / (i^2);
    x += n * radius * cos(i * time);
    y += n * radius * sin(i * time);
    */






    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);




   //fill(255);
    stroke(255);
    line(prevx, prevy, x,y);
    //ellipse(x, y, 8);


  }

  wave.unshift(y);
  translate(200, 0);
  line(x-200,y, 0,wave[0]);
  beginShape();
  noFill();

  for(let i = 0; i < wave.length; i++){
    vertex(i, wave[i]);
  }
  endShape();

  if(wave.length > 500){
    wave.pop();
  }

 

  time -= .04;
  if(time <  (-2 * PI)){
    time = 0;
     m += 1;
     if(m > 10){
      m+= 5;
     }
  }





}
