/*****************************************************

                     |  Main.js  |                  

*****************************************************/

let attempts = config.attempts;   // Load config from config.js 
let sceneOrder = config.sceneOrder;   // Load config from config.js 
let stage = new PIXI.Container();
let obstacles = [];
let player;
let onWoodPosition;
let ride = false;

PIXI.loader.add([       // Loading textures
    "pngs/AudiRL.png",
    "pngs/Audi.png",
    "pngs/wood.png",
    "pngs/tree.png",
    "pngs/cat.png",
    "pngs/rocket.png"
]).load(init);

let message = new PIXI.Text();
message.style = {fill: "black", font: "20px PetMe64"};
message.text = `Attempts: ${attempts}`;



function getRandomInt(min, max)  
{
  return Math.floor(Math.random() * (max - min)) + min;
}

// Collision check function
function hitTestRectangle(r1, r2, disableY) 
{
  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;
  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occurring. Check for a collision on the y axis
    if (!disableY) {  // Disable Y axis hitTest
      if (Math.abs(vy) < combinedHalfHeights) {

          //There's definitely a collision happening
          hit = true;
        } else {
    
          //There's no collision on the y axis
          hit = false;
        }
      } else {
        hit = true;
      }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
}

function minusAttempt()  // Get player on start position and minus attempt
{
  attempts -= 1;
  message.text = `Attempts: ${attempts}`;
  stage.addChild(message);
  player.sprite.position.set(renderer.width * 0.5, renderer.height * 0.91);
}

function hitCase(obst) 
{
  if (obst instanceof Tree)
  {
    ride = false;
    obst.items.forEach((item) => 
    {
      if (hitTestRectangle(player.sprite, item, true))  // return player on previous position when hit a tree
      {
        player.sprite.y = player.sprite.preY;
        player.sprite.x = player.sprite.preX;
      }
    });
  } else if (obst instanceof Car)
    {
      ride = false;
      obst.items.forEach((item) => 
      {
        if (hitTestRectangle(player.sprite, item, true))  // car hits player
        {
          minusAttempt();
        }
      });
    } else if (obst instanceof Wood) 
    {
      let onWood = false;
      obst.items.forEach((item) => 
        {
          if (hitTestRectangle(player.sprite, item, true)) 
          {
            if(!ride) 
             {
                onWoodPosition = player.sprite.x - item.x;  // Set players position on wood
                ride = true;
             } 
            
            player.sprite.x = item.x + onWoodPosition;
            
            if(player.sprite.x > renderer.width || player.sprite.x < 0)
            {
              minusAttempt();
            }
            onWood = true;          
          }
        });
        if (onWood) 
        {
          return;
        }
        minusAttempt();
        }
}

function init()
{
    //renderer.backgroundColor = 0x999999;
    let laneY = 0;
    sceneOrder.forEach(function(lane, index)  //building stage with lines and obstacles
    {
      let obstacle;  
      switch (lane){
          case "road":
            obstacle = new Car();
            break;
          case "water":
            obstacle = new Wood();
            break;
          case "grass":
            obstacle = new Tree();
            break;
        }
      obstacle.type = lane;
      obstacle.container.y = laneY;
      if (index > 8)  // clear startlane from obstacles
      {
        obstacle.container.removeChildren(1);
        obstacle.items.splice(0, obstacle.items.length);
      }
      obstacles.push(obstacle);
      stage.addChild(obstacle.container);
      laneY += renderer.height/10;
      });
          
    stage.addChild(message);
    renderer.render(stage);
    player = new Player();
    loop();
}

function loop()

{
  
  if(attempts <1 )
  {
    alert("Game over, LOOSER!");
    return;
  }
  if(player.sprite.y < 15)
  {
    alert("You are the CHAMPION!");
    return;
  }

  
  obstacles.forEach((item) => 
  {
    item.update();
    if (hitTestRectangle(player.sprite, item.container))
    {
      hitCase(item);
    }
  });

    player.update();

    Rocket.list.map((element) =>  //Easter Egg
    {
        element.update();
    });

    requestAnimationFrame(loop);
    renderer.render(stage);
}
