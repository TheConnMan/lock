function Game(width, height) {
	this.width = width;
	this.height = height;
	this.arcWidth = Math.PI / 64;
	this.arcCenter = 0;
	this.innerRadius = 200;
	this.outerRadius = 240;

	this.board = d3.select('#game')
		.append('svg')
		.attr('width', width)
		.attr('height', height);

	this.svg = this.board
		.append('g')
		.attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');

	this.arc = d3.svg.arc()
		.innerRadius(this.innerRadius)
		.outerRadius(this.outerRadius)
		.startAngle(0);

	this.svg.append('path')
		.datum({endAngle: 2 * Math.PI})
		.style('fill', '#444')
		.attr('d', this.arc);

	this.arcEl = this.svg.append('path')
		.datum({endAngle: this.arcWidth})
		.style('fill', '#6495ED')
		.attr('d', this.arc.startAngle(-this.arcWidth));

	this.levelEl = this.svg.append('text')
		.attr('text-anchor', 'middle')
		.style('font-size', 100)
		.style('fill', '#555')
		.attr('transform', 'translate(0,30)')
		.text(0);
}

Game.prototype.startLevel = function(level) {
	this.level = new Level(this, level);
};

Game.prototype.setRemaining = function(remaining) {
	this.levelEl.text(remaining);
};
