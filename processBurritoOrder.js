var burritos = [];

function init() {

    var addBurritoButton = document.getElementById("btnAdd"); 
    
	if(window.addEventListener) { 
		addBurritoButton.addEventListener("click", generateReceipt, false); 
	} else {
		addBurritoButton.attachEvent("onclick", generateReceipt);
	}
	
}

// Process burrito order and output receipt
function generateReceipt() {
	createNewBurrito();
	updateReceipt();
}

function updateReceipt() {
	
	orderSummary = document.getElementById("orderGroup");
	
	if(orderSummary) {
		orderSummary.parentNode.removeChild(orderSummary);
	}
	
	if (burritos.length > 0) {
		addDivTag();
		addHeading();
		var totalCost = 0
		// Add burrito's to the receipt
		for(var index = 0; index < burritos.length; index++) {
			labelText = burritos[index].toString();
			addLabel("Burrito #" + (Number(index) + 1) + ": " + labelText + " ", index);
			addDeleteButton(index);
			totalCost += Number(burritos[index].cost);
		}
	
		addLabel("Total Cost: $" + totalCost.toFixed(2), "total");
	}
}


// MARK:  Burrito Functions ++++++++++++++++++++++++++
function createNewBurrito() {
	var type = document.getElementById("type");
	var burritoType = type.options[type.selectedIndex].value;
	var rice = document.getElementById("rice").value;
	var beans = document.getElementById("bean").value;
	
	var cost = getBurritoCost();
	
	var guacamole = document.getElementById("guacamole");
	var pico = document.getElementById("pico");
	var corn = document.getElementById("corn");
	var greenTomatillo = document.getElementById("greenTomatillo");
	var redTomatillo = document.getElementById("redTomatillo");
	
	var addOns = [];
	
	if (pico.checked) addOns.push("Pico De Gallo");
	if (corn.checked) addOns.push("Roasted Corn");
	if (greenTomatillo.checked) addOns.push("Green Tomatillo");
	if (redTomatillo.checked) addOns.push("Red Tomatillo");
	if (guacamole.checked) addOns.push("Guacamole");
	

	// Create new burrito object
	var burrito = new Burrito(burritoType, rice, beans, addOns, cost);
	
	// Add new burrito to array of burritos
	burritos.push(burrito);
}

function Burrito(type, rice, beans, addOns, cost) {
	this.type = type;
	this.rice = rice;
	this.beans = beans;
	this.addOns = addOns;
	this.cost = cost;

}

Burrito.prototype.toString = function() {
	return this.type + "," + this.rice + "," + this.beans + "," + this.addOns + "  Cost: $" + this.cost;
}


function getBurritoCost() {
	var burritoType = document.getElementById("type");
	var type = burritoType.options[burritoType.selectedIndex].value;
	var guacamole = document.getElementById("guacamole");
	var cost = 0;
	
	if (type == "Chicken" || type == "Vegetarian") {
		cost += 6.20;
	} else if (type == "Carnitas" || type == "Barbacoa") {
		cost += 6.60;
	} else {
		cost += 6.75;
	}
	
	if (guacamole.checked) cost += 1.40;
	
	return cost.toFixed(2);
}


function deleteBurrito() {
	var itemToRemove;
	
	if(window.event) {
		itemToRemove = window.event.srcElement.value;
	} else {
		itemToRemove = this.value;
	}
	
	burritos.splice(itemToRemove, 1);
	updateReceipt();
}

// MARK: - DHTML Functions ++++++++++++++++++++++++++++++++++++++++
function addDivTag() {
	var summary = document.createElement("div");
	summary.id = "orderGroup";
	document.body.appendChild(summary);
}

function addHeading() {
	var heading = document.createElement("h3");
	var headingText = document.createTextNode("Your Order:");
	heading.appendChild(headingText);
	divTag = document.getElementById("orderGroup")
	divTag.appendChild(heading);
}

function addLabel(text, id) {
	divTag = document.getElementById("orderGroup"); 
	var space = document.createElement("br");
	var label = document.createElement("label");
	label.id = id + "Label";
	label.className = "summary";

	var text = document.createTextNode(text);
	label.appendChild(text);
	divTag.appendChild(space);
	divTag.appendChild(label);
}

function addDeleteButton(id) {
	deleteButton = document.createElement("button");
	deleteButton.type = "button";
	deleteButton.className = "btn btn-danger btn-xs";
	deleteButton.id = "btnDelete" + id;
	deleteButton.value = id;
	
	buttonText = document.createTextNode("Delete");
	deleteButton.appendChild(buttonText);
	
	label = document.getElementById(id + "Label");
	label.appendChild(deleteButton);
	
	var deleteBurritoButton = document.getElementById("btnDelete" + id);
	
	if(window.addEventListener) { 
		deleteBurritoButton.addEventListener("click", deleteBurrito, false); 
	} else {
		deleteBurritoButton.attachEvent("onclick", deleteBurrito);
	}
}








