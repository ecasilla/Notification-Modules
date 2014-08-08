/*jshint -W079 */
var Queue = require('../../app/scripts/queue.js'),
    expect = require('chai').expect;

describe('When adding an element onto a Queue', function () {
	var myQueue;
	var firstValue = 1;

	beforeEach(function() {
		myQueue = new Queue();
		myQueue.add(firstValue);
	});

	afterEach(function() {
		myQueue = null;
	});

	it('the Queues` length should be 1', function () {
		expect(myQueue.length).to.eql(1);
	});

	it('peek should show the item', function() {
		expect(myQueue.peek()).to.eql(firstValue);
	});

});

describe('When the Queue contains one element and your remove it', function () {
	var myQueue;
	var testValue = 1;

	beforeEach(function() {
		myQueue = new Queue();
		myQueue.add(testValue);
		myQueue.remove(testValue);

	});

	afterEach(function() {
		myQueue = null;
	});

	it('the Queue`s length should be zero', function () {
		expect(myQueue.length).to.eql(0);
	});

	it('peek should be null', function() {
		expect(myQueue.peek()).to.eql(null);
	});
});

describe('When adding two elements to a Queue', function () {
	var myQueue;
	var testValue1 = "test_string1";
	var testValue2 = "test_string2";

	beforeEach(function() {
		myQueue = new Queue();
		myQueue.add(testValue1);
		myQueue.add(testValue2);

	});

	afterEach(function() {
		myQueue = null;
	});

	it('the Queue`s length should be 2', function () {
		expect(myQueue.length).to.eql(2);
	});

});

describe('When adding two elements to a Queue and then removing an element', function () {
	var myQueue;
	var testValue1 = "test_string1";
	var testValue2 = "test_string2";

	beforeEach(function() {
		myQueue = new Queue();
		myQueue.add(testValue1);
		myQueue.add(testValue2);
	});

	afterEach(function() {
		myQueue = null;
	});

	it('the Queue`s length should be 1', function () {
		var result = myQueue.remove();
		expect(myQueue.length).to.eql(1);
	});

	it('the element removed should be the first element added.', function () {
		var result = myQueue.remove();
		expect(result).to.eql(testValue1);
	});

});

describe('When adding two elements to a Queue and then removing 2 elements', function () {
	var myQueue;
	var testValue1 = "test_string1";
	var testValue2 = "test_string2";

	beforeEach(function() {
		myQueue = new Queue();
		myQueue.add(testValue1);
		myQueue.add(testValue2);
	});

	afterEach(function() {
		myQueue = null;
	});

	it('the Queue`s length should be 0', function () {
		myQueue.remove();
		myQueue.remove();
		expect(myQueue.length).to.eql(0);
	});

	it('the elements removed should be in the order to which they were added.', function () {
		var result1 = myQueue.remove();
		var result2 = myQueue.remove();
		expect(result1).to.eql(testValue1);
		expect(result2).to.eql(testValue2);
	});

});
