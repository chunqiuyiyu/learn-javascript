//create a game world
  var game = new Phaser.Game(640,960,Phaser.AUTO);
  var boot = new Phaser.State();
  var draw = new Phaser.State();

  var filePath;
  var currentObj;
  var keyArray = new Array();
  var generator = new Phaser.RandomDataGenerator();
  var pathArray = new Array();
  var key;

  boot.init = function(){
      game.scale.pageAlignVertically = true;
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

      var holder = document.getElementsByTagName('canvas')[0];
      holder.ondragover = function () {
        return false;
      };
      holder.ondragleave = holder.ondragend = function () {
        return false;
      };
      holder.ondrop = function (e) {
          //if the sprite in canvas is more than ten,just return
          if($('.obj .obj-item').length==10){
            alert('无法处理更多的精灵图片！');
            return;
          }

          var file = e.dataTransfer.files[0];

          filePath = file.path;
          //get sprite name
          var array = filePath.split('\\');
          var tmp = array[array.length-1];
          var name = tmp.slice(0,tmp.length-4);

          //ensure the sprite key is unique
          key = generator.uuid();
          game.load.image(key,filePath);

          $('.obj').append('<li class="obj-item" data-key="'+key+'">'+name+'</li>');
          $('.obj .obj-item').removeClass('active');
          $('.obj .obj-item').last().addClass('active');

          game.state.start('Draw',false);


          const ipcRenderer = require('electron').ipcRenderer;
          ipcRenderer.send('auto-focus'); 
          return false;
      }
  }


  draw.preload = function(){
          game.load.image(key,filePath);
  }

draw.create = function(){
           var obj = game.add.sprite(320,480,key);
             //show sprite initial info
            $('.x').text(obj.position.x);
            $('.y').text(obj.position.y);
            $('.angle').text(obj.angle);

            obj.inputEnabled = true;

            obj.input.enableDrag(false);
            obj.anchor.setTo(0.5,0.5);
            obj.events.onDragUpdate.add(function(){
                $('.x').text(obj.position.x);
                $('.y').text(obj.position.y);
                $('.angle').text(obj.angle);
            }) ;

            currentObj = obj;

            obj.events.onInputDown.add(function(obj){
              currentObj = obj;
              console.log(obj);
              //show underline style in selected sprite
              $('.obj .obj-item').removeClass('active');
               $('[data-key="'+currentObj.key+'"]').addClass('active');
            })

    game.input.mouse.mouseWheelCallback = mouseWheel;
};


  game.state.add("Boot",boot);
  game.state.add("Draw",draw);
  game.state.start("Boot");

//use mousewheel to control rotation
function mouseWheel() {
  if(currentObj){
      if(game.input.mouse.wheelDelta>0){
          currentObj.rotation += Math.PI/90;
      }else{
          currentObj.rotation -= Math.PI/90;
      }
      $('.angle').text(currentObj.angle);
  }else{
      return;
  }
}
//clear the canvas
$('.clr').click(function(){
    var bool = window.confirm("此操作将会清空画布，你确定吗?");
    if(bool){
      game.world.removeChildren();
      currentObj==null
      $('.x').text('');
      $('.y').text('');
      $('.angle').text('');
      $('.obj .obj-item').remove();
    }else{
      return;
    }
})

//just prevent window to show img in new tap
document.addEventListener('dragover',function(event){
            event.preventDefault();
            return false;
          },false);
          
document.addEventListener('drop',function(event){
          event.preventDefault();
          return false;
},false);