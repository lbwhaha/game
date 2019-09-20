var startbt = document.getElementById('startbt');
var game = document.getElementById('game');
var start = document.getElementById('start');
var over = document.getElementById('over');
var back = document.getElementById('back');
startbt.onmouseover = function () {
    startbt.style.transform = 'scale(1.15)';
    startbt.style.cursor = 'pointer';
    startbt.onmouseout = function () {
        startbt.style.transform = 'scale(1)'
    };
    startbt.onmousedown = function () {
        startbt.style.transform = 'scale(1)';
        startbt.style.cursor = 'pointer';
    };
};
back.onmouseover = function () {
    back.style.transform = 'scale(1.15)';
    back.style.cursor = 'pointer';
    back.onmouseout = function () {
        back.style.transform = 'scale(1)'
    };
    back.onmousedown = function () {
        back.style.transform = 'scale(1)';
        back.style.cursor = 'pointer';
    };
};

function gamestart() {
    start.style.display = 'none';
    game.style.display = 'block';
    over.style.display = 'none';
    onLoad();
}
function reload() {
    location.reload();
}