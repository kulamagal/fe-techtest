var multiples = require('./multiples/multiples.js');

// source goes here
var app = {

	// this is the entry point for your app.
	init: function() {
		console.log("hello from app!");
		
		var grid = document.getElementById('grid'),
			numberOfGridItems = 144;

		multiples.init(grid, numberOfGridItems);
	},
};

module.exports = app;
