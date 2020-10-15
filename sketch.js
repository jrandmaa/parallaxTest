//Creating sprite using sprite sheets for animation
const TILE_SIZE = 70;
const TOTAL_COLUMNS = 9;
const TOTAL_ROWS = 6;
const CANVAS_WIDTH = 800;//TILE_SIZE * TOTAL_COLUMNS;
const CANVAS_HEIGHT = 600;//TILE_SIZE * TOTAL_ROWS;

let props = [];
let bgprops = [];




let currX = 0;
var player;
var gameState;


//Math stuff
const clamp = (min, max) => (value) =>
    value < min ? min : value > max ? max : value;

const rows = Array.from({length: TOTAL_ROWS});
rows.forEach((row, i) => {
  rows[i] = Array.from({ length: TOTAL_COLUMNS}, e => null);
})


console.log(rows);




let tile_sprite_sheet;


function preload() {
  console.log("Preload...");
  // Load the json for the tiles sprite sheet
  props[0] = loadImage('img/cactus1.png');
  props[1] = loadImage('img/cactus2.png');
  props[2] = loadImage('img/cactus3.png');
  bgprops[0] = loadImage('img/ground.png');
  bgprops[1] = loadImage('img/bg1.png');
  bgprops[2] = loadImage('img/bg2.png');
  this.gameState = new GameState();
  
  //camera = new Camera(80,80,1);
  loadJSON('tiles.json', function(tile_frames) {
    // Load tiles sprite sheet from frames array once frames array is ready
    tile_sprite_sheet = loadSpriteSheet('test-spritesheet.png', tile_frames);
  });
}

function setup() {
  //setCamera(this.camera);
  bg = loadImage('img/sunset.png');
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  //background(0);
  //image(prop1,30,30,189,329);
  /*
  // Draw the ground tiles
  for (var x = 0; x < TOTAL_COLUMNS; x+=7) {
    drawTile('ground.png', x, TOTAL_ROWS - 1);
    // rows[TOTAL_ROWS - 1][x] = 'snow.png';
    play();
  }
  */
  //image(props[2],0,0);
  //console.log(rows);
}

function draw() {
  //try either global player or gs player
  camera.position.x = player.posx;
  
  background(bg);
  this.gameState.display();

  //******
  //ellipse(camera.position.x, camera.position.y, 10, 10);
  //******
  
  camera.position.x = this.player.posx;
  camera.position.y = this.player.posy + 50;
}

function drawTile(tilename, gridX, gridY){
    tile_sprite_sheet.drawFrame(tilename, TILE_SIZE * gridX, TILE_SIZE * gridY);
    rows[gridY][gridX] = tilename;
}

class GameState{
  

  bg2speed = 0.75;
  bg3speed = 0.95;

  inputs = [0.0,0.0];
  constructor(){
    //background(0)
    this.inputs = [0.0,0.0];
    self.player = new Player(this);
    self.bg3 = [
      new InfiniteRepeat(bgprops[2],-600,-150)
    ];
    self.bg2 = [
      new InfiniteRepeat(bgprops[1],-600,-150)
    ];
    self.bg1 = [
      new InfiniteRepeat(bgprops[0],-600,-150),//1332
      new Cactus(2,-480,150),
      new Cactus(1,300,25),
      new Cactus(0,-900,-25),
      new Cactus(1,-2000,25),
      new Cactus(0,950,-25)
    ];
    console.log("Made Gamestate");
    //!!!Hey bitch!!!
    //populate lists of layer1 props, layer2 props layer3 props
    //with instances ==> array [ new Cactus(idont,care), new Cactus....]
    //only referred to by array memory location
  }

  display(){//basically update
    
    self.bg3.forEach(o => o.xpos += (this.inputs[1] * this.bg3speed));
    self.bg2.forEach(o => o.xpos += (this.inputs[1] * this.bg2speed));
    //this.cactus.display();
    self.bg3.forEach(o => o.display());
    self.bg2.forEach(o => o.display());
   
    self.bg1.forEach(o => o.display());
    
    self.player.display();

  }

  moveTo(xdiff,ydiff){

    this.bg1.forEach(o => o.xpos+=xdiff);
    this.bg1.forEach(o => o.posy += ydiff);
    console.log("EPIC TIME");
    //REMEMBER PARALLAX
  }
  

}
class InfiniteRepeat{

  width = 1332;
  
  constructor(sprite,inx,iny){
    this.sprite = sprite;
    this.xpos = inx;
    this.ypos = iny;
    
  }
  display(){

    if(camera.position.x - this.xpos >1300){
      this.xpos += 1310;
    } else if(camera.position.x - this.xpos < 0){
      this.xpos -= 1310;
    }

    image(this.sprite, this.xpos, this.ypos);
    image(this.sprite, this.xpos+this.width, this.ypos);
    image(this.sprite, this.xpos-this.width, this.ypos);
    //image(this.sprite, this.xpos-(2*this.width), this.ypos);
    //if camera position = position + half of image, display image in front
  }

}
class Cactus{
  
  constructor(Cindex,inx,iny){
    this.xpos = inx;
    this.ypos = iny;
    
    this.index = Cindex;

    
  }
  display(){
    image(props[this.index], this.xpos, this.ypos); 
    /*if(keyIsDown(LEFT_ARROW)){
      this.y += 5;
    }*/
    //console.log("*******************************************************************************"); 
  }
  moveTo(x,y){
    this.xpos=x;
    this.ypos=y;
    console.log("AAAAAAMAMAMAMAMA");
  }
  
}
class Player{
  inputs = [0.0,0.0];//UD/LR
  //speed, momentum & velocity << MOVE THESE TO PLAYER AND ADD TRACKER OF PLAYER LOCATION
  velocity = 1.0;
  constructor(state){
    this.gameState = state;
  }
  posx = 0;
  posy = 0;

  capSpeed = 30.0;
  dampening = 0.05;

  display(){

    this.gameState.inputs = this.inputs;
    //this.gameState.moveTo(this.inputs[1],this.inputs[9]);
    this.posx += this.inputs[1];


    //ENABLE ME*******************************
    //image(props[1],this.posx,this.posy);
    //ENABLE ME*******************************
    /*





    Hey. good morning.
    enable ^ if you really want.
    until then maybe + and - just to increase decrease speed & cap (or just cap?)












    */





    
   this.inputs[1] -= this.inputs[1] * this.dampening;

    if (keyIsDown(UP_ARROW)) {//AND touching the floor
      this.inputs[0] += 0.1;
      //JUMP() CALL
    } else if (keyIsDown(DOWN_ARROW)) {
      
      //CROUCH() CALL
    } else if (keyIsDown(LEFT_ARROW)) {
      this.inputs[1] -= 1.5;

      
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.inputs[1] += 1.5;
    }

    this.inputs[1] = clamp(-this.capSpeed,this.capSpeed)(this.inputs[1]);
// speed arraylist. each if statement adds 1 or -1 to the inputs, but each one caps at 15 or sumthin
// when moving, consider speed then decay it a little (by dampening value)
}




}

