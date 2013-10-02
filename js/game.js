var PLAYGROUND_HEIGHT = 485;
var PLAYGROUND_WIDTH = 419;
var REFRESH_RATE = 30;
var background = new $.gameQuery.Animation({imageURL: "pics/background.png"});
//var hex = new $.gameQuery.Animation({imageURL: "pics/green.png"});
var clicked = false;
var onclick;
function checkmouse()
{
  if(clicked != $.gQ.mouseTracker["1"])
  {
    clicked = $.gQ.mouseTracker["1"];
    if(clicked)
    {
      //console.log(JSON.stringify($.gQ.mouseTracker));
      onclick();
    }
    
  }
}

$(function(){
  $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, mouseTracker: true})
    .addSprite("background",{animation: background, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
    .addGroup("hexs");
  arrange = new Arrange(PLAYGROUND_WIDTH / 2, PLAYGROUND_HEIGHT / 2);
  onclick = function(){arrange.onclick($.gQ.mouseTracker["x"], $.gQ.mouseTracker["y"]);};
  $.playground().startGame();
  $.playground().registerCallback(function()
  {
    checkmouse();
    arrange.update();
  }, REFRESH_RATE);
});