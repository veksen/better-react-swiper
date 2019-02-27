module.exports = function configWallaby(wallaby) {
  return {
    files: [
      { pattern: "src/**/*.js*", load: true },
      { pattern: "src/**/*.test.js*", ignore: true }
    ],

    tests: [{ pattern: "src/**/*.test.js*", load: true }],

    compilers: {
      "**/*.js*": wallaby.compilers.babel()
    },

    env: {
      type: "node",
      runner: "node"
    },

    testFramework: "jest"
  };
};
