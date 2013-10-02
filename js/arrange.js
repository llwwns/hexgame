var DELTA_Y = 2 + HEX_HEIGHT;
var DELTA_X = (HEX_HEIGHT / 2 + 2) * Math.sqrt(3);
var CLICKABLE = [4, 5, 8, 9, 10, 13, 14];
var ARROUND = [];
ARROUND[4] = [0, 3, 8, 9, 5, 1];
ARROUND[5] = [1, 4, 9, 10, 6, 2];
ARROUND[8] = [3, 7, 12, 13, 9, 4];
ARROUND[9] = [4, 8, 13, 14, 10, 5];
ARROUND[10] = [5, 9, 14, 15, 11, 6];
ARROUND[13] = [8, 12, 16, 17, 14, 9];
ARROUND[14] = [9, 13, 17, 18, 15, 10];
function Arrange(x, y)
{
  this.center = new Vector(x, y);
  this.hexs = [];
  var $hexs = $("#hexs");
  var num = 0;
  for(var i = 0; i < 3; i++)
  {
    for(var j = 0; j < 3 + i; j++)
    {
      this.hexs[num] = new Hex(
        $hexs, num % 2, num,
        new Vector(x + (i - 2) * DELTA_X, y + (j - 2 + (2 - i) / 2) * DELTA_Y));
      num++;
    }
  }
  for(var i = 3; i< 5; i++)
  {
    for(var j = 0; j < 7 - i; j++)
    {
      this.hexs[num] = new Hex(
        $hexs,0 , num,
        new Vector(x + (i - 2) * DELTA_X, y + (j - 2 + (i - 2) / 2) * DELTA_Y));
      num++;
    }
  }
  this.rotate = function(num)
  {
    var arround = ARROUND[num];
    console.log(JSON.stringify(arround));
    var last = this.hexs[arround[arround.length - 1]];
    var lastcenter = this.hexs[arround[0]].center.clone();
    var rotatepoint = this.hexs[num].center;
    for(var i = 1; i < arround.length; i++)
    {
      this.hexs[arround[i - 1]].rotateto(this.hexs[arround[i]].center, rotatepoint);
      //this.hexs[arround[i - 1]].setcenterv(this.hexs[arround[i]].center);
      this.hexs[arround[i - 1]].num = arround[i];
    }
    last.rotateto(lastcenter, rotatepoint);
    //last.setcenterv(lastcenter);
    last.num = arround[0];
    for(var i=arround.length -1; i>0; i--)
    {
      this.hexs[arround[i]] = this.hexs[arround[i - 1]];
    }
    this.hexs[arround[0]] = last;
    this.hexs[num].rotate();
  }
  this.onclick = function(x, y)
  {
    if(rotatinghex > 0)
      return false;
    var hex;
    for(var i=0; i < CLICKABLE.length; i++)
    {
      hex = this.hexs[CLICKABLE[i]];
      if(hex.mousein(x, y))
      {
        console.log("click hex:" + hex.num);
        this.rotate(hex.num);
        return true;
      }
    }
    return false;
  }
  this.update = function()
  {
    for(var i=0; i<this.hexs.length; i++)
    {
      this.hexs[i].update();
    }
  }
}