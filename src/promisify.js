"use strict";

const promisify = f =>
  () => Promise.reject("I'm not implemented yet");

const promisifyAll = o => new Proxy(o, {
  get(target, prop) {
    return typeof target[prop] === "function" ? () => Promise.reject("I'm not implemented yet") : target[prop];
  }
});

module.exports = {
  promisify,
  promisifyAll
};
