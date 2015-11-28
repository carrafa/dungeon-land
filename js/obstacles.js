

function createWall(x,y,w,h, intervalFunction, num){
    if(intervalFunction(num)){
      ctx.fillStyle="red";
      ctx.fillRect(x,y,w,h);
    }
  };

  function flashyWalls(){
    if(currentLevel === 1){
      createWall(350, 270, 100, 5, timingIntervals.percentage, 50);
      createWall(100, 270, 100, 5, timingIntervals.percentage, 95);
      createWall(205, 215, 100, 5, timingIntervals.percentage, 30);
      createWall(60, 110, 100, 5, timingIntervals.percentage, 90);
      createWall(445, 115, 5, 40, timingIntervals.percentage, 90);
    };
  if(currentLevel === 2){
      createWall(120,60,100,5, timingIntervals.thrice)
  }
}



function drawAllWallObstacles(){
  flashyWalls();
}
