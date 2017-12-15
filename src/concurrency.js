"use strict";

const Promise = require("bluebird");

const series = (inputs, resolver) => Promise.resolve();

const map = (inputs, resolver, { concurrency = Infinity } = {}) =>
  Promise.resolve();

module.exports = {
  series,
  map
};
