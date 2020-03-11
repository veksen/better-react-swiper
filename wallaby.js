module.exports = function configWallaby(wallaby) {
  return {
    files: [
      { pattern: 'src/**/*.ts?(x)', load: true },
      { pattern: 'test/**/*.test.ts?(x)', ignore: true },
    ],

    tests: [{ pattern: 'test/**/*.test.ts?(x)', load: true }],

    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs',
      }),
    },

    moduleDirectories: ['node_modules'],

    env: {
      type: 'node',
      runner: 'node',
    },

    testFramework: 'jest',
  };
};
