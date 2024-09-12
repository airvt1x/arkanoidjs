var game = {
    running: true,
    width: window.innerWidth,
    height: window.innerHeight,
    score: 0,
    sprites: { ball: undefined },
    ball: {},
    init: function() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.ctx = document.getElementById("mycanvas").getContext("2d");
        this.ctx.canvas.width = this.width;
        this.ctx.canvas.height = this.height;
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = '#FFFFFF';
    },
    preload: function() {
        // Load the ball image
        this.sprites.ball = new Image();
        this.sprites.ball.src = 'images/windows.png'; // Update this path to your new ball image

        // Check if the image loads successfully
        this.sprites.ball.onload = () => {
            console.log("Image loaded successfully.");
            this.start();
        };
    },
    create: function() {
    },
    update: function() {
        if (this.ball.dx || this.ball.dy) {
            this.ball.move();
        }
        this.ball.checkBounds();
    },
    render: function() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.width, this.height); 
        if (this.sprites.ball.complete) {
            this.ctx.drawImage(
                this.sprites.ball,
                0,
                0,
                this.ball.width,
                this.ball.height,
                this.ball.x,
                this.ball.y,
                this.ball.width,
                this.ball.height
            );
        }
    },
    run: function() {
        this.update();
        this.render();

        if (this.running) {
            window.requestAnimationFrame(() => {
                game.run();
            });
        }
    },
    start: function() {
        this.init();
        this.create();
        this.ball.jump();
        this.run();
    }
};

game.ball = {
    x: 340,
    y: 278,
    velocity: 3,
    dx: 0,
    dy: 0,
    width: 250,
    height: 250,
    move: function() {
        this.x += this.dx;
        this.y += this.dy;
    },
    jump: function() {
        this.dy = this.dx = -this.velocity;
    },
    checkBounds: function() {
        var x = this.x + this.dx;
        var y = this.y + this.dy;

        if (x < 0) {
            this.x = 0;
            this.dx = this.velocity;
        } else if (x + this.width > game.width) {
            this.x = game.width - this.width;
            this.dx = -this.velocity;
        } else if (y < 0) {
            this.y = 0;
            this.dy = this.velocity;
        } else if (this.y + this.height >= game.height) {
            this.y = game.height - this.height; 
            this.dy *= -1;
        }
    }
};

window.addEventListener("load", function() {
    game.preload(); 
});

// Handle window resize
window.addEventListener('resize', function() {
    game.width = window.innerWidth;
    game.height = window.innerHeight;
    game.ctx.canvas.width = game.width;
    game.ctx.canvas.height = game.height;
});
