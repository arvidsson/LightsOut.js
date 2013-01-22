(function(game) {

  var width = 800,
      height = 480,
      scalef = 1.0;
  
  var resize = function() {
    scalef = Math.min(window.innerWidth / width, window.innerHeight / height);
    window.canvas.width = Math.floor(width * scalef);
    window.canvas.height = Math.floor(height * scalef);
    document.getElementById("theCanvas").style.left = ((window.innerWidth - window.canvas.width) / 2) + 'px';
    document.getElementById("theCanvas").style.top = ((window.innerHeight - window.canvas.height) / 2) + 'px';
  };
  
  game.init = function() {
    window.canvas = document.getElementById("theCanvas");
    resize();
    window.context = canvas.getContext("2d");
    window.width = width;
    window.height = height;
    window.scalef = scalef;
    
    window.onresize = function() {
      resize();
      game.render();
    };
  };
  
  game.render = function() {
    context.save();
    context.scale(scalef, scalef);
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(0, 0, width, height);
    game.draw();
    context.restore();
  }

}(window.game = window.game || {}));
