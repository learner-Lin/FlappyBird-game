(function () {
    let Pipe = function () {
        //上管高度，随机100-300
        this.h1 = Math.round(Math.random() * game.canvas.height * 0.2 + game.canvas.height * 0.1);
        //空隙固定180
        this.space = 180;
        //下管高度= canvas的高-中间-上管
        this.h2 = game.canvas.height - 112 - this.h1 - this.space;
        this.x = game.canvas.width * 1.5;
        game.pipeArr.push(this);
        this.done = true;
    };
    window.Pipe = Pipe;
    Pipe.prototype.update = function () {
        // X每次减少
        this.x -= 2;
        // // 一旦管子走出画布，从数组中移除
        // if (this.x <= -50) {
        //     for (let i = 0; i < game.pipeArr.length; i++) {
        //         if (game.pipeArr[i] == this)
        //             game.pipeArr.splice(i, 1);
        //         i--;
        //     }
        // }
        // 碰撞检测，碰上面，碰下面
        this.x1 = this.x;
        this.x2 = this.x + 40;
        this.y1 = this.h1;
        this.y2 = this.h1 + this.space;
        if ((game.bird.x2 > this.x1 && game.bird.x1 < this.x2 && game.bird.y1 < this.y1)
            || (game.bird.x2 > this.x1 && game.bird.x1 < this.x2 && game.bird.y2 > this.y2+5)) {
                // clearInterval(game.timer);
                game.scene=3;
                game.sM.enter(3);
        };

        // 加分检测
        if(this.done&&game.bird.x1 > this.x2){
            game.score++;
            this.done = false;
        };

    };

    Pipe.prototype.render = function () {
        game.draw.drawImage(game.allImg["pipetop"], 0, 512 - this.h1, 40, this.h1, this.x, 0, 40, this.h1);
        game.draw.drawImage(game.allImg["pipebottom"], 0, 0, 40, this.h2, this.x, game.canvas.height - this.h2 - 112, 40, this.h2);
    };
})();