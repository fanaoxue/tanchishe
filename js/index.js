/**
 * Created by luodianlei on 2017/10/19.
 */
//=================================工具对象=======================================
var Tools = {
  getRandom : function (min ,max) {
    return Math.floor(Math.random() * (max - min + 1)) +  min;
  }
}

//===================================食物=======================================
/**
 * Created by luodianlei on 2017/10/18.
 */
;(function (window,undefined) {
  
  var arr = []; //用于存储创建出来的食物
  function Food(options){
    options = options || {};
    //食物的宽和高
    this.width = options.width || 20;
    this.height = options.height || 20;
    
    //食物的背景颜色
    this.color = options.color || 'green';
    
    //食物的坐标
    this.x = options.x || 0;
    this.y = options.y || 0;
    
  }
  
  Food.prototype.render = function (map) {
    remove();
    //创建一个dom元素,用于渲染到map上面
    var div = document.createElement('div');
    arr.push(div);
    //让食物绝对定位
    div.style.position = 'absolute';
    //设置食物的宽高
    div.style.width = this.width +'px';
    div.style.height = this.height + 'px';
    
    //食物的背景颜色
    div.style.backgroundColor = this.color;
    
    //食物的坐标
    // 随机产生食物的坐标
    this.x = Tools.getRandom(0, map.offsetWidth / this.width -1) * this.width;
    this.y = Tools.getRandom(0, map.offsetHeight / this.height -1) * this.height;
    
    div.style.left = this.x + 'px';
    div.style.top = this.y + 'px';
    
    map.appendChild(div);
  }
  function remove() {
    
    for(var i = 0, leng = arr.length; i < leng; i++){
      arr[i].parentNode.removeChild(arr[i]);
      arr.splice(i,1);
    }
    
  }
  
  window.Food = Food;
})(window,undefined)

//================================蛇===============================================


;(function (window,undefined) {
  
  var arr = []; // 用于存储蛇的每一节身体
  function Snake (options){
    options = options || {};
    this.width = options.width || 20;
    this.height = options.height || 20;
    
    //记录蛇移动的方向
    this.direction = options.direction || 'right';
    
    this.body = [
      {x:3 , y:2, color:'red'},
      {x:2 , y:2, color:'blue'},
      {x:1 , y:2, color:'blue'},
    ]
    
  }
  
  Snake.prototype.render = function (map){
    remove();
    for(var i = 0; i<this.body.length;i++){
      var div = document.createElement('div');
      arr.push(div);
      div.style.position = 'absolute';
      // 蛇节的宽高
      div.style.width = this.width + 'px';
      div.style.height = this.height + 'px';
      //每一个蛇节的背景颜色
      div.style.backgroundColor = this.body[i].color;
      
      //蛇的坐标
      div.style.left = this.body[i].x * this.width + 'px'
      div.style.top = this.body[i].y * this.height + 'px';
      
      map.appendChild(div);
      
    }
    
  }
  
  Snake.prototype.move  = function (food, map) {
    
    for(var i = this.body.length - 1; i > 0;i--){
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    
    var head = this.body[0];
    switch(this.direction){
      case 'right' :
        head.x +=1;
        break;
      case 'left' :
        head.x -= 1;
        break;
      case 'top' :
        head.y -= 1;
        break;
      case 'bottom':
        head.y += 1;
        break;
    }
    
    //判断是否吃到食物
    //   蛇头的坐标 : head.x * this.width  head.y * this.width
    // 食物的坐标: food.x  food.y
    
    if(head.x * this.width === food.x && head.y * this.height === food.y){
      
      //一旦蛇头和食物的坐标重合,那么蛇的身体要变长
      var last = this.body[this.body.length -1 ];
      
      //把最后一个的信息复制到body数组中
      this.body.push({
        x : last.x,
        y : last.y,
        color : last.color
      })
      // console.log(last);
      
      // 让食物重新渲染
      food.render(map);
    }
    
    
    
  }
  
  //每一次渲染前,都需要将原来的蛇清除掉
  function remove(){
    for(var i = 0; i<arr.length;i++){
      arr[i].parentNode.removeChild(arr[i]);
    }
    arr = [];
  }
  
  
  window.Snake = Snake;
})(window, undefined)

//====================================游戏========================================

;(function (window, undefined) {
  var that;
  function Game (){
    this.food = new Food();
    this.snake = new Snake();
    //将游戏对象赋值给全局
    that = this;
  }
  
  
  Game.prototype.start = function (map) {
    this.food.render(map); //游戏开始时渲染食物
    this.snake.render(map); //游戏开始时渲染蛇
    this.map = map;
    autoMove(); //游戏开始时,蛇自动移动的函数
    
    bindKeyCode(); // 监听键盘事件,让蛇可以上下左右移动
  }
  
  //让蛇自动移动的函数
  function autoMove(){
    var id = setInterval(function() {
      //让蛇移动的方法
      that.snake.move(that.food,that.map);
      
      //限定蛇移动的范围
      var head = that.snake.body[0]; //获取蛇头
      var headX = head.x; // 获取蛇头的坐标比例水平方向
      var headY = head.y; // 获取蛇头的坐标比例垂直方向
      var maxX = that.map.offsetWidth / that.snake.width -1; // 获取蛇头的能够渲染的最大位置(水平)
      var maxY =  that.map.offsetHeight / that.snake.height - 1; //获取蛇头能够渲染的最大位置(垂直)
      //判断蛇头是否到达左/上边界
      if(headX < 0 || headY < 0){
        clearInterval(id);
        alert('game over');
        return; // 如果对象中数据计算已经到大目标位置,则不再进行渲染,解决蛇头移出地图的问题
      }
      //判断蛇头是否到达右/下边界
      if(headX > maxX || headY > maxY){
        clearInterval(id);
        alert('game over');
        return;
      }
      
      that.snake.render(that.map);
      
    },150)
    
  }
  
  
  function  bindKeyCode() {
    document.onkeydown = function (e) {
      
      console.log(e.keyCode);
      //   左 37
      //   上 38
      //    右 39
      //   下 40
      switch(e.keyCode){
        // 通过判断方向键,改变蛇对象的direction属性 ,再次渲染时,move的代码中会通过判断重新计算蛇的坐标
        case 37:
          if(that.snake.direction === 'right') return;
          that.snake.direction = 'left';
          break;
        case 38:
          if(that.snake.direction === 'bottom') return;
          that.snake.direction = 'top';
          break;
        case 39:
          if(that.snake.direction === 'left') return;
          that.snake.direction = 'right';
          break;
        case 40:
          if(that.snake.direction === 'top') return;
          that.snake.direction = 'bottom';
          break;
        
        
      }
      
      
      
    }
    
  }
  
  
  window.Game = Game;
})(window, undefined)

//===================================入口===================================
;(function (){
  var map  = document.getElementById('map');
  new Game().start(map);
})()
