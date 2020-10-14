//Creating sprite using sprite sheets for animation
const TILE_SIZE = 70;
const TOTAL_COLUMNS = 9;
const TOTAL_ROWS = 6;
const CANVAS_WIDTH = TILE_SIZE * TOTAL_COLUMNS;
const CANVAS_HEIGHT = TILE_SIZE * TOTAL_ROWS;

const rows = Array.from({length: TOTAL_ROWS});
rows.forEach((row, i) => {
  rows[i] = Array.from({ length: TOTAL_COLUMNS}, e => null);
})


console.log(rows);





let tile_sprite_sheet;


function preload() {
  // Load the json for the tiles sprite sheet
  loadJSON('tiles.json', function(tile_frames) {
    // Load tiles sprite sheet from frames array once frames array is ready
    tile_sprite_sheet = loadSpriteSheet('tiles_spritesheet.png', tile_frames);
  });
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(0);
  // Draw the ground tiles
  for (var x = 0; x < TOTAL_COLUMNS; x++) {
    drawTile('snow.png', x, TOTAL_ROWS - 1);
    // rows[TOTAL_ROWS - 1][x] = 'snow.png';
  }

  // Draw the sign tiles
  drawTile('rock1.png', 0, TOTAL_ROWS - 2);
  // rows[TOTAL_ROWS - 2][0] = 'signRight.png';
  
  drawTile('signExit.png', 0, 0);
  // rows[0][0] = 'signExit.png';
  


  //draw some more stuff
  drawTile('cactus1.png', 1, 1);
  // rows[1][1] = 'dirtCliffLeft.png';

  drawTile('dirtCliffRight.png', 2, 1);
  // rows[1][2] = 'dirtCliffRight.png';

  // drawTile('boxCoinAlt.png', 3, 1);
  drawTile('boxCoinAlt.png', 4, 1);
  // rows[1][4] = 'boxCoinAlt.png';

  drawTile('grassCliffLeft.png', 4, 3);
  // rows[3][4] = 'grassCliffLeft.png';

  drawTile('grassCliffRight.png', 5, 3);
  // rows[3][5] = 'grassCliffRight.png';

  console.log(rows);
}

function draw() {
  clear();
  background(0);
  drawLevel();
}

function drawTile(tilename, gridX, gridY){
    tile_sprite_sheet.drawFrame(tilename, TILE_SIZE * gridX, TILE_SIZE * gridY);
    rows[gridY][gridX] = tilename;
}

function drawLevel(){
  rows.forEach((row, j) => {
    row.forEach((item, i) => {
      if(item != null){
        drawTile(item, i, j);
      }
    })
  })

  // for(let i = 0; i < TOTAL_ROWS; i++){
  //   for(let j = 0; j < TOTAL_COLUMNS; j++){
  //     if(rows[i][j] != null){
  //       drawTile(rows[i][j], j, i);
  //     } 
  //   }
  // }

}