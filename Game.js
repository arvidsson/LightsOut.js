var game = (function(game) {
  
  var resize = function() {
    game.scalef = Math.min(window.innerWidth / game.width, window.innerHeight / game.height);
    canvas.width = Math.floor(game.width * game.scalef);
    canvas.height = Math.floor(game.height * game.scalef);
    document.getElementById("theCanvas").style.left = ((window.innerWidth - canvas.width) / 2) + 'px';
    document.getElementById("theCanvas").style.top = ((window.innerHeight - canvas.height) / 2) + 'px';
  };
  
  return {
    width: 800,
    height: 480,
    scalef: 1.0,
    
    init: function() {
      window.canvas = document.getElementById("theCanvas");
      window.context = canvas.getContext("2d");
      resize();
      
      window.onresize = function() {
        resize();
        game.render();
      };
    },
    
    render: function() {
      context.save();
      context.scale(game.scalef, game.scalef);
      context.fillStyle = "rgb(0,0,0)";
      context.fillRect(0, 0, game.width, game.height);
      game.draw();
      context.restore();
    }
  };

}(window.game = window.game || {}));
