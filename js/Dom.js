/*界面*/
function UI() {
    this.draw = function (time,targetscore,score,rank) {
        ctx.beginPath();
        ctx.fillStyle = '#66512c';
        ctx.font = '30px 隶书';
        ctx.fillText('金钱：',20,50);
        ctx.fillText('目标钱数：',20,90);
        ctx.fillText('时间：',770,50);
        ctx.fillText('第：',770,90);
        ctx.fillText('关',900,90);
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.font = '35px 宋体';
        ctx.fillText(time,870,50);
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = '#FFEC54';
        ctx.font = '35px 宋体';
        ctx.shadowColor = 'black';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.fillText('$'+targetscore,160,95);
        ctx.restore();
        ctx.fillText(time,870,50);
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = '52FF65';
        ctx.font = '35px 宋体';
        ctx.shadowColor = 'black';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.fillText('$'+score,160,55);
        ctx.restore();
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.font = '35px 宋体';
        ctx.fillText(rank,830,90);
        ctx.textAlign = 'left';
        ctx.restore()
    }
}
/*矿工*/
function Miner() {
    var _this = this;
    this.img = new Image();
    this.midframe = 20;
    this.lastframe = 40;
    this.midframe1 = 30;
    this.lastframe1 = 60;
    this.status = 0;
    this.x = 0;
    this.draw = function () {
        if (_this.status == 0) {
            _this.img.src = './img/miner.png';
            ctx.beginPath();
            ctx.drawImage(_this.img, 419, -20);
        } else if (_this.status == 1) {
            _this.img.src = './img/miner2.png';
            ctx.beginPath();
            ctx.drawImage(_this.img, 0, 0, 200, 200, 419, -10, 200, 200);
        } else if (_this.status == 2) {
            _this.img.src = './img/miner2.png';
            ctx.beginPath();
            ctx.drawImage(_this.img, _this.x * _this.img.width / 2, 0, 200, 200, 419, -10, 200, 200);
        }
        else if (_this.status == 3) {
            _this.img.src = './img/miner2.png';
            ctx.beginPath();
            ctx.drawImage(_this.img, _this.x * _this.img.width / 2, 0, 200, 200, 419, -10, 200, 200);
        }
    };
    this.updateframe = function (frame) {
        if (_this.status == 2){
            if (frame>=_this.midframe) {
                _this.x = 1;
                _this.midframe += 40;
            }else if (frame>=_this.lastframe){
                _this.x = 0;
                _this.lastframe += 40;
            }
        }
        if (_this.status == 3){
            if (frame>=_this.midframe1) {
                _this.x = 1;
                _this.midframe1 += 60;
            }else if (frame>=_this.lastframe1){
                _this.x = 0;
                _this.lastframe1 += 60;
            }
        }
    }
}
/*钩子*/
function Hook() {
    var _this = this;
    this.img = new Image();
    this.img.src = './img/hook.png';
    this.draw = function (x,y,angle) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(x,y);
        ctx.rotate(Math.PI*angle/180);
        ctx.translate(-3,-22);
        ctx.drawImage(_this.img,0,0,31,48,0,0,31,48);
        ctx.restore();
    }
}
/*出钩钩子*/
function Hook2(angle) {
    var _this = this;
    this.img = new Image();
    this.status = 0;
    this.stopangle = angle;
    this.draw = function (x,y) {
        if (_this.status==0){
            _this.img.src = './img/hook.png';
            ctx.save();
            ctx.beginPath();
            ctx.translate(x,y);
            ctx.rotate(Math.PI*_this.stopangle/180);
            ctx.translate(-3,-22);
            ctx.drawImage(_this.img,0,0,200,200,0,0,200,200);
            ctx.restore();
        }
        else if (_this.status==1){
            _this.img.src = './img/hook1.png';
            ctx.save();
            ctx.beginPath();
            ctx.translate(x,y);
            ctx.rotate(Math.PI*(_this.stopangle-160)/180);
            ctx.translate(-62,-17);
            ctx.drawImage(_this.img,0,0,165,174,0,0,70,70);
            ctx.restore();
        }
        else if (_this.status==2){
            _this.img.src = './img/hook2.png';
            ctx.save();
            ctx.beginPath();
            ctx.translate(x,y);
            ctx.rotate(Math.PI*(_this.stopangle-45)/180);
            ctx.translate(-7,-1);
            ctx.drawImage(_this.img,0,0,70,67,0,0,35,35);
            ctx.restore();
        }
        else if (_this.status==3){
            _this.img.src = './img/hook3.png';
            ctx.save();
            ctx.beginPath();
            ctx.translate(x,y);
            ctx.rotate(Math.PI*(_this.stopangle-90)/180);
            ctx.translate(-8,0);
            ctx.drawImage(_this.img,0,0,39,47,0,0,20,20);
            ctx.restore();
        }
        else if (_this.status==4){
            _this.img.src = './img/hook4.png';
            ctx.save();
            ctx.beginPath();
            ctx.translate(x,y);
            ctx.rotate(Math.PI*(_this.stopangle-115)/180);
            ctx.translate(-35,-3);
            ctx.drawImage(_this.img,0,0,105,105,0,0,40,40);
            ctx.restore();
        }
    };
}
/*绳子的角度*/
function targetAngle() {
    var _this = this;
    this.angle = 30+parseInt(Math.random()*120);
    this.direction = true;
    this.updateAngle = function () {
        if (_this.angle<=30){
            _this.direction = true;
        }
        if (_this.angle>=150){
            _this.direction = false;
        }
        if (_this.direction){
            _this.angle++;
        }
        if (!_this.direction){
            _this.angle--;
        }
    };
}

