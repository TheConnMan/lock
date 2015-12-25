function Level(game, level) {
	this.game = game;
	this.remaining = level;
	this.interval = undefined;
	this.period = 4;
	this.intervalTime = 10;
	this.velocity = 2 * Math.PI / (1000 * this.period);
	this.forward = true;

	this.game.setRemaining(level);

	var me = this;
	this.game.board.on('click', function() {
		if (me.interval) {
			me.clicked();
		} else {
			me.start();
		}
	});
}

Level.prototype.start = function() {
	this.generateTarget();
	var me = this;
	this.interval = setInterval(function() {
		me.redraw();
	}, this.intervalTime);
};

Level.prototype.clicked = function() {
	this.generateTarget();
	this.forward = !this.forward;
	this.remaining--;
	this.game.setRemaining(this.remaining);
	if (this.remaining === 0) {
		clearInterval(this.interval);
		this.interval = undefined;
	}
};

Level.prototype.redraw = function() {
	this.game.arcCenter += this.velocity * this.intervalTime * (this.forward ? 1 : -1);
	this.game.arc.startAngle(this.game.arcCenter - this.game.arcWidth);
	this.game.arcEl
		.datum({endAngle: this.game.arcCenter + this.game.arcWidth})
		.attr('d', this.game.arc);
};

Level.prototype.generateTarget = function() {
	if (this.target) {
		this.target.remove();
	}
	this.targetAngle = 2 * Math.PI * Math.random();
	var r = (this.game.outerRadius + this.game.innerRadius) / 2;
	var x = r * Math.cos(this.targetAngle);
	var y = r * Math.sin(this.targetAngle);
	this.target = this.game.svg.append('circle')
		.attr('transform', 'translate(' + x + ',' + y + ')')
		.attr('r', (this.game.outerRadius - this.game.innerRadius) / 2 - 5)
		.style('fill', 'yellow');
};
