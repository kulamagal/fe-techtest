var multiples = {
	gridItem: ".grid__item",
	clickableBox: ".clickable-box",
	gridItemElementHiddenClass: "grid__item--hidden",
	dataNumberAttribute: "data-number",
	clickableBoxHighlightClass: "clickable-box--highlight",

	init: function(grid, numberOfGridItems) {
		this.grid = grid;
		this.numberOfGridItems = numberOfGridItems;
		this.gridItemTemplate = grid.querySelector(multiples.gridItem);

		this.makeNumberGrid();
	},

	/*
	* Function that makes number grid
	*/
	makeNumberGrid: function() {
		for(var i = 0; i < this.numberOfGridItems; i++) {
			this.createAndAddNewGridItemElement(this.grid, this.gridItemTemplate, i);
		}
	},

	/*
	* Function that creates and adds new grid item element by cloning the grid item template.
	*/
	createAndAddNewGridItemElement: function(grid, gridItemTemplate, index) {
		var gridItemElement = gridItemTemplate.cloneNode(true),
			clickableBox = gridItemElement.querySelector(multiples.clickableBox),
			gridItemValue = index + 1;

		gridItemElement.classList.remove(multiples.gridItemElementHiddenClass);
		grid.appendChild(gridItemElement);

		clickableBox.setAttribute(multiples.dataNumberAttribute, gridItemValue);
		clickableBox.innerHTML = gridItemValue;

		clickableBox.addEventListener("click", this.gridItemClicked);
	},

	/*
	* Function that handles click events and performs multiple hightlighting.
	*/
	gridItemClicked: function(event) {
		event.preventDefault();

		var allBoxes = multiples.grid.querySelectorAll("[" + multiples.dataNumberAttribute + "]"),
			clickedBoxValue = parseInt(event.target.getAttribute(multiples.dataNumberAttribute)), 
			isClickedBoxHighlighted = event.target.classList.contains(multiples.clickableBoxHighlightClass);

		for(var i = 0; i < allBoxes.length; i++) {
			var box = allBoxes[i],
				boxValue = parseInt(box.getAttribute(multiples.dataNumberAttribute)), 
				isMultiple = boxValue % clickedBoxValue === 0;

			if(isClickedBoxHighlighted) {
				if(isMultiple) {
					box.classList.remove(multiples.clickableBoxHighlightClass);
				}
			} else {
				box.classList.toggle(multiples.clickableBoxHighlightClass, isMultiple);
			}
		}
	}
};

module.exports = multiples;
