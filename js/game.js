var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
var gGame = null;

function onLoad() {
    gGame = new Game();
    gGame.draw();
    gGame.update();
}

function Game() {
    var _this = this;
    this.ui = null;
    this.sta = 0;//出钩状态
    this.targetangle = null;
    this.miner = null;
    this.minerline = null;
    this.golds = [];
    this.midgolds = [];
    this.smallgolds = [];
    this.rock = [];
    this.position = [];
    this.hook = null;
    this.frame = 0;
    this.lasttime = 0;
    this.time = 60;
    this.score = 0;
    this.rank = 1;
    this.targetscore = 650;
    this.x = 0;
    this.booms = [];
    this.linesta = 0;
    this.draw = function () {
        _this.miner = new Miner();
        _this.minerline = new Minerline();
        _this.targetangle = new targetAngle();
        _this.hook = new Hook();
        _this.ui = new UI();
        /*炸弹*/
        while (_this.booms.length<3){
            _this.booms.push(new Boom(_this.x));
            _this.x += 20;
        }
        /*100分金子*/
        while(_this.position.length <= 1){
            var x = parseInt(Math.random()*650)+200;
            var y = parseInt(Math.random()*250)+500;
            if(_this.position.length >= 1){
                for(var i = 0;i< _this.position.length;i++){
                    if (Math.abs(x - _this.position[i].posX) <= 75 && Math.abs(y - _this.position[i].posY) <= 75){
                        break;
                    }
                    if(i >= _this.position.length - 1){
                        _this.position.push({posX:x,posY:y});
                        _this.golds.push(new Gold(x,y));
                    }
                }
            }else{
                _this.position.push({posX:x,posY:y});
                _this.golds.push(new Gold(x,y));
            }
        }
        /*50分金子*/
        while(_this.position.length > 1&&_this.position.length <= 4){
            var x = parseInt(Math.random()*680)+200;
            var y = parseInt(Math.random()*280)+400;
            for(var i = 0;i< _this.position.length;i++){
                if (Math.abs(x - _this.position[i].posX) <= 70 && Math.abs(y - _this.position[i].posY) <= 70){
                    break;
                }
                if(i >= _this.position.length - 1){
                    _this.position.push({posX:x,posY:y});
                    _this.midgolds.push(new midGold(x,y));
                }
            }
        }
        /*25分金子*/
        while(_this.position.length > 4&&_this.position.length <= 8){
            var x = parseInt(Math.random()*690)+200;
            var y = parseInt(Math.random()*200)+200;
            for(var i = 0;i< _this.position.length;i++){
                if (Math.abs(x - _this.position[i].posX) <= 70 && Math.abs(y - _this.position[i].posY) <= 70){
                    break;
                }
                if(i >= _this.position.length - 1){
                    _this.position.push({posX:x,posY:y});
                    _this.smallgolds.push(new smallGold(x,y));
                }
            }
        }
        /*石头*/
        while(_this.position.length > 8&&_this.position.length <= 13){
            var x = parseInt(Math.random()*620)+200;
            var y = parseInt(Math.random()*160)+300;
            for(var i = 0;i< _this.position.length;i++){
                if (Math.abs(x - _this.position[i].posX) <= 70 && Math.abs(y - _this.position[i].posY) <= 70){
                    break;
                }
                if(i >= _this.position.length - 1){
                    _this.position.push({posX:x,posY:y});
                    _this.rock.push(new Rock(x,y,20));
                }
            }
        }
    };
    this.update = function () {
        ctx.clearRect(0,0,cvs.width,cvs.height);
        _this.judgetime();
        _this.frame++;
        _this.booms.forEach(function (val) {
            val.draw();
        });
        _this.ui.draw(_this.time,_this.targetscore,_this.score,_this.rank);
        _this.miner.draw();
        _this.miner.updateframe(_this.frame);
        _this.targetangle.updateAngle();
        _this.golds.forEach(function (val) {
            val.draw();
        });
        _this.midgolds.forEach(function (val) {
            val.draw();
        });
        _this.smallgolds.forEach(function (val) {
            val.draw();
        });
        _this.rock.forEach(function (val) {
            val.draw();
        });
        _this.minerline.updatePos(_this.targetangle.angle);
        _this.minerline.draw();
        _this.hook.draw(_this.minerline.positionX,_this.minerline.positionY,_this.targetangle.angle);
        _this.judgeline();
        _this.judge();
        window.requestAnimationFrame(_this.update);
    };
    document.onkeydown = function (e) {
        if (e.keyCode==40) {
            if (_this.sta == 0) {
                _this.miner.status = true;
                _this.minerline = new Minerline2(_this.targetangle.angle);
                _this.hook = new Hook2(_this.targetangle.angle);
                _this.sta = 1;
                _this.miner.status = 1;
            }
        }
        if (e.keyCode==38){
            if (_this.linesta == 1) {
                _this.booms.pop();
                _this.minerline.status = 0;
                _this.hook.status = 0;
                _this.linesta = 0;
            }
        } 
    };
    this.judgeline = function () {
        if (_this.minerline.ds<= 0){
            if (_this.hook.status==1){
                _this.score += 500;
            }
            else if (_this.hook.status==2){
                _this.score += 250;
            }
            else if (_this.hook.status==3){
                _this.score += 100;
            }
            else if (_this.hook.status==4){
                _this.score += 11;
            }
            _this.miner.status = 0;
            _this.minerline = new Minerline();
            _this.hook = new Hook();
            _this.sta = 0;
            _this.linesta = 0;
        }
    };
    this.judge = function () {
        _this.golds.forEach(function (val,index) {
            if (_this.minerline.positionX>=val.positionX&&_this.minerline.positionX<=val.positionX+70&&_this.minerline.positionY>=val.positionY&&_this.minerline.positionY<=val.positionY+35){
                _this.miner.status = 3;
                _this.minerline.direction = false;
                _this.hook.status = 1;
                _this.minerline.status = 1;
                _this.linesta = 1;
                val.status = true;
                val.updatePos(_this.minerline.stopangle);
                _this.golds.splice(index,1)
            }
        });
        _this.midgolds.forEach(function (val,index) {
            if (_this.minerline.positionX>=val.positionX&&_this.minerline.positionX<=val.positionX+35&&_this.minerline.positionY>=val.positionY&&_this.minerline.positionY<=val.positionY+15){
                _this.miner.status = 2;
                _this.minerline.direction = false;
                _this.hook.status = 2;
                _this.minerline.status = 2;
                _this.linesta = 1;
                val.status = true;
                val.updatePos(_this.minerline.stopangle);
                _this.midgolds.splice(index,1)
            }
        });
        _this.smallgolds.forEach(function (val,index) {
            if (_this.minerline.positionX>=val.positionX&&_this.minerline.positionX<=val.positionX+20&&_this.minerline.positionY>=val.positionY&&_this.minerline.positionY<=val.positionY+10){
                _this.miner.status = 2;
                _this.minerline.direction = false;
                _this.hook.status = 3;
                _this.minerline.status = 3;
                _this.linesta = 1;
                val.status = true;
                val.updatePos(_this.minerline.stopangle);
                _this.smallgolds.splice(index,1)
            }
        });
        _this.rock.forEach(function (val,index) {
            if (_this.minerline.positionX>=val.positionX&&_this.minerline.positionX<=val.positionX+40&&_this.minerline.positionY>=val.positionY&&_this.minerline.positionY<=val.positionY+20){
                _this.miner.status = 3;
                _this.minerline.direction = false;
                _this.hook.status = 4;
                _this.minerline.status = 4;
                _this.linesta = 1;
                val.status = true;
                val.updatePos(_this.minerline.stopangle);
                _this.rock.splice(index,1)
            }
        });
    };
    this.judgetime = function () {
        if (_this.frame>=_this.lasttime+60) {
            _this.time--;
            _this.lasttime = _this.frame;
        }
        if (_this.time == 0){
            if (_this.score>=_this.targetscore){
                start.style.display = 'none';
                game.style.display = 'none';
                over.style.display = 'block';
                over.style.backgroundImage = 'url("img/overbg1.png")'
            }
            else if (_this.score<_this.targetscore) {
                start.style.display = 'none';
                game.style.display = 'none';
                over.style.display = 'block';
                over.style.backgroundImage = 'url("img/overbg2.png")'
            }
        }
    }
}


