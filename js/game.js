function Game(width, height) {
	this.width = width;
	this.height = height;

	this.svg = d3.select('#game')
		.append('svg')
		.attr('width', width)
		.attr('height', height)
		.append('g')
		.attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');

	var arc = d3.svg.arc()
		.innerRadius(180)
		.outerRadius(240)
		.startAngle(0);

	this.svg.append('path')
		.datum({endAngle: 2 * Math.PI})
		.style('fill', '#444')
		.attr('d', arc);

	this.arc = this.svg.append('path')
		.datum({endAngle: Math.PI / 64})
		.style('fill', '#6495ED')
		.attr('d', arc.startAngle(-Math.PI / 64));
}
