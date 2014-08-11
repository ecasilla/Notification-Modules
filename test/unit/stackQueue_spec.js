/*jshint -W079 */
var StackQueue = require('../../app/scripts/stackQueue.js'),
    expect = require('chai').expect;

describe('When pushing an element onto a stack', function () {
	var myStack;
	var firstValue = 1;

	beforeEach(function() {
		myStack = new StackQueue();
		myStack.push(firstValue);

	});

	afterEach(function() {
		myStack = null;
	});

	it('the stacks` length should be 1', function () {
		expect(myStack.length).to.eql(1);
	});

	it('peek should show the item', function() {
		expect(myStack.peek()).to.eql(firstValue);
	});

});

describe('When the stack contains one element and your remove it', function () {
	var myStack;
	var testValue = 1;

	beforeEach(function() {
		myStack = new StackQueue();
		myStack.push(testValue);
		myStack.pop(testValue);

	});

	afterEach(function() {
		myStack = null;
	});

	it('the stack`s length should be zero', function () {
		expect(myStack.length).to.eql(0);
	});

	it('peek should be null', function() {
		expect(myStack.peek()).to.eql(null);
	});
});

describe('When pushing two elements to a stack', function () {
	var myStack;
	var testValue1 = "test_string1";
	var testValue2 = "test_string2";

	beforeEach(function() {
		myStack = new StackQueue();
		myStack.push(testValue1);
		myStack.push(testValue2);

	});

	afterEach(function() {
		myStack = null;
	});

	it('the stack`s length should be 2', function () {
		expect(myStack.length).to.eql(2);
	});

});

describe('When pushing two elements to a stack and then popping an element', function () {
	var myStack;
	var testValue1 = "test_string1";
	var testValue2 = "test_string2";

	beforeEach(function() {
		myStack = new StackQueue();
		myStack.push(testValue1);
		myStack.push(testValue2);
	});

	afterEach(function() {
		myStack = null;
	});

	it('the stack`s length should be 1', function () {
		var result = myStack.pop();
		expect(myStack.length).to.eql(1);
	});

	it('the element popped should be the last element added.', function () {
		var result = myStack.pop();
		expect(result).to.eql(testValue2);
	});

});

describe('When pushing two elements to a stack and then popping 2 elements', function () {
	var myStack;
	var testValue1 = "test_string1";
	var testValue2 = "test_string2";

	beforeEach(function() {
		myStack = new StackQueue();
		myStack.push(testValue1);
		myStack.push(testValue2);
	});

	afterEach(function() {
		myStack = null;
	});

	it('the stack`s length should be 0', function () {
		myStack.pop();
		myStack.pop();
		expect(myStack.length).to.eql(0);
	});

	it('the elements popped should be in the inverse order to which they were added.', function () {
		var result1 = myStack.pop();
		var result2 = myStack.pop();
		expect(result1).to.eql(testValue2);
		expect(result2).to.eql(testValue1);
	});

});
