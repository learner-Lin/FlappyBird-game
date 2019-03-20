(function () {
    let Game = function () {
        let canvas = this.canvas = document.getElementById("canvas");
        this.draw = canvas.getContext("2d");
        //设置画布宽高，响应式
        // 获取一屏的宽
        let W = document.documentElement.clientWidth;
        let H = document.documentElement.clientHeight;
        //设置画布宽高
        canvas.width = W > 420 ? 420 : W;
        canvas.height = H > 823 ? 823 : H;
        // 场景编号
        this.scene = 0;
        this.score = 0;
        this.loadImg();
        if (!localStorage.getItem("FB")) {
            localStorage.setItem("FB", "[]");
        };
    };

    Game.prototype.loadImg = function () {
        // 图片加载进度
        this.allImg = {
            "bird": "./img/bird.png",
            "font_big_0": "./img/font_big_0.png",
            "font_big_1": "./img/font_big_1.png",
            "font_big_2": "./img/font_big_2.png",
            "font_big_3": "./img/font_big_3.png",
            "font_big_4": "./img/font_big_4.png",
            "font_big_5": "./img/font_big_5.png",
            "font_big_6": "./img/font_big_6.png",
            "font_big_7": "./img/font_big_7.png",
            "font_big_8": "./img/font_big_8.png",
            "font_big_9": "./img/font_big_9.png",
            "land": "./img/land.png",
            "sky": "./img/sky.png",
            "pipetop": "./img/pipetop.png",
            "pipebottom": "./img/pipebottom.png",
            "replay": "./img/replay.png",
            "splash": "./img/splash.png",
            "scoreboard": "./img/scoreboard.png",
            "medal_gold": "./img/medal_gold.png",
            "font_small_0": "./img/font_small_0.png",
            "font_small_1": "./img/font_small_1.png",
            "font_small_2": "./img/font_small_2.png",
            "font_small_3": "./img/font_small_3.png",
            "font_small_4": "./img/font_small_4.png",
            "font_small_5": "./img/font_small_5.png",
            "font_small_6": "./img/font_small_6.png",
            "font_small_7": "./img/font_small_7.png",
            "font_small_8": "./img/font_small_8.png",
            "font_small_9": "./img/font_small_9.png",

        };
        let progress = new Progress(this.draw, canvas.width * 0.1, canvas.height / 3, 0, 30);
        let bg = new Background();
        let count = 0;//统计加载完成数
        let total = Object.keys(this.allImg).length;//所有图片个数
        //遍历对象判断图片是否加载完成
        for (let key in this.allImg) {
            //只要图片onload厨房，就说明加载成功
            //自己创建一个img当做替身
            let img = new Image;
            img.src = this.allImg[key];
            ((src) => {
                this.allImg[key] = new Image;
                this.allImg[key].src = src;
            })(this.allImg[key])
            img.onload = () => {
                count++;
                this.clear();
                progress.update(count / total * canvas.width * 0.8);
                progress.render();
                // 当图片完成加载，游戏开始
                if (count == total) {
                    this.start();
                }
            };
        };
    };

    Game.prototype.clear = function () {
        // 清屏
        this.draw.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    Game.prototype.start = function () {

        // this.draw.fillStyle = "red";
        // this.draw.font = "30px consolas";
        // this.draw.fillText("游戏开始", canvas.width * 0.1, canvas.height / 3 - 20);
        //定时器
        this.f = 0;
        //实例化场景管理器
        this.sM = new SceneManager();
        // 默认为0，进入欢迎界面
        this.sM.enter(1);
        setTimeout(() => {
            setInterval(() => {
                this.f++;
                //先清屏
                this.clear();
                this.sM.updateAndRender();
            }, 20);
        }, 600);
    };

    Game.prototype.bindEvent = function () {
        this.canvas.onclick = () => {
            this.bird.fly();
        };
    };
    window.Game = Game;
})();