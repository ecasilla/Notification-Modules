/*jshint -W079 */
var LinkedList = require('../../app/scripts/linkedList.js'),
expect =require('chai').expect;

describe('When adding one element to a Linked List', function () {
  var list;
  var testValue = "test_string";

  beforeEach(function() {
    list = new LinkedList();
    list.add(testValue);

  });

  afterEach(function() {
    list = null;
  });

  it('the lists length should increase by 1', function () {
    expect(list.length).to.eql(1);
  });

  it('the start element should contain the added value.', function () {
    expect(list.start.data).to.eql(testValue);
  });

  it('the end element should contain the added value.', function () {
    expect(list.end.data).to.eql(testValue);
  });

  it('the start next pointer should be null.', function () {
    expect(list.start.next).to.eql(null);
  });

  it('the end next pointer should be null.', function () {
    expect(list.end.next).to.eql(null);
  });
});

describe('When the List contains one element and your remove it', function () {
  var list;
  var testValue = "test_string";

  beforeEach(function() {
    list = new LinkedList();
    list.add(testValue);
    list.remove(testValue);

  });

  afterEach(function() {
    list = null;
  });

  it('the lists length should be zero', function () {
    expect(list.length).to.eql(0);
  });

  it('the start element should be null', function () {
    expect(list.start).to.eql(null);
  });

  it('the end element should be null', function () {
    expect(list.end).to.eql(null);
  });
});

describe('When adding two elements to a Linked List', function () {
	var list;
	var testValue1 = "test_string1";
	var testValue2 = "test_string2";

	beforeEach(function() {
		list = new LinkedList();
		list.add(testValue1);
		list.add(testValue2);

	});

	afterEach(function() {
		list = null;
	});

	it('the lists length should be 2', function () {
		expect(list.length).to.eql(2);
	});

	it('the start element should contain the 1st value.', function () {
		expect(list.start.data).to.eql(testValue1);
	});

	it('the end element should contain the 2nd value.', function () {
		expect(list.end.data).to.eql(testValue2);
	});

	it('the start next pointer should be point to the 2nd value node.', function () {
		expect(list.start.next.data).to.eql(testValue2);
	});

	it('the end next pointer should be null.', function () {
		expect(list.end.next).to.eql(null);
	});
});

describe('When adding two elements to a Linked List and then removing the 1st element', function () {
	var list;
	var testValue1 = "test_string1";
	var testValue2 = "test_string2";

	beforeEach(function() {
		list = new LinkedList();
		list.add(testValue1);
		list.add(testValue2);
		list.remove(testValue1);

	});

	afterEach(function() {
		list = null;
	});

	it('the lists length should be 1', function () {
		expect(list.length).to.eql(1);
	});

	it('the start element should contain the 2nd value.', function () {
		expect(list.start.data).to.eql(testValue2);
	});

	it('the end element should be the same as the start element.', function () {
		expect(list.end).to.eql(list.start);
	});

	it('the start next pointer should be null.', function () {
		expect(list.start.next).to.eql(null);
	});

	it('the end next pointer should be null.', function () {
		expect(list.end.next).to.eql(null);
	});
});

describe('When adding two elements to a Linked List and then removing the 2nd element', function () {
	var list;
	var testValue1 = "test_string1";
	var testValue2 = "test_string2";

	beforeEach(function() {
		list = new LinkedList();
		list.add(testValue1);
		list.add(testValue2);
		list.remove(testValue2);

	});

	afterEach(function() {
		list = null;
	});

	it('the lists length should be 1', function () {
		expect(list.length).to.eql(1);
	});

	it('the start element should contain the 1st value.', function () {
		expect(list.start.data).to.eql(testValue1);
	});

	it('the end element should be the same as the start element.', function () {
		expect(list.end).to.eql(list.start);
	});

	it('the start next pointer should be null.', function () {
		expect(list.start.next).to.eql(null);
	});

	it('the end next pointer should be null.', function () {
		expect(list.end.next).to.eql(null);
	});
});

