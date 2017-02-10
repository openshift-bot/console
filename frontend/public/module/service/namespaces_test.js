describe('ui-actions', function() {
  'use strict';
  //var setPath, mockPath;

  var getActiveNamespace = window.tectonicTesting.uiActions.getActiveNamespace;
  var getNamespacedRoute = window.tectonicTesting.uiActions.getNamespacedRoute;
  var registerNamespaceFriendlyPrefix = window.tectonicTesting.uiActions.registerNamespaceFriendlyPrefix;
  var setActiveNamespace = window.tectonicTesting.uiActions.setActiveNamespace;

  beforeEach(function() {
    //setPath = '*UNSET*';
    registerNamespaceFriendlyPrefix('pods');
  });

  describe('setActiveNamespace', function() {
    it('sets active namespace in memory', function() {
      var expected = 'test';
      //mockPath = '/not-a-namespaced-path';
      setActiveNamespace(expected);
      //expect(setPath).toEqual('*UNSET*');

      expect(getActiveNamespace()).toEqual(expected);
      expect(!_.isUndefined(getActiveNamespace())).toBe(true);
    });

    it('clears active namespace in memory', function() {
      setActiveNamespace('test');
      setActiveNamespace(undefined);

      expect(_.isUndefined(getActiveNamespace())).toBe(true);
      expect(getActiveNamespace()).toEqual(undefined);
    });

    // TODO (andy): These tests are currently broken
    //it('should redirect namespaced location paths for known namespace-friendly prefixes', function() {
    //  mockPath = '/ns/floorwax/pods';
    //  setActiveNamespace('dessert-topping');
    //  expect(setPath).toEqual('ns/dessert-topping/pods');
    //});

    //it('should redirect namespaced location paths to their prefixes', function() {
    //  mockPath = '/ns/floorwax/pods/new-shimmer';
    //  setActiveNamespace(); // reset active namespace
    //  setActiveNamespace('dessert-topping');
    //  expect(setPath).toEqual('ns/dessert-topping/pods');
    //});

    //it('should redirect to all if no namespaces is selected', function() {
    //  mockPath = '/ns/floorwax/pods';
    //  setActiveNamespace(null);
    //  expect(setPath).toEqual('all-namespaces/pods');
    //});

    //it('should not redirect if the current path isn\'t namespaced', function() {
    //  mockPath = '/not-a-namespaced-path';
    //  setActiveNamespace('dessert-topping');
    //  expect(setPath).toEqual('*UNSET*');
    //});
  });

  describe('getNamespacedRoute', function() {
    it('formats a route correctly without an active namespace', function() {
      setActiveNamespace();
      expect(getNamespacedRoute('/pods')).toEqual('all-namespaces/pods');
      expect(getNamespacedRoute('/pods/GRIBBL')).toEqual('all-namespaces/pods/GRIBBL');
    });

    it('formats a route with the current active namespace', function() {
      setActiveNamespace('test');
      expect(getNamespacedRoute('/pods')).toEqual('ns/test/pods');
      expect(getNamespacedRoute('/pods/GRIBBL')).toEqual('ns/test/pods/GRIBBL');
    });

    it('parses resource from path', function () {
      setActiveNamespace();
      expect(getNamespacedRoute('/')).toEqual('all-namespaces/');
      expect(getNamespacedRoute('/gribbl')).toEqual('all-namespaces/gribbl');
      expect(getNamespacedRoute('gribbl')).toEqual('all-namespaces/gribbl');
      expect(getNamespacedRoute('/pods')).toEqual('all-namespaces/pods');
      expect(getNamespacedRoute('ns/foo/pods')).toEqual('all-namespaces/pods');
      expect(getNamespacedRoute('ns/foo/pods/WACKY_SUFFIX')).toEqual('all-namespaces/pods');
    });

    it('parses resources that contain a slash correctly', function() {
      setActiveNamespace();
      expect(getNamespacedRoute('//')).toEqual('all-namespaces/');
      expect(getNamespacedRoute('/settings/users')).toEqual('all-namespaces/settings/users');
      expect(getNamespacedRoute('ns/foo/pods/don\'t/lets/start')).toEqual('all-namespaces/pods');
      expect(getNamespacedRoute('ns/foo/pods/bar//baz')).toEqual('all-namespaces/pods');
      expect(getNamespacedRoute('all-namespaces/pods/terminal/')).toEqual('all-namespaces/pods');
    });
  });
});
