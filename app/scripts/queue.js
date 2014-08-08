var StackQueue = require("./stackQueue.js");

function Queue() {
	StackQueue.apply(this, arguments);
}

Queue.prototype = new StackQueue();

Queue.prototype.getNext = function () {
	return this.list.start.data;
};

Queue.prototype.add = Queue.prototype.push;
Queue.prototype.remove = Queue.prototype.pop;

module.exports = Queue;
