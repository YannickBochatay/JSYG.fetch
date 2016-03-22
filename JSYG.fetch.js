/*jshint forin:false, eqnull:true*/
/* globals JSYG,define*/
"use strict";

(function(root,factory) {

  if (typeof module != "undefined" && module.exports) {
    var fetch = root && root.fetch ? root.fetch : require("fetch");
    module.exports = factory(fetch);
  }
  else if (typeof define == 'function' && define.amd) {

    if (root && root.fetch) define("jsyg-fetch",function() { return factory(root.fetch); });
    else define("jsyg-fetch",["fetch"],function() { return factory(root.fetch); });
  }
  else if (root.fetch) factory(root.fetch);
  else throw new Error("fetch polyfill is needed");

})(this,function(fetch) {

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