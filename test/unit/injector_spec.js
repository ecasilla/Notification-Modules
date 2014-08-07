var injector = require('../../app/scripts/injector.js'),
    expect = require('chai').expect;

describe('Injector',function(){
  beforeEach('create mocks',function(){
    var Service = function() {
      return { name: 'Service' };
    }
    var Router = function() {
      return { name: 'Router' };
    }
    injector.register('service', Service);
    injector.register('router', Router);
  });
  it('injects the correct dependencies into the functon',function(){
    var doSomething = injector.resolve(['service', 'router'], function(other) {
    expect(this.service().name).to.be('Service');
    expect(this.router().name).to.be('Router');
    expect(other).to.be('Other');
    expect().result();
    });
  });
});
