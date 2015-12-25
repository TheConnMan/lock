function Level(game, level) {
	this.game = game;
	this.level = level;
	this.interval = undefined;
	this.period = 4;
	this.intervalTime = 10;
	this.velocity = 2 * Math.PI / (1000 * this.period);

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
	var me = this;
	this.interval = setInterval(function() {
		me.redraw();
	}, this.intervalTime);
};

Level.prototype.clicked = function() {
	console.log('Clicked');
};

Level.prototype.redraw = function() {
	this.game.arcCenter += this.velocity * this.intervalTime;
	this.game.arc.startAngle(this.game.arcCenter - this.game.arcWidth);
	this.game.arcEl
		.datum({endAngle: this.game.arcCenter + this.game.arcWidth})
		.attr('d', this.game.arc);
};
