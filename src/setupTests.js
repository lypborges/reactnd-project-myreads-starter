// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import "react-testing-library/cleanup-after-each";
// this adds jest-dom's custom assertions
import "jest-dom/extend-expect";

var localStorageMock = (function() {
  var store = {};

  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock
});