describe('When adding three elements to a Linked List', function () {
	var list;
	var testValue1 = "test_string1";
	var testValue2 = "test_string2";
	var testValue3 = "test_string3";

	beforeEach(function() {
		list = new LinkedList();
		list.add(testValue1);
		list.add(testValue2);
		list.add(testValue3);

	});

	afterEach(function() {
		list = null;
	});

	it('the lists length should be 3', function () {
		expect(list.length).to.eql(3);
	});

	it('the start element should contain the 1st value.', function () {
		expect(list.start.data).to.eql(testValue1);
	});

	it('the end element should contain the 3rd value.', function () {
		expect(list.end.data).to.eql(testValue3);
	});

	it('the start next pointer should be point to the 2nd value node.', function () {
		expect(list.start.next.data).to.eql(testValue2);
	});

	it('the end next pointer should be null.', function () {
		expect(list.end.next).to.eql(null);
	});
});

describe('When adding three elements to a Linked List and then removing the 1st element', function () {
	var list;
	var testValue1 = "test_string1";
	var testValue2 = "test_string2";
	var testValue3 = "test_string3";

	beforeEach(function() {
		list = new LinkedList();
		list.add(testValue1);
		list.add(testValue2);
		list.add(testValue3);
		list.remove(testValue1);

	});

	afterEach(function() {
		list = null;
	});

	it('the lists length should be 2', function () {
		expect(list.length).to.eql(2);
	});

	it('the start element should contain the 2nd value.', function () {
		expect(list.start.data).to.eql(testValue2);
	});

	it('the end element should contain the 3rd value.', function () {
		expect(list.end.data).to.eql(testValue3);
	});

	it('the start next pointer should point to the end element.', function () {
		expect(list.start.next).to.eql(list.end);
	});

	it('the end next pointer should be null.', function () {
		expect(list.end.next).to.eql(null);
	});
});

describe('When adding three elements to a Linked List and then removing the 2nd element', function () {
	var list;
	var testValue1 = "test_string1";
	var testValue2 = "test_string2";
	var testValue3 = "test_string3";

	beforeEach(function() {
		list = new LinkedList();
		list.add(testValue1);
		list.add(testValue2);
		list.add(testValue3);
		list.remove(testValue2);

	});


	afterEach(function() {
		list = null;
	});

	it('the lists length should be 2', function () {
		expect(list.length).to.eql(2);
	});

	it('the start element should contain the 1st value.', function () {
		expect(list.start.data).to.eql(testValue1);
	});

	it('the end element should contain the 3rd value.', function () {
		expect(list.end.data).to.eql(testValue3);
	});

	it('the start next pointer should point to the end element.', function () {
		expect(list.start.next).to.eql(list.end);
	});

	it('the end next pointer should be null.', function () {
		expect(list.end.next).to.eql(null);
	});
});


describe('When adding three elements to a Linked List and then removing the 3rd element', function () {
	var list;
	var testValue1 = "test_string1";
	var testValue2 = "test_string2";
	var testValue3 = "test_string3";

	beforeEach(function() {
		list = new LinkedList();
		list.add(testValue1);
		list.add(testValue2);
		list.add(testValue3);
		list.remove(testValue3);

	});


	afterEach(function() {
		list = null;
	});

	it('the lists length should be 2', function () {
		expect(list.length).to.eql(2);
	});

	it('the start element should contain the 1st value.', function () {
		expect(list.start.data).to.eql(testValue1);
	});

	it('the end element should contain the 3rd value.', function () {
		expect(list.end.data).to.eql(testValue2);
	});

	it('the start next pointer should point to the end element.', function () {
		expect(list.start.next).to.eql(list.end);
	});

	it('the end next pointer should be null.', function () {
		expect(list.end.next).to.eql(null);
	});
});
