var game = {
    data: [],
    score: 0,
    state: 1,
    GAME_OVER: 0,
    RUNNING: 1,
    PLAYING: 2,

    //开始
    start: function () {
        this.data = [[0, 0, 0, 0],//初始化数组
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]];
        this.state = this.RUNNING;
        this.score = 0;
        var div = document.getElementById("gameOver");
        div.style.display = "none";
        this.randomNum();
        this.randomNum();
        this.updateView();
    },
    isFull: function () {//判断是否界面的值已经满了
        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {
                if (this.data[row][col] == 0) {
                    return false;
                }
            }
        }
        return true;
    },
    randomNum: function () {//随机生成2和4
        while (this.isFull() == true) {
            var row = Math.floor(Math.random() * 4);
            var col = Math.floor(Math.random() * 4);
            if (this.data[row][col] == 0) {
                this.data[row][col] = Math.random() < 0.5 ? 2 : 4;
                break;
            }
        }
    },
    updateView: function () {
        //将数据显示到网页中
        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {
                var div = document.getElementById("c" + row + col);
                div.innerHTML = this.data[row][col] == 0 ? "" : this.data[row][col];
                div.className = this.data[row][col] == 0 ? "cell" : "cell n" + data[row][col];
            }
        }
        //分数
        var span = document.getElementById("score");
        span.innerHTML = this.score;
        if (this.isGameOver()) {
            this.state = this.GAME_OVER;
            var div = document.getElementById("gameOver");
            div.style.display = "block";
            var fScore = document.getElementById("finalScore");
            fScore.innerHTML = this.score;
        }
    },
    // isGameOver: function () {
    //     //判断是否已满，如果没满了就返回true，结束游戏
    //     if (this.isFull()) {
    //         for (var row = 0; row < 4; row++) {
    //             for (var col = 0; col < 4; col++) {
    //                 if (row < 3) {
    //                     if (this.data[row][col] == this.data[row + 1][col]) {
    //                         return false;
    //                     }
    //                 }
    //                 if (col < 3) {
    //                     if (this.data[row][col] == this.data[row][col + 1]) {
    //                         return false;
    //                     }
    //                 }
    //             }
    //         }
    //     }else{
    //     	return true;
		// }
    //
    // },
    isGameOver:function(){//判断游戏是否结束
        /*能继续时返回false，否则返回true*/
        if(!this.isFull()){return false;}
        /*已经满了*/	/*if(this.canLeft()||this.canRight()||this.canUp()||this.canDown()){return false;}
		else{return ture;}*/
        for(var row=0;row<4;row++){
            for(var col=0;col<4;col++){
                //if(this.data[row][col==0]){return false;}
                if(col<3){/*检查右侧相邻*/
                    if(this.data[row][col]==this.data[row][col+1]){
                        return false;
                    }
                }
                if(row<3){/*检查下方相邻*/
                    if(this.data[row][col]==this.data[row+1][col]){
                        return false;
                    }
                }
            }
        }
        return true;
    },
    //左
    canLeft : function () {
        /*遍历每个元素（最左侧列除外），只要发现任意元素左侧数==0或者当前值==左侧值return true  如果循环正常结束，  return false*/
        for(var row =0;row<4;row++){
            for(var col = 1;col<4;col++){
                if(this.data[row][col]!=0){
                    if(this.data[row][col-1]==0||this.data[row][col-1]==this.data[row][col]){
                        return true;
                    }
                }
            }
        }
        return false;
    },
    moveLeft : function () {
        if (this.canLeft()) {
            for (var row = 0; row < 4; row++) {
                for (var col = 0; col < 3; col++) {
                    var nextCol = this.getNextRight(row, col);
                    if(nextCol==-1){
                        break;
                    }else {
                        if (this.data[row][col] == 0) {
                            this.data[row][col] = this.data[row][nextCol];
                            this.data[row][nextCol] = 0;
                            col--;
                        }
                        if(this.data[row][col]==this.data[row][nextCol]){
                            this.data[row][col]*=2;
                            this.score+=this.data[row][col];
                            this.data[row][nextCol] = 0;
                        }
                    }
                }
            }
            this.state=this.PLAYING;
            animation.start();
            setTimeout(function(){
                game.state=game.RUNNING;
                game.randomNum();
                game.updateView();

            },animation.times*animation.interval);
        }
    },
    getNextRight : function (row,col) {
        for(var i=col+1;col<4;col++){
            if(this.data[row][i]!=0){
                return i;
            }
        }
        return -1;
    },
    //右
    canRight : function () {
        /*遍历每个元素（最右侧列除外），只要发现任意元素右侧数==0或者当前值==右侧值return true  如果循环正常结束，  return false*/
        for(var row =0;row<4;row++){
            for(var col = 0;col<3;col++){
                if(this.data[row][col]!=0){
                    if(this.data[row][col+1]==0||this.data[row][col+1]==this.data[row][col]){
                        return true;
                    }
                }
            }
        }
        return false;
    },
    moveRight : function () {
        if (this.canRight()) {
            for (var row = 0; row < 4; row++) {
                for (var col = 3; col >0; col--) {
                    var nextCol = this.getNextLeft(row, col);
                    if(nextCol==-1){
                        break;
                    }else {
                        if (this.data[row][col] == 0) {
                            this.data[row][col] = this.data[row][nextCol];
                            this.data[row][nextCol] = 0;
                            col++;
                        }
                        if(this.data[row][col]==this.data[row][nextCol]){
                            this.data[row][col]*=2;
                            this.score+=this.data[row][col];
                            this.data[row][nextCol] = 0;
                        }
                    }
                }
            }
            this.state=this.PLAYING;
            animation.start();
            setTimeout(function(){
                game.state=game.RUNNING;
                game.randomNum();
                game.updateView();

            },animation.times*animation.interval);
        }
    },
    getNextLeft : function (row,col) {
        for(var i=col-1;col>=0;col--){
            if(this.data[row][i]!=0){
                return i;
            }
        }
        return -1;
    },
    //上
    canUp : function () {
        /*遍历每个元素（最右侧列除外），只要发现任意元素右侧数==0或者当前值==右侧值return true  如果循环正常结束，  return false*/
        for(var row =1;row<4;row++){
            for(var col = 0;col<4;col++){
                if(this.data[row][col]!=0){
                    if(this.data[row-1][col]==0||this.data[row-1][col]==this.data[row][col]){
                        return true;
                    }
                }
            }
        }
        return false;
    },
    moveUp : function () {
        if (this.canUp()) {
            for (var col = 0; col < 4; col++) {
                for (var row = 3; row >0; row--) {
                    var nextRow = this.getNextDown(row, col);
                    if(nextRow==-1){
                        break;
                    }else {
                        if (this.data[row][col] == 0) {
                            this.data[row][col] = this.data[nextRow][col];
                            this.data[nextRow][col] = 0;
                            row--;
                        }
                        if(this.data[row][col]==this.data[nextRow][col]){
                            this.data[row][col]*=2;
                            this.score+=this.data[row][col];
                            this.data[nextRow][col] = 0;
                        }
                    }
                }
            }
            this.state=this.PLAYING;
            animation.start();
            setTimeout(function(){
                game.state=game.RUNNING;
                game.randomNum();
                game.updateView();

            },animation.times*animation.interval);
        }
    },
    getNextDown : function (row,col) {
        for(var i=row+1;col<4;col++){
            if(this.data[i][col]!=0){
                return i;
            }
        }
        return -1;
    },
    //xia
    canDown : function () {
        /*遍历每个元素（最右侧列除外），只要发现任意元素右侧数==0或者当前值==右侧值return true  如果循环正常结束，  return false*/
        for(var col =0;col<4;col++){
            for(var row = 0;row<3;row++){
                if(this.data[row][col]!=0){
                    if(this.data[row+1][col]==0||this.data[row+1][col]==this.data[row][col]){
                        return true;
                    }
                }
            }
        }
        return false;
    },
    moveDown : function () {
        if (this.canRight()) {
            for (var col = 0; col < 4; col++) {
                for (var row = 3; row >0; row--) {
                    var nextRow = this.getNextUp(row, col);
                    if(nextCol==-1){
                        break;
                    }else {
                        if (this.data[row][col] == 0) {
                            this.data[row][col] = this.data[nextRow][col];
                            this.data[nextRow][col] = 0;
                            row++;
                        }
                        if(this.data[row][col]==this.data[row][col]){
                            this.data[row][col]*=2;
                            this.score+=this.data[row][col];
                            this.data[nextRow][col] = 0;
                        }
                    }
                }
            }
            this.state=this.PLAYING;
            animation.start();
            setTimeout(function(){
                game.state=game.RUNNING;
                game.randomNum();
                game.updateView();

            },animation.times*animation.interval);
        }
    },
    getNextUp : function (row,col) {
        for(var i=row-1;row>=0;row--){
            if(this.data[i][col]!=0){
                return i;
            }
        }
        return -1;
    },
}
window.onload = function () {
    game.start();
    document.onkeydown=function(){
        /*step1：先获得事件对象！
                   所有事件发生时，都自动创建一个event对象
                 event对象中封装了事件信息，比如：鼠标的坐标，触发事件的元素，按键的编号
          step2：获得事件对象中的按键编号
                  如果是37号，就调用moveLeft
        */
        if(game.state!=game.PLAYING){
            var event=window.event||arguments[0];//||经常用于解决浏览器兼容性问题
            if(game.state==game.RUNNING){
                if(event.keyCode==37){
                    game.moveLeft();
                }else if(event.keyCode==39){
                    game.moveRight();
                }
                else if(event.keyCode==38){
                    game.moveUp();
                }
                else if(event.keyCode==40){
                    game.moveDown();
                }
            }else if(event.keyCode==13){
                game.start();
            }
        }
    }

}
// animation
function Task(obj,topStep,leftStep){
    this.obj=obj;
    this.topStep=topStep;
    this.leftStep=leftStep;
}
/*moveStep方法将当前元素对象移动一步*/
Task.prototype.moveStep=function(){
    var style=getComputedStyle(this.obj,null);
    var top=parseInt(style.top);
    var left=parseInt(style.left);
    this.obj.style.top=top+this.topStep+"px";
    this.obj.style.left=left+this.leftStep+"px";
}
/*清楚元素对象的样式，使其返回原地*/
Task.prototype.clear=function(){
    this.obj.style.left="";
    this.obj.style.top="";
}
var animation={
    times:10,//每个动画10步完成
    interval:10,//10毫秒迈一步
    timer:null,//保存定时器id的属性
    tasks:[],//保存每次需要移动的任务

    addTask:function(source,target){
        console.log(source+","+target);
        var sourceDiv=document.getElementById("c"+source);
        var targetDiv=document.getElementById("c"+target);
        var sourceStyle=getComputedStyle(sourceDiv);
        var targetStyle=getComputedStyle(targetDiv);
        var topStep=(parseInt(targetStyle.top)-parseInt(sourceStyle.top))/this.times;
        var leftStep=(parseInt(targetStyle.left)-parseInt(sourceStyle.left))/this.times;
        var task=new Task(sourceDiv,topStep,leftStep);
        this.tasks.push(task);
    },

    start:function(){
        this.timer=setInterval(function(){
            for(var i=0;i<animation.tasks.length;i++){
                animation.tasks[i].moveStep();
            }
            animation.times--;
            if(animation.times==0){
                for(var i=0;i<animation.tasks.length;i++){
                    animation.tasks[i].clear();
                }
                clearInterval(animation.timer);
                animation.timer=null;
                animation.tasks=[];
                animation.times=10;
            }
        },this.interval);
    }
}