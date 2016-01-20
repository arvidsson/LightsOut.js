(function() {
    
    function App(width, height) {
        this.width = width;
        this.height = height;
        this.scale = 1.0;
        this.canvas = document.getElementById("mainCanvas");
        this.context = this.canvas.getContext("2d");
        this.board = new Board();
    };
    
    App.prototype.init = function() {
        this.board.reset();
        
        var that = this;
        
        window.onresize = function() {
            that.resize();
            that.render();
        };
        
        this.canvas.addEventListener('click', function(e) {
            // translate mouse coordinates to canvas resolution before we pass them along
            var rect = that.canvas.getBoundingClientRect();
            var x = (e.clientX - rect.left) / that.scale;
            var y = (e.clientY - rect.top) / that.scale;
            that.board.update(that, x, y);
        }, false);
        
        this.resize();
        this.render();
    };
    
    App.prototype.resize = function() {
        this.scale = Math.min(window.innerWidth / this.width, window.innerHeight / this.height);
        this.canvas.width = Math.floor(this.width * this.scale);
        this.canvas.height = Math.floor(this.height * this.scale);
        document.getElementById("mainCanvas").style.left = ((window.innerWidth - this.canvas.width) / 2) + 'px';
        document.getElementById("mainCanvas").style.top = ((window.innerHeight - this.canvas.height) / 2) + 'px';
    };
    
    App.prototype.render = function() {
        this.context.save();
        this.context.scale(this.scale, this.scale);
        this.context.fillStyle = "rgb(0,0,0)";
        this.context.fillRect(0, 0, this.width, this.height);
        this.board.draw(this.context);
        this.context.restore();
    };
    
    window.App = App;

})();