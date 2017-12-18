"use strict";

const { promisify, promisifyAll } = require("../src/promisify");

describe.only("promisify", function() {
  const nodeSuccess = (n, cb) => process.nextTick(() => cb(null, n * 2));
  const nodeFailure = cb => process.nextTick(() => cb(new Error("epic fail")));

  describe("promisify", function() {
    context("success", function() {
      it("should return a promise which resolves with the result", () =>
        promisify(nodeSuccess)(21).should.become(42));
    });

    context("failure", function() {
      it("should return a rpomise which rejects with the error", () =>
        promisify(nodeFailure)().should.be.rejectedWith("epic fail"));
    });

    it("should keep context", function() {
      const context = {};
      return promisify(function(cb) {
        cb(null, this);
      })
        .call(context)
        .should.become(context);
    });
  });

  describe("promisifyAll", function() {
    it("should promisify all the functions of the object", async function() {
      const o = {
        value: 42,
        success: nodeSuccess,
        failure: nodeFailure
      };
      const po = promisifyAll(o);
      po.value.should.equal(42);
      await po.success(21).should.become(42);
      return po.failure().should.be.rejectedWith("epic fail");
    });
  });
});
