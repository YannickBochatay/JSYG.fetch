/*jshint forin:false, eqnull:true*/
/* globals JSYG,define*/
"use strict";

(function(factory) {

  var root = (typeof window !== "undefined") ? window : global;
  var Promise = root.Promise;
  var fetch = root.fetch;

  if (typeof module != "undefined" && module.exports) {

    if (!Promise) Promise = require("es6-promise").Promise;

    if (!fetch) {
      require("fetch");
      fetch = root.fetch;
    }

    module.exports = factory(Promise,fetch);
  }
  else if (typeof define == 'function' && define.amd) {

    if (fetch) {

      if (Promise) define("jsyg-fetch",function() { return factory(Promise,fetch); });
      else define("jsyg-fetch",["es6-promise"],function(es6) { return factory(es6.Promise,fetch); });

    }
    else {

      if (Promise) define("jsyg-fetch",["fetch"],function(fetch) { return factory(Promise,root.fetch); });
      else define("jsyg-fetch",["es6-promise","fetch"],function(es6,fetch) { return factory(es6.Promise,root.fetch); });
    }
  }
  else if (Promise && fetch) root.jfetch = factory(Promise,fetch);
  else throw new Error("polyfill(s) missing");

})(function(Promise,fetch) {

  "use strict";

  function checkStatus(response) {

    var s = response.status;

    if (s >= 200 && s < 300 || s === 304 || s === 0 /*file protocol*/) return response;

    var error = new Error(response.statusText);

    error.response = response;

    throw error;
  }

  function jfetch() {

    return fetch.apply(null,arguments).then(checkStatus);
  }

  if (typeof JSYG != "undefined") JSYG.fetch = jfetch;

  return jfetch;

});
