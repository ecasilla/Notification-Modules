var Node = require('./node.js');

function LinkedList() {
	this.start = null;
	this.end = null;
	this.length = 0;
}

LinkedList.prototype.add = function (data) {
	if (data === undefined) {
		throw "data must be valid to add";
	}

	var newNode = new Node(data);

	if (this.start === null) {
		this.start = newNode;
	}
	else {
		this.end.next = newNode;
	}

	this.length++;
	this.end = newNode;
};

LinkedList.prototype.remove = function (data) {
	if (data === undefined) {
		throw "data must be valid to add";
	}
	if (this.start === null) {
		return;
	}

	var previous = null;
	var current = this.start;

	while ((current !== null) && (current.data !== data)) {
		previous = current;
		current = current.next;
	}

	if (current !== null) {
		if (previous === null) {
			this.start = this.start.next;
		}
		if (current.next === null) {
			this.end = previous;
			if (this.end !== null) {
				this.end.next = null;
			}
		}
		if ((previous !== null) && (current.next !== null)) {
			previous.next = current.next;
		}
		this.length--;
	}
};

module.exports = LinkedList;
