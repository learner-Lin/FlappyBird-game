let Progress = function(draw,x,y,w,h){
    //拿不到画布，要将画布当做参数传进来
    this.draw = draw;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};
Progress.prototype.update = function(w){
    this.w = w;
};
Progress.prototype.render = function(){
    this.draw.fillStyle = "yellowgreen";
    this.draw.fillRect(this.x,this.y,this.w,this.h)
};