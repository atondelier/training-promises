"use strict";

const { ensurePromise, ensurePropsResolved } = require("../src/resolvable");

describe("resolvable", function() {
  describe("ensurePromise", function() {
    it("should resolve with the provided number", () =>
      expect(ensurePromise(1)).to.become(1));

    it("should resolve with the provided promise resolution value", () =>
      expect(ensurePromise(Promise.resolve(1))).to.become(1));
  });

  describe("ensurePropsResolved", function() {
    it("should resolve with props resolved", () =>
      expect(
        ensurePropsResolved({
          foo: Promise.resolve("bar")
        })
      ).to.become({ foo: "bar" }));
  });
});
