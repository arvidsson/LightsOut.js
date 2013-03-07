var game = (function(game) {
  
  var maxRandomLights = 15,
      hasWon = false,
      lights = [];
  
  var reset = function() {
    do {
      // turn off all lights
      for (i = 0; i < 5; i++)
        for (j = 0; j < 5; j++)
          lights[i][j] = false;
            
      // turn on random lights
      var total = Math.floor((Math.random() * maxRandomLights) + 1);
      while (total > 0) {
        var i = Math.floor(Math.random() * 5);
        var j = Math.floor(Math.random() * 5);
        if (!lights[i][j]) {
          lights[i][j] = true;
          total--;
        }
      }
    } while (!solvable());
  };
  
  var solvable = function() {
    // check quiet pattern #1
    var total = 0;
    for (i = 0; i < 5; i++)
      if (i != 2)
        for (j = 0; j < 5; j += 2)
          if (lights[i][j])
            total++;
    if (total % 2 != 0)
      return false;
        
    // check quiet pattern #2
    total = 0;
    for (i = 0; i < 5; i++)
      if (i != 2)
        for (j = 0; j < 5; j += 2)
          if (lights[j][i])
            total++;
    if (total % 2 != 0)
      return false;
      
    return true;
  };
  
  return {
    play: function() {
      game.init();
      
      canvas.addEventListener('click', function(e) {
        // translate mouse coordinates to canvas resolution before we pass them along
        var rect = canvas.getBoundingClientRect();
        var x = (e.clientX - rect.left) / game.scalef;
        var y = (e.clientY - rect.top) / game.scalef;
        game.update(x, y);
      }, false);
    
      lights = new Array(5);
      for (i = 0; i < 5; i++) {
        lights[i] = new Array(5);
        for (j = 0; j < 5; j++)
          lights[i][j] = false;
      }
      
      reset();
      game.render();
    },
    
    update: function(mouseX, mouseY) {
      // check if we have won, so we can display a congratulatory message
      if (hasWon) {
        hasWon = false;
        reset();
        return game.render();
      }
          
      // find out which light we have clicked on
      var x = -1;
      var y = -1;
      for (i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
          var mx = j * 55 + 265;
          var my = i * 55 + 105;
          if (mouseX > mx && mouseX < (mx + 50) && mouseY > my && mouseY < (my + 50)) {
            x = j;
            y = i;
          }
        }
      }
      
      // toggle lights
      if (x != -1 && y != -1) {
        lights[y][x] = !lights[y][x];
        if (x > 0)
          lights[y][x-1] = !lights[y][x-1]; // toggle left
        if (x < 4)
          lights[y][x+1] = !lights[y][x+1]; // toggle right
        if (y > 0)
          lights[y-1][x] = !lights[y-1][x]; // toggle above
        if (y < 4)
          lights[y+1][x] = !lights[y+1][x]; // toggle below
      }
          
      // check for win!
      var total = 0;
      for (i = 0; i < 5; i++)
        for (j = 0; j < 5; j++)
          if (lights[i][j])
            total++;
      if (total < 1)
        hasWon = true;
          
      game.render();
    },
      
    draw: function() {
      // draw the lights
      for (i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
          var x = j * 55 + 265;
          var y = i * 55 + 105;
          context.fillStyle = "rgb(65, 65, 65)";
          if (lights[i][j])
            context.fillStyle = "rgb(255, 255, 255)";
          context.fillRect(x, y, 50, 50);
        }
      }
        
      if (hasWon) {
        context.fillStyle = '#fff';
        context.font = 'normal bold 16px sans-serif';
        context.textBaseline = 'bottom';
        context.fillText('You win!', 367, 75);
      }
    }
  };

}(window.game = window.game || {}));
