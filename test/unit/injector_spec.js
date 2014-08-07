var Injector = require('../../app/scripts/injector.js'),
    expect = require('chai').expect;

describe('Injector',function(){
  beforeEach('create mocks',function(){
    var Service = function() {
      return { name: 'Service' };
    }
    var Router = function() {
      return { name: 'Router' };
    }
    Injector.register('service', Service);
    Injector.register('router', Router);
  });
  it('injects the correct dependencies into the functon',function(){
    //var resolveSomething = Injector.resolve(['service', 'router'], function(other) {
    //expect(this.service().name).to.be('Service');
    //expect(this.router().name).to.be('Router');
    //expect(other).to.be('Other');
    //expect().result();
    //});
  });
});
