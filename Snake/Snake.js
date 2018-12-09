window.onload=function () {
//--存放食物的数组
    var elements=[];
//--食物构造函数
    function Food() {
        this.x=0;
        this.y=0;
        this.width=20;
        this.height=20;
        this.color="green";
    }
//创建食物
    Food.prototype.init=function (m) {
        remove(elements);
        var div=document.createElement("div");
        m.appendChild(div);
        div.style.position="absolute";
        div.style.width=this.width+"px";
        div.style.height=this.height+"px";
        div.style.backgroundColor=this.color;

        this.x=parseInt(Math.random()*m.offsetWidth/this.width)*this.width;
        this.y=parseInt(Math.random()*m.offsetWidth/this.height)*this.height;

        div.style.left=this.x+"px";
        div.style.top=this.y+"px";


        elements.push(div);
    }
//移除元素
    function remove(elements) {
        for (var i=elements.length-1;i>=0;i--){
            var element=elements[i];
            element.parentNode.removeChild(element);
            elements.splice(i,1);
        }
    }
//存放蛇的每个身体格的数组
    var snake=[];
    //蛇的构造函数
    function Snake(direction) {
        this.width=20;
        this.height=20;
        this.body=[
            {x:3,y:2,color:"red"},
            {x:2,y:2,color:"orange"},
            {x:1,y:2,color:"orange"},
        ];
        this.direction=direction||"right";
    }
//创建蛇
    Snake.prototype.init=function (m) {
        remove(snake);
        for (var i=0;i<this.body.length;i++){
            var div=document.createElement("div");
            m.appendChild(div);
            div.style.position="absolute";
            div.style.width=this.width+"px";
            div.style.height=this.height+"px";
            div.style.backgroundColor=this.body[i].color;
            div.style.left=this.body[i].x*this.width+"px";
            div.style.top=this.body[i].y*this.height+"px";

            snake.push(div);
        }
    }
    //移动蛇
    Snake.prototype.move=function (food,m) {

        for (var i=this.body.length-1;i>0;i--){
            this.body[i].x=this.body[i-1].x;
            this.body[i].y=this.body[i-1].y;
        }

        switch (this.direction) {
            case "right":
                this.body[0].x+=1;
                break;
            case "left":
                this.body[0].x-=1;
                break;
            case "top":
                this.body[0].y-=1;
                break;
            case "bottom":
                this.body[0].y+=1;
                break;
        }

        if(this.body[0].x*this.width==food.x&&this.body[0].y*this.height==food.y){
            var last=this.body[this.body.length-1];
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            })
            food.init(m);
        }
    }




    function runSnake() {
        var map=document.querySelector(".map");
        var fd=new Food();
        fd.init(map);

        var sk=new Snake();
        var timer=setInterval(function () {
            sk.init(map);
            sk.move(fd,map);
            if(sk.body[0].x>=map.offsetWidth/sk.width){
                sk.body[0].x=0;
            }
            if(sk.body[0].x<0){
                sk.body[0].x=map.offsetWidth/sk.width-1;
            }
            if(sk.body[0].y>=map.offsetHeight/sk.height){
                sk.body[0].y=0;
            }
            if(sk.body[0].y<0){
                sk.body[0].y=map.offsetHeight/sk.height-1;
            }
        },100);

        document.addEventListener("keydown",function(e){
            switch (e.keyCode) {
                case 37:
                    sk.direction="left";
                    break;
                case 38:sk.direction="top";break;
                case 39:sk.direction="right";break;
                case 40:sk.direction="bottom";break;
             }
        });
    }

runSnake();


}