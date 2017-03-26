class Vec {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    get len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    set len(value) {
        const fact = value / this.len;
        this.x *= fact;
        this.y *= fact;
    }
}

class Rect {
    constructor(w, h) {
        this.pos = new Vec;
        this.size = new Vec(w, h);
    }
    get left() {
        return this.pos.x - this.size.x / 2;
    }
    get right() {
        return this.pos.x + this.size.x / 2;
    }
    get top() {
        return this.pos.y - this.size.y / 2;
    }
    get bottom() {
        return this.pos.y + this.size.y / 2;
    }
}

class Ball extends Rect {
    constructor() {
        super(10, 10);
        this.vel = new Vec;
    }
}

class Player extends Rect {
    constructor () {
        super(20, 100);
        this.score = 0;
    }
}
class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');

        this._accumulator = 0;
        this.step = 1/120;

        // set up the ball
        this.ball = new Ball;

        // set up players
        this.players = [
            new Player,
            new Player
        ];
        this.players[0].pos.x = 40;
        this.players[1].pos.x = this._canvas.width - 40;
        this.players.forEach(player => player.pos.y = this._canvas.height / 2);
        // game loop
        let lastTime;
        const callback = (millis) => {
            if (lastTime) {
                this.update((millis - lastTime) / 1000);
                this.draw();
            }
            lastTime = millis;
            requestAnimationFrame(callback);
        }

        callback();

        // LED number: 1~9
        this.CHAR_PIXEL = 10;
        this.CHARS = [
        '111101101101111',
        '001001001001001',
        '111001111100111',
        '111001111001111',
        '101101111001001',
        '111100111001111',
        '111100111101111',
        '111001001001001',
        '111101111101111',
        '111101111001111',
        ].map(str => {
            const canvas = document.createElement('canvas');
            canvas.width = this.CHAR_PIXEL * 3;
            canvas.height = this.CHAR_PIXEL * 5;
            const context = canvas.getContext('2d');
            context.fillStyle = '#fff';
            str.split('').forEach((fill, i) => {
                if (fill === '1') {
                    context.fillRect(
                        (i % 3) * this.CHAR_PIXEL,
                        (i / 3 | 0) * this.CHAR_PIXEL,
                        this.CHAR_PIXEL,
                        this.CHAR_PIXEL
                    );
                }
            });
            return canvas;
        });

        this.reset();
    }
    collide (player, ball){
        if (player.left < ball.right && player.right > ball.left &&
            player.top < ball.bottom && player.bottom > ball.top) {
            
            ball.vel.x = -ball.vel.x;
            ball.vel.y = 300 * (Math.random() - .5);
            const len = ball.vel.len;
            ball.vel.len = len * 1.05;
        }
    }
    draw() {
        // draw the stage, it is black
        this._context.fillStyle = '#000';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        
        this.drawRect(this.ball);
        this.players.forEach(player => this.drawRect(player));
        this.drawScore();
    }
    drawRect(rect) {
        this._context.fillStyle = '#fff';
        this._context.fillRect(rect.left, rect.top,
            rect.size.x, rect.size.y);
    }
    drawScore() {
        const align = this._canvas.width / 3;
        // the score numer is 3 times charpixel and interval is one charpixel
        const CHAR_W = this.CHAR_PIXEL * 4;
        this.players.forEach((player, index) => {
            // for every player
            const chars = player.score.toString().split('');
            const offset = align * 
                                   (index + 1) -
                                   (CHAR_W * chars.length / 2) +
                                   this.CHAR_PIXEL / 2;
            chars.forEach((char, pos) => {
                this._context.drawImage(this.CHARS[char|0],
                                                       offset + pos * CHAR_W, 20);
            });
        });
    }
    reset () {
        this.ball.pos.x = this._canvas.width / 2;
        this.ball.pos.y = this._canvas.height / 2;

        this.ball.vel.x = 0;
        this.ball.vel.y = 0;
    }
    start () {
        if (this.ball.vel.x === 0 && this.ball.vel.y === 0) {
            this.ball.vel.x = 300 * (Math.random() > .5 ? 1 : -1);
            this.ball.vel.y = 300 * (Math.random() * 2 - 1);
            this.ball.vel.len = 200;
        }
    }
    simulate(dt) {
        this.ball.pos.x += this.ball.vel.x * dt;
        this.ball.pos.y += this.ball.vel.y * dt;

        // boundary detection
        if (this.ball.left < 0 || this.ball.right > this._canvas.width) {
            // player get the score
            const playerId = this.ball.left < 0 | 0;
            this.players[playerId].score++;
            // restart the game
            this.reset();
        }
        if (this.ball.top < 0 || this.ball.bottom > this._canvas.height) {
            this.ball.vel.y = -this.ball.vel.y;
        }
        // player 2 is AI
        this.players[1].pos.y = this.ball.pos.y;  
        this.players.forEach(player => this.collide(player, this.ball));
    }
    update(dt) {
        this._accumulator += dt;
        while(this._accumulator > this.step) {
            this.simulate(this.step);
            this._accumulator -= this.step;
        }
    }
}

// get the canvas and context
const canvas = document.getElementById('pong');
const pong = new Pong(canvas);

// controll the player 1
canvas.addEventListener('mousemove', event => {
    // when canvas is resized, build the relationship to event responce
    const scaler = event.offsetY / event.target.getBoundingClientRect().height;
    pong.players[0].pos.y = canvas.height * scaler;
});
// click to start game
canvas.addEventListener('click', () => {
    pong.start();
});