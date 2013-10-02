function Vector(x, y){
  this.x = x;
  this.y = y;
  this.add = function(v2)
  {
    this.x += v2.x;
    this.y += v2.y;
    return this;
  };
  this.sub = function(v2)
  {
    this.x -= v2.x;
    this.y -= v2.y;
    return this;
  };
  this.pro = function(k)
  {
    this.x *= k;
    this.y *= k;
    return this;
  };
  this.minus = function()
  {
    this.x = -x;
    this.y = -y;
    return this;
  };
  this.length = function()
  {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };
  this.clone = function()
  {
    return new Vector(this.x, this.y);
  };
  this.dotproduct = function(v2)
  {
    return this.x * v2.x + this.y * v2.y;
  };
  this.crossproduct = function(v2)
  {
    return this.x * v2.y - this.y * v2.x;
  };
  this.rotate = function(angle)
  {
    var x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    this.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    this.x = x;
    return this;
  };
  this.set = function(v2)
  {
    this.x = v2.x;
    this.y = v2.y;
    return this;
  }
}
