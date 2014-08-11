var LinkedList = require("./linkedList.js");

function StackQueue() {
	this.list = new LinkedList();
	this.length = 0;
}

StackQueue.prototype.push = function (data) {
	this.list.add(data);
	this.length++;
};

StackQueue.prototype.getNext = function () {
	return this.list.end.data;
};

StackQueue.prototype.pop = function () {
	if (this.isEmpty()) {
		throw "The stack/queue is empty";
	}

	var results = this.peek();

	this.list.remove(results);
	this.length--;
	return results;
};

StackQueue.prototype.isEmpty = function () {
	return this.length === 0;
};

StackQueue.prototype.clear = function () {
	this.list = new LinkedList();
	this.length = 0;
};

StackQueue.prototype.peek = function () {
	return this.isEmpty() ? null : this.getNext();
};

module.exports = StackQueue;
