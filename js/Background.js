(function () {
    let Background = function () {
        this.x = 0;
        this.w = 288;
        this.h = 512;
        this.step = 1;
    };
    window.Background = Background;

    Background.prototype.update = function () {
        // X每次减少
        this.x -= this.step * 2;
        // 临界值判断
        if (this.x <= -this.w) {
            this.x = 0;
        }
    };
    Background.prototype.render = function () {

        game.draw.drawImage(game.allImg["sky"], this.x, game.canvas.height - this.h);
        game.draw.drawImage(game.allImg["sky"], this.x + this.w, game.canvas.height - this.h);
        game.draw.drawImage(game.allImg["sky"], this.x + this.w * 2, game.canvas.height - this.h);

    };
})();
// (function(){
//     let Background = function(){

//     };
//     window.Background = Background;
//     Background.prototype.update = function(){

//     };
//     Background.prototype.render = function(){

//     };
// })();