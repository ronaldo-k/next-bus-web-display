// Queue of next arrival times.

class nextArrivalsQueue {
	#destination;	// String
	#queue;			// Implemented currently as an array.
	static MAX_QUEUE_SIZE = 5;

	constructor(destination) {
		this.#destination = destination;
		this.#queue = [0, 1, 2];
	}

	get destination() {
		return this.#destination;
	}

	get queue() {
		return this.#queue;
	}

	get nextArrivalTime() {
		return this.#queue[0];
	}

	get departureTimesString() {
		result = "";
		for (let i = 0; i < this.#queue.length; i++) {
			result += this.#queue[i];
			if (i < MAX_QUEUE_SIZE - 1) {
				result += ", ";
			} else {
				result += " min";
			}
		}
		return result;
	}

	update(stopNumber) {
		fetch("testData.json")
			.then((response) => response.json)
			.then((data) => {
				// Do something
			});
	}	
}

// Represents a next time display.
class nextArrivalsDisplay {
	#stopNumber = -1;			// int
	#routeNumber = -1;			// String
	#destinations = [];			// Array of Strings
	#nextArrivalsQueues = [];	// Array of nextArrivalsQueues
	#node;						// Parent node to the display's HTML elements

	constructor(stopNumber, routeNumber, destinations) {
		this.#stopNumber = stopNumber;
		this.#routeNumber = routeNumber;
		this.#destinations = destinations;
		this.setupNextArrivalsQueues();

		this.#node = document.createElement("div");
		this.#node.setAttribute("class", "next-arrivals-display");
	}

	setupNextArrivalsQueues() {
		for (let i = 0; i < this.#destinations.length; i++) {
			let queue = new nextArrivalsQueue(this.#destinations[i]);
			this.#nextArrivalsQueues.push(queue);
		}
	}

	get routeNumber() {
		return this.#routeNumber;
	}

	get destinations() {
		return this.#destinations;
	}

	get stopNumber() {
		return this.#stopNumber;
	}

	getDestination(name) {
		return this.#destinations.find(name);
	}

	getNextArrivalsString(destination) {
		let destinationIndex = this.#destinations.findIndex(destination);
		return this.#nextArrivalsQueues[destinationIndex].departureTimesString;
	}

	update(stopNumber) {
		this.#nextArrivalsQueues.forEach(queue => {
			queue.update(stopNumber);
		});
	}
}

let display;

function nextArrivalsDisplayActivate() {
	let stopNumber = document.getElementById("stop-number-input").value;
	alert(stopNumber);
	let routeNumber = document.getElementById("route-number-input").value;
	let destinations = ["destination 1, destination 2"];
	display = new nextArrivalsDisplay(stopNumber, routeNumber, destinations);
	document.location.href = "display.html";
}