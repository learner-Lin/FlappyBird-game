(function () {
    let Land = function () {
        this.x = 0;
        this.w = 336;
        this.h = 112;
        this.step = 1;
    };
    window.Land = Land;
    Land.prototype.update = function(){
        // X每次减少
        this.x -= this.step * 2;
        // 临界值判断
        if (this.x <= -this.w) {
            this.x = 0;
        }
    };
    Land.prototype.render = function(){
        game.draw.drawImage(game.allImg["land"], this.x, game.canvas.height - this.h);
        game.draw.drawImage(game.allImg["land"], this.x + this.w, game.canvas.height - this.h);
        game.draw.drawImage(game.allImg["land"], this.x + this.w * 2, game.canvas.height - this.h);
    };
})();