/**
 * Created by luodianlei on 2017/10/18.
 */

(function () {
  
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
})()
