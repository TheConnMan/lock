function Level(game, level) {
	this.game = game;
	this.level = level;
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
	this.forward = !this.forward;
	this.remaining--;
	var targetRadiusAngle = 2 * this.targetRadius / (this.game.outerRadius + this.game.innerRadius) + this.game.arcWidth;
	var modArcCenter = (10 * Math.PI + this.game.arcCenter) % (2 * Math.PI);
	if (modArcCenter >= this.targetAngle - targetRadiusAngle && modArcCenter <= this.targetAngle + targetRadiusAngle) {
		this.game.setRemaining(this.remaining);
		if (this.remaining === 0) {
			this.gameOver(true);
		} else {
			this.generateTarget();
		}
	} else {
		this.gameOver(false);
	}
};

Level.prototype.redraw = function() {
	this.game.arcCenter += this.velocity * this.intervalTime * (this.forward ? 1 : -1);
	this.render();
};

Level.prototype.render = function() {
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
	var x = r * Math.sin(this.targetAngle);
	var y = -r * Math.cos(this.targetAngle);
	this.targetRadius = (this.game.outerRadius - this.game.innerRadius) / 2 - 5;
	this.target = this.game.svg.append('circle')
		.attr('transform', 'translate(' + x + ',' + y + ')')
		.attr('r', this.targetRadius)
		.style('fill', 'yellow');
};

Level.prototype.reset = function() {
	this.target.remove();
	this.game.arcCenter = 0;
	this.render();
};

Level.prototype.gameOver = function(win) {
	clearInterval(this.interval);
	this.interval = undefined;
	this.reset();
	this.game.startLevel(this.level + (win ? 1 : 0));
};
