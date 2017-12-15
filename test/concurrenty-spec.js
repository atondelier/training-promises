"use strict";

const Promise = require("bluebird");
const { series, map } = require("../src/concurrency");

const createResolver = resolveFunc => {
  const resolver = {
    resolutionCount: 0,
    reset: () => (resolver.resolutionCount = 0),
    resolve: input =>
      Promise.resolve(resolveFunc(input)).tap(() => {
        resolver.resolutionCount++;
      })
  };
  return resolver;
};

describe("concurrency", function() {
  const resolver = createResolver(input => ({
    output: input,
    resolutionCountAtStart: resolver.resolutionCount
  }));

  afterEach(function() {
    resolver.reset();
  });

  describe("series", function() {
    it("should start all resolutions sequentially", () =>
      expect(series([0, 1, 2, 3], resolver.resolve)).to.become([
        { output: 0, resolutionCountAtStart: 0 },
        { output: 1, resolutionCountAtStart: 1 },
        { output: 2, resolutionCountAtStart: 2 },
        { output: 3, resolutionCountAtStart: 3 }
      ]));
  });

  describe("map", function() {
    it("should start all resolutions at the same time", () =>
      expect(map([0, 1, 2, 3], resolver.resolve)).to.become([
        { output: 0, resolutionCountAtStart: 0 },
        { output: 1, resolutionCountAtStart: 0 },
        { output: 2, resolutionCountAtStart: 0 },
        { output: 3, resolutionCountAtStart: 0 }
      ]));
  });

  describe("map with concurrency", function() {
    it("should start all resolutions with a concurrency limit", () =>
      expect(map([0, 1, 2, 3], resolver.resolve, { concurrency: 2 })).to.become(
        [
          { output: 0, resolutionCountAtStart: 0 },
          { output: 1, resolutionCountAtStart: 0 },
          { output: 2, resolutionCountAtStart: 2 },
          { output: 3, resolutionCountAtStart: 2 }
        ]
      ));
  });
});
