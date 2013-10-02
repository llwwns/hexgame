var ROTATE_RATE = 10;
var ROTATE_RATE_RAD = ROTATE_RATE / 180 * Math.PI;
var MAX_ANGLE = 60;
var HEX_HEIGHT = 75;
var HEX_WIDTH = 86;
var RADIUS = (HEX_HEIGHT + HEX_WIDTH) / 4;
var URLS = ["pics/green.png", "pics/blue.png", "pics/red.png"]
var HEXANI = [
  new $.gQ.Animation({imageURL: URLS[0]}),
  new $.gQ.Animation({imageURL: URLS[1]}),
  new $.gQ.Animation({imageURL: URLS[2]})];
var rotatinghex = 0;
function Hex(obj, typ, num, center)
{
  this.center = center;
  this.angle = 0;
  this.typ = typ;
  this.rotating = false;
  this.num = num;
  this.ani = HEXANI[typ];//new $.gQ.Animation({imageURL: URLS[typ]});
  obj.addSprite("hex" + num,{animation: this.ani, width: HEX_WIDTH, height: HEX_HEIGHT});
  this.$ani = $("#hex" + num);
  this.update = function()
  {
    if(this.rotating)
    {
      if(this.angle < MAX_ANGLE)
      {
        this.angle += ROTATE_RATE;
        this.$ani.rotate(this.angle);
        this.center.sub(this.rotatepoint).rotate(ROTATE_RATE_RAD).add(this.rotatepoint);
        this.setcenterv(this.center);
      }else
      {
        this.angle = 0;
        this.$ani.rotate(0);
        this.rotating = false;
        rotatinghex --;
        this.setcenterv(this.centertarget);
      }
    }
  };
  this.setcenter = function(x, y)
  {
    this.$ani.xy(x - HEX_WIDTH / 2, y - HEX_HEIGHT / 2);
    this.center.x = x;
    this.center.y = y;
  }
  this.setcenterv = function(v)
  {
    this.setcenter(v.x, v.y);
  }
  this.rotateto = function(v, o)
  {
    this.rotating = true;
    rotatinghex ++;
    this.rotatepoint = o.clone();
    this.centertarget = v.clone();
  }
  this.rotate = function()
  {
    this.rotating = true;
    rotatinghex ++;
    this.rotatepoint = this.center.clone();
    this.centertarget = this.center.clone();
  }
  this.setcenter(center.x, center.y);
  this.mousein = function(x, y)
  {
    return (new Vector(x, y)).sub(this.center).length() <= RADIUS;
  }
}