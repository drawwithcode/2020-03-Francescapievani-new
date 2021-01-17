//set variables
let mySong;
let myImage = [];
let analyzer;
let rateSlider;  //cursore rate
let col1 = "blue";
let col2 = "yellow";
let col3 = "LightSkyBlue";
let col4 = "red";
let volume = 0;
let x = 70;
let y = 70;
let myWind = [];



function preload(){
//image
myImage = loadImage ("./assets/images/skate.png");
//sound
mySong = loadSound("./assets/sounds/dreams.mp3");
}

function setup() {
createCanvas(windowWidth,windowHeight)
background("white");
noStroke();

//analyzer
analyzer = new p5.Amplitude();
analyzer.setInput(mySong);

//controllo amplitude musica
rateSlider = createSlider(0, 4, 1, 0);
rateSlider.position(windowWidth/1.5, windowHeight/1.15);
rateSlider.style('width', '150px');

}

function draw() {
//move the center of the canvas
translate(windowWidth / 2, windowHeight / 1.5);

// if condition for the music
if (mouseX > width/2) {
background(color(col3));
if (mySong.isPlaying() === false) {
mySong.play();
}

volume = analyzer.getLevel();
volume = map(volume, 0, 1, 0, height);

}
else if (mouseX < width / 2) {
background("white");
mySong.stop();
}


//vento
push();
  if (myWind.length < 50) myWind.push(new Wind());
  for (var i = 0; i < myWind.length; i++) {
    myWind[i].update();
    myWind[i].display();
    pop();
  }

//image
imageMode(CENTER);
image(myImage, -33, -170,myImage.width/4, myImage.height/4);

//titolo sfondo
push();
let myText = "Click on the man, move to the right and start skating!";
fill("blue");
textFont("Syncopate");
textStyle(BOLD);
textAlign(CENTER);
textSize(20);
text(myText,-40,-500);
pop();

//testo volume
push();
let myVolumeText = "SOUND RATE";
fill("red");
textFont("Syncopate");
textSize(17);
text(myVolumeText,280, 170);
pop();

//rotate the wheels
push();
translate(x,y)
rotate(frameCount);
wheel1();
rotate(frameCount * 2);
wheel2();
pop();

push();
translate(-x,y)
rotate(frameCount);
wheel1();
rotate(frameCount * 2);
wheel2();
pop();

//cursore amplitude musica
let val1 = rateSlider.value();
mySong.rate(val1);
volume = analyzer.getLevel();
volume = map(volume, 0, 1, 200, 500);

//ruota skateboard 1
function wheel1() {
//volume
volume = analyzer.getLevel();
volume = map(volume, 0, 1, 10, height /3);

//raggi che ruotano 1 colore blu
var start = 0;
var stop = 30;
for (var i = 0; i < 6; i++) {
fill(color(col1));
arc(0, 0, volume, volume, start, stop, PIE);
start += 60;
stop += 60;
}
}

//ruota skateboard 2
function wheel2() {
var volume = 0;
volume = analyzer.getLevel();
volume = map(volume, 0, 1, 10, height /3);

//raggi che ruotano 2 colore giallo
var start = 35;
var stop = 55;
for (var i = 0; i < 6; i++) {
fill(color(col2));
arc(0, 0, volume, volume, start, stop, PIE);
start += 60;
stop += 60;

}
push()
stroke(color(col4));
strokeWeight(3);
noFill()
ellipse(0, 0, volume);
pop()
}
}




//classe vento
class Wind  {

  constructor() {
    this.reset();
  }
  reset() {
    this.x = random(width/4);
    this.y = random(height/2);
    this.vy = 30;
    this.maxy = this.y + width;
    this.r = 0;
    this.tr = 0;
  }
  update() {
    if (this.y < this.maxy) {
      this.y += this.vy;
    } else {
      this.r++;
    }
    if (this.r > this.tr) this.reset();
  }

  display() {
     if(mySong.isPlaying() == false){
       stroke(255, 255, 255);
       noFill();
     } else {
       stroke(0,0,255);
       noFill();
     }

     push();
     translate(-this.y,-this.x);
     beginShape();
     strokeWeight(1);
     line(60, 0, 0, 0);
     pop();
  }
}
