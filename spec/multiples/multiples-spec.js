var multiples = require("../../app/multiples/multiples");

describe("multiples", function() {
  	describe("#init", function() {

    beforeEach(function() {
    	this.grid = createFakeGrid();
    });

    it("should create the specified number of grid items", function() {
      	multiples.init(this.grid, 3);
      	expect(this.grid.getElementsByTagName("gridItem").length).toBe(4);
    });

    it("should remove the hidden class from the cloned grid items", function() {
      	multiples.init(this.grid, 3);
      	expect(this.grid.querySelectorAll(".grid__item--hidden").length).toBe(1);
      	expect(this.grid.querySelectorAll(".grid__item").length).toBe(4);
    });

    it("should set grid item number as data attribute and inner html value", function () {
      	multiples.init(this.grid, 3);
      	var gridItems = this.grid.querySelectorAll(".grid__item:not(.grid__item--hidden)");

      	for(var index = 0; index < gridItems.length; index++) {
        	var clickableBox = gridItems[index].querySelector(".clickable-box");
        	var gridItemNumber = clickableBox.getAttribute("data-number");
        	var expectedGridItemNumber = (index + 1).toString();

        	expect(gridItemNumber).toBe(expectedGridItemNumber);
        	expect(clickableBox.innerHTML).toBe(expectedGridItemNumber);
      	}
    });

    it("should highlight all multiples of clicked grid item", function() {
      	multiples.init(this.grid, 8);
      	var gridItemTwo = this.grid.querySelector("clickableBox[data-number='2']");
      	gridItemTwo.click();

      	var allHighlightedBoxes = this.grid.querySelectorAll(".clickable-box--highlight");
      	expect(allHighlightedBoxes.length).toBe(4);
      
      	for(var index=0, expectedValue=2; index < allHighlightedBoxes.length; index++, expectedValue+=2) {
        	var highlightedBoxValue = parseInt(allHighlightedBoxes[index].getAttribute("data-number"));
        	expect(highlightedBoxValue).toBe(expectedValue);
      	}
    });

    it("should remove all highlighting from numbers that are multiples of a previously highlighted number when clicked", function() {
      	multiples.init(this.grid, 8);
      	var gridItemTwo = this.grid.querySelector("clickableBox[data-number='2']");
      	gridItemTwo.click();

      	var gridItemFour = this.grid.querySelector("clickableBox[data-number='4']");
      	gridItemFour.click();

      	var allHighlightedBoxes = this.grid.querySelectorAll(".clickable-box--highlight");
      	expect(allHighlightedBoxes.length).toBe(2);
      	expect(allHighlightedBoxes[0].getAttribute("data-number")).toBe("2");
      	expect(allHighlightedBoxes[1].getAttribute("data-number")).toBe("6");
    });

    it("should remove existing hightlighting from boxes that are not multiples (when a non highlighted box is clicked)", function() {
      	multiples.init(this.grid, 8);
      	var gridItemTwo = this.grid.querySelector("clickableBox[data-number='2']");
      	gridItemTwo.click();

      	var gridItemThree = this.grid.querySelector("clickableBox[data-number='3']");
      	gridItemThree.click();

      	var allHighlightedBoxes = this.grid.querySelectorAll(".clickable-box--highlight");
      	expect(allHighlightedBoxes.length).toBe(2);

      	expect(allHighlightedBoxes[0].getAttribute("data-number")).toBe("3");
      	expect(allHighlightedBoxes[1].getAttribute("data-number")).toBe("6");
    });

    function createFakeGrid() {
      	var grid = document.createElement("grid");
      	var gridItemTemplate = document.createElement("gridItem");
      	var clickableBox = document.createElement("clickableBox");

      	gridItemTemplate.classList.add("grid__item", "grid__item--hidden");
      	clickableBox.classList.add("clickable-box");

      	gridItemTemplate.appendChild(clickableBox);
      	grid.appendChild(gridItemTemplate);

      	return grid;
    }
  });
});