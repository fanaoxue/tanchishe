/**
 * Created by luodianlei on 2017/10/18.
 */
(function (window,undefined) {
  
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