(function () {
    let SceneManager = function () {
        this.bindEvent();
    };

    SceneManager.prototype.enter = function () {
        switch (game.scene) {
            case 0:
                this.buttonX = (game.canvas.width - 115) / 2;
                this.buttonY = game.canvas.height;
                this.birdX = (game.canvas.width - 34) / 2;
                this.birdY = 0.4 * game.canvas.height;
                this.birdChangeY = 3;
                break;
            case 1:
                game.scene = 1;
                this.bird1X = (game.canvas.width - 34) / 2;
                this.bird1Y = 0.2 * game.canvas.height;
                this.splashX = (game.canvas.width - 188) / 2;
                this.splashY = 0.4 * game.canvas.height;
                this.splashAlpha = 0;
                this.splashAlphaChange = 0.05;
                break;
            case 2:
                game.scene = 2;
                game.score = 0;
                // 载入背景、小鸟、小鸟飞函数
                game.bg = new Background();
                game.land = new Land();
                game.bird = new Bird();
                game.bindEvent();
                game.pipeArr = [];
                break;
            case 3:
                game.scene = 3;
                break;
            case 4:
                game.scene = 4;
                this.best = 0;
                this.gameoverY = 0;
                this.bindEvent();
                // 重新开始按键
                this.buttonX = (game.canvas.width - 115) / 2;
                this.buttonY = game.canvas.height;
                // 获取成绩数组
                let arr = JSON.parse(localStorage.getItem("FB"));
                // 获取前三
                arr.sort((a, b) => b - a);
                // 现在的成绩与前三比较
                // 获取最大成绩储存
                this.best = arr[0];
                if (game.score > arr[0]) {
                    this.best = game.score;
                }
                // 将分数储存到数组，放入缓存
                if (!arr.includes(game.score)) {
                    arr.push(game.score);
                }
                localStorage.setItem("FB", JSON.stringify(arr));
                // 死时的分数
                this.deadscore = game.score.toString();
                this.bestscore = this.best.toString();
                break;

        }
    };

    SceneManager.prototype.updateAndRender = function () {
        switch (game.scene) {
            case 0:
                // 场景0，欢迎界面
                //背景图片
                game.draw.drawImage(game.allImg["sky"], 0, game.canvas.height - 512);
                game.draw.drawImage(game.allImg["sky"], 288, game.canvas.height - 512);
                game.draw.drawImage(game.allImg["land"], 0, game.canvas.height - 112);
                game.draw.drawImage(game.allImg["land"], 336, game.canvas.height - 112);
                //按键
                this.buttonY -= 10;
                if (this.buttonY < 0.5 * game.canvas.height) this.buttonY = 0.5 * game.canvas.height;
                game.draw.drawImage(game.allImg["replay"], this.buttonX, this.buttonY);
                // 小鸟
                if (this.birdY < 0.25 * game.canvas.height || this.birdY > 0.43 * game.canvas.height) {
                    this.birdChangeY *= -1;
                };
                this.birdY -= this.birdChangeY;
                game.draw.drawImage(game.allImg["bird"], 0, 24, 34, 24, this.birdX, this.birdY, 34, 24);
                break;
            case 1:
                // 场景1
                //背景图片
                game.draw.drawImage(game.allImg["sky"], 0, game.canvas.height - 512);
                game.draw.drawImage(game.allImg["sky"], 288, game.canvas.height - 512);
                game.draw.drawImage(game.allImg["land"], 0, game.canvas.height - 112);
                game.draw.drawImage(game.allImg["land"], 336, game.canvas.height - 112);
                game.draw.drawImage(game.allImg["bird"], 0, 24, 34, 24, this.bird1X, this.bird1Y, 34, 24);
                //闪烁图
                if (this.splashAlpha < 0 || this.splashAlpha > 1) {
                    this.splashAlphaChange *= -1;
                };
                this.splashAlpha += this.splashAlphaChange;
                game.draw.save();
                game.draw.globalAlpha = this.splashAlpha;
                game.draw.drawImage(game.allImg["splash"], this.splashX, this.splashY);
                game.draw.restore();
                break;
            case 2:
                // 游戏开始
                game.bg.update();
                game.bg.render();
                game.land.update();
                game.land.render();
                game.bird.update();
                game.bird.render();
                // 每100帧渲染管子
                game.f % 100 === 0 && new Pipe();
                game.pipeArr.forEach((item) => {
                    item.update();
                    item.render();
                });
                ScoreRender();
                break;
            case 3:
                // 停止在上一个场景结束的时候
                game.bg.render();
                game.land.render();
                game.bird.render();
                for (let i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i].render();
                };
                game.bird.y += 15;
                if (game.bird.y > game.canvas.height - 112 - 15) {
                    game.bird.y = game.canvas.height - 112 - 15
                    game.scene = 4;
                    game.sM.enter(4);
                };
                break;
            case 4:
                // 停止在上一个场景结束的时候
                game.bg.render();
                game.land.render();
                game.bird.render();
                for (let i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i].render();
                };
                // 计分板
                this.gameoverY += 5;
                game.draw.drawImage(game.allImg["scoreboard"], (game.canvas.width - 236) / 2, this.gameoverY)
                game.draw.drawImage(game.allImg["medal_gold"], (game.canvas.width - 236) / 2 + 32, this.gameoverY + 113)
                if (this.gameoverY > game.canvas.height * 0.23) {
                    this.gameoverY = game.canvas.height * 0.23;
                    //重新开始按键，场景2
                    this.buttonY = this.gameoverY + 250;
                    game.draw.drawImage(game.allImg["replay"], this.buttonX, this.buttonY);
                }
                // 渲染死亡分数，拼接图片
                for (let i = 0; i < this.deadscore.length; i++) {
                    game.draw.drawImage(game.allImg["font_small_" + this.deadscore[i]], (game.canvas.width - 236) / 2 + 180 + 12 * i, this.gameoverY + 113);
                };
                // 渲染最好分数，拼接图片
                for (let i = 0; i < this.bestscore.length; i++) {
                    game.draw.drawImage(game.allImg["font_small_" + this.bestscore[i]], (game.canvas.width - 236) / 2 + 180 + 12 * i, this.gameoverY + 153);
                };

                break;
            default:
                null;
        };
    };

    SceneManager.prototype.bindEvent = function () {
        game.canvas.onclick = (e) => {
            switch (game.scene) {
                case 0:
                    var x = e.clientX;
                    var y = e.clientY;
                    var rect = game.canvas.getBoundingClientRect();
                    x -= rect.left;
                    y -= rect.top;
                    if (x > this.buttonX && x < (this.buttonX + 115) && y > this.buttonY
                        && y < (this.buttonY + 70)) {
                        game.scene = 1;
                        this.enter(1);
                    }
                    break;
                case 1:
                    game.scene = 2;
                    this.enter(2);
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    var x = e.clientX;
                    var y = e.clientY;
                    var rect = game.canvas.getBoundingClientRect();
                    x -= rect.left;
                    y -= rect.top;
                    if (x > this.buttonX && x < (this.buttonX + 115) && y > this.buttonY
                        && y < (this.buttonY + 70)) {
                        game.scene = 1;
                        this.enter(1);
                    }
                    break;
                default:
                    null;
            };
        };
    };
    function ScoreRender() {
        // 渲染分数，拼接图片
        let score = game.score.toString();
        let cenline = game.canvas.width / 2 - score.length * 24 / 2;
        for (let i = 0; i < score.length; i++) {
            game.draw.drawImage(game.allImg["font_big_" + score[i]], cenline + 24 * i, 0.1 * game.canvas.height);
        };
    }
    window.SceneManager = SceneManager;
})();