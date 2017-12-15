"use strict";

const Promise = require("bluebird");

const ensurePromise = valueOrPromise => Promise.resolve();

const ensurePropsResolved = object => Promise.resolve();

module.exports = {
  ensurePromise,
  ensurePropsResolved
};
