var Node = require('./node.js'),
	Injector = require('./injector.js');

var Queue = function () {
	this.first = null;
	this.size = 0;
};

Queue.prototype.enqueue = function (data, Node) {
	this.node = Node(data);
	var n;

	if (!this.first) {
		this.first = this.node;
	}
	else {
		n = this.first;
		while (n.next) {
			n = n.next;
		}
		n.next = this.node;
	}

	this.size += 1;
	return this.node;
};

Queue.prototype.dequeue = function () {
	var temp = this.first;
	this.first = this.first.next;
	this.size -= 1;
	return temp;
};
