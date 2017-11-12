/**
 * Created by luodianlei on 2017/10/18.
 */
(function () {
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
      this.snake.move(this.food,this.map);
      
      //限定蛇移动的范围
      var head = this.snake.body[0]; //获取蛇头
      var headX = head.x; // 获取蛇头的坐标比例水平方向
      var headY = head.y; // 获取蛇头的坐标比例垂直方向
      var maxX = this.map.offsetWidth / this.snake.width -1; // 获取蛇头的能够渲染的最大位置(水平)
      var maxY =  this.map.offsetHeight / this.snake.height - 1; //获取蛇头能够渲染的最大位置(垂直)
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
  
      this.snake.render(this.map);
      
    }.bind(that),150)
   
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
          if(this.snake.direction === 'right') return;
          this.snake.direction = 'left';
          break;
        case 38:
          if(this.snake.direction === 'bottom') return;
          this.snake.direction = 'top';
          break;
        case 39:
          if(this.snake.direction === 'left') return;
          this.snake.direction = 'right';
          break;
        case 40:
          if(this.snake.direction === 'top') return;
          this.snake.direction = 'bottom';
          break;
      }
      
    }.bind(that);
    
  }
  
  
  window.Game = Game;
})()
