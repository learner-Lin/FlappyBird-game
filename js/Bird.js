(function () {
    let Bird = function () {
        this.x = (game.canvas.width - 34) / 2;;
        this.y = 0.2 * game.canvas.height;
        this.changeY = 0;
        this.rotate = 0;
        this.status = "drop";
        this.img = [game.allImg["bird"]];
        this.wing = 1;
    };

    Bird.prototype.update = function () {
        if (this.status == "drop") {
            //下落
            this.changeY += 0.5;
            this.rotate += 0.03;
        } else if (this.status == "up") {
            //上升
            this.changeY -= 0.8;
            if (this.changeY < 0) {
                this.status = "drop";
            }
        }
        this.y += this.changeY;
        this.y < 20 ? this.y = 20 : null;
        this.wing++;
        this.wing > 3 ? this.wing = 0 : null;
        // 小鸟边界，用于检测碰撞；
        this.x1 = this.x - 17;
        this.x2 = this.x + 17;
        this.y1 = this.y - 12;
        this.y2 = this.y + 12;

        // 落地检测
        if (this.y > game.canvas.height - 112 - 15) {
            game.scene=3;
            game.sM.enter(3);
        };
        // if(this.y===game.canvas.height-112){console.log(this.y);this.y=100;}
    };
    Bird.prototype.render = function () {
        game.draw.save();
        game.draw.translate(this.x, this.y);
        game.draw.rotate(this.rotate);
        switch (this.wing) {
            case 0:
                game.draw.drawImage(this.img[0], 0, 0, 34, 24, -17, -12, 34, 24); break;
            case 1:
                game.draw.drawImage(this.img[0], 0, 24, 34, 24, -17, -12, 34, 24); break;
            case 2:
                game.draw.drawImage(this.img[0], 0, 48, 34, 24, -17, -12, 34, 24); break;
            case 3:
                game.draw.drawImage(this.img[0], 0, 48, 34, 24, -17, -12, 34, 24); break;
            default:
                null;
        };
        game.draw.restore();
    };
    Bird.prototype.fly = function () {
        this.changeY = -10;
        this.rotate = -0.8;
        this.status = "up";
    };
    window.Bird = Bird;
})();