/*摇摆绳*/
function Minerline() {
    var _this = this;
    this.positionX = 0;
    this.positionY = 0;
    this.draw = function () {
        ctx.beginPath();
        ctx.strokeStyle = '#211922';
        ctx.moveTo(500,95);
        ctx.lineTo(_this.positionX,_this.positionY);
        ctx.lineWidth = 2;
        ctx.stroke();
    };
    this.updatePos = function (angle) {
        _this.positionX = 500+75*Math.cos(Math.PI*angle/180);
        _this.positionY = 95+75*Math.sin(Math.PI*angle/180);
    };
}
/*出钩绳*/
function Minerline2(angle) {
    var _this = this;
    this.positionX = 0;
    this.positionY = 0;
    this.status = 0;
    this.direction = true;
    this.ds = 1;
    this.stopangle = 0;
    this.startPosY = 0;
    this.draw = function () {
        ctx.beginPath();
        ctx.strokeStyle = '#211922';
        ctx.moveTo(500,95);
        ctx.lineTo(_this.positionX,_this.positionY);
        ctx.lineWidth = 2;
        ctx.stroke();
    };
    this.updatePos = function () {
        _this.stopangle = angle;
        _this.startPosY = 95+75*Math.sin(Math.PI*_this.stopangle/180);
        if (_this.ds>=650){
            _this.direction = false;
        }
        if (_this.positionX<0||_this.positionX>1000){
            _this.direction = false;
        }
        if (_this.direction){
            _this.ds+=5;
        }
        else if (!_this.direction) {
            if (_this.status==4){
                _this.ds -= 0.3;
            }
            else if(_this.status==1){
                _this.ds -= 1;
            }
            else if(_this.status==2){
                _this.ds -= 1.5;
            }
            else if(_this.status==3){
                _this.ds -= 3;
            }
            else if(_this.status==0){
                _this.ds -= 5;
            }
        }
        _this.positionX = 500+(75+_this.ds)*Math.cos(Math.PI*_this.stopangle/180);
        _this.positionY = 95+(75+_this.ds)*Math.sin(Math.PI*_this.stopangle/180);
    }
}
/*黄金100分*/
function Gold(positionX,positionY) {
    var _this = this;
    this.img = new Image();
    this.img.src = './img/gold100.png';
    this.positionX = positionX;
    this.positionY = positionY;
    this.status = false;
    this.v = 0;
    this.draw = function () {
        ctx.beginPath();
        ctx.drawImage(_this.img,0,0,171,165,_this.positionX,_this.positionY,70,70)
    };
    this.updatePos = function (angle) {
        if (_this.status = true){
            _this.v++;
            _this.positionX = positionX-_this.v*Math.cos(Math.PI*angle/180);
            _this.positionY = positionY-_this.v*Math.sin(Math.PI*angle/180);
        }
    }
}
/*黄金50分*/
function midGold(positionX,positionY) {
    var _this = this;
    this.img = new Image();
    this.img.src = './img/gold50.png';
    this.positionX = positionX;
    this.positionY = positionY;
    this.status = false;
    this.v = 0;
    this.draw = function () {
        ctx.beginPath();
        ctx.drawImage(_this.img,0,0,65,60,_this.positionX,_this.positionY,35,35)
    };
    this.updatePos = function (angle) {
        if (_this.status = true){
            _this.v+=1.5;
            _this.positionX = positionX-_this.v*Math.cos(Math.PI*angle/180);
            _this.positionY = positionY-_this.v*Math.sin(Math.PI*angle/180);
        }
    }
}
/*黄金25分*/
function smallGold(positionX,positionY) {
    var _this = this;
    this.img = new Image();
    this.img.src = './img/gold25.png';
    this.positionX = positionX;
    this.positionY = positionY;
    this.status = false;
    this.v = 0;
    this.draw = function () {
        ctx.beginPath();
        ctx.drawImage(_this.img,0,0,35,32,_this.positionX,_this.positionY,20,20)
    };
    this.updatePos = function (angle) {
        if (_this.status = true){
            _this.v+=3;
            _this.positionX = positionX-_this.v*Math.cos(Math.PI*angle/180);
            _this.positionY = positionY-_this.v*Math.sin(Math.PI*angle/180);
        }
    }
}
/*石头12分*/
function Rock(positionX,positionY,r) {
    var _this = this;
    this.r = r;
    this.img = new Image();
    this.img.src = './img/rock.png';
    this.positionX = positionX;
    this.positionY = positionY;
    this.status = false;
    this.v = 0;
    this.draw = function () {
        ctx.beginPath();
        ctx.drawImage(_this.img,0,0,100,90,_this.positionX,_this.positionY,40,36)
    };
    this.updatePos = function (angle) {
        if (_this.status = true){
            _this.v+=0.3;
            _this.positionX = positionX-_this.v*Math.cos(Math.PI*angle/180);
            _this.positionY = positionY-_this.v*Math.sin(Math.PI*angle/180);
        }
    }
}
/*炸弹*/
function Boom(x) {
    var _this = this;
    this.img = new Image();
    this.img.src = './img/boom.png';
    this.positionX = 620;
    this.positionY = 70;
    this.draw = function () {
        ctx.beginPath();
        ctx.drawImage(_this.img,0,0,50,50,_this.positionX+x,_this.positionY,50,50);
    }
}