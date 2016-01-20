(function() {
    
    var MAX_RANDOM_LIGHTS = 15;
    
    function Board() {
        this.win = false;
        this.lights = new Array(5);
        
        for (i = 0; i < 5; i++) {
            this.lights[i] = new Array(5);
            for (j = 0; j < 5; j++)
                this.lights[i][j] = false;
        }
    };
    
    Board.prototype.reset = function() {
        do {
            // turn off all lights
            for (i = 0; i < 5; i++)
                for (j = 0; j < 5; j++)
                    this.lights[i][j] = false;

            // turn on random lights
            var total = Math.floor((Math.random() * MAX_RANDOM_LIGHTS) + 1);
            while (total > 0) {
                var i = Math.floor(Math.random() * 5);
                var j = Math.floor(Math.random() * 5);
                if (!this.lights[i][j]) {
                    this.lights[i][j] = true;
                    total--;
                }
            }
        } while (!this.isSolvable());
    };
    
    Board.prototype.isSolvable = function() {
        // check quiet pattern #1
        var total = 0;
        for (i = 0; i < 5; i++)
            if (i != 2)
                for (j = 0; j < 5; j += 2)
                    if (this.lights[i][j])
                        total++;
        if (total % 2 != 0)
            return false;

        // check quiet pattern #2
        total = 0;
        for (i = 0; i < 5; i++)
            if (i != 2)
                for (j = 0; j < 5; j += 2)
                    if (this.lights[j][i])
                        total++;
        if (total % 2 != 0)
            return false;

        return true;
    };
    
    Board.prototype.update = function(app, mouseX, mouseY) {
        // check if we have won, so we can display a congratulatory message
        if (this.win) {
            this.win = false;
            this.reset();
            return app.render();
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
            this.lights[y][x] = !this.lights[y][x];
            if (x > 0)
                this.lights[y][x-1] = !this.lights[y][x-1]; // toggle left
            if (x < 4)
                this.lights[y][x+1] = !this.lights[y][x+1]; // toggle right
            if (y > 0)
                this.lights[y-1][x] = !this.lights[y-1][x]; // toggle above
            if (y < 4)
                this.lights[y+1][x] = !this.lights[y+1][x]; // toggle below
        }

        // check for win!
        var total = 0;
        for (i = 0; i < 5; i++)
            for (j = 0; j < 5; j++)
                if (this.lights[i][j])
                    total++;
        if (total < 1)
            this.win = true;
        
        app.render();
    };
    
    Board.prototype.draw = function(context) {
        // draw the lights
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 5; j++) {
                var x = j * 55 + 265;
                var y = i * 55 + 105;
                context.fillStyle = "rgb(65, 65, 65)";
                if (this.lights[i][j])
                    context.fillStyle = "rgb(255, 255, 255)";
                context.fillRect(x, y, 50, 50);
                // TODO: setup constants or something
            }
        }
        
        // draw win message
        if (this.win) {
            context.fillStyle = '#fff';
            context.font = 'normal bold 16px sans-serif';
            context.textBaseline = 'bottom';
            context.fillText('You win!', 367, 75);
        }
    };
    
    window.Board = Board;
    
})();
