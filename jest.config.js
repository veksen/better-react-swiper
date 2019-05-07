module.exports = {
    "transform": {
        ".(ts|tsx)": "/Users/veksen/Projects/better-react-swiper-2/node_modules/ts-jest/dist/index.js"
    },
    "transformIgnorePatterns": [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"
    ],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "collectCoverageFrom": [
        "src/**/*.{ts,tsx}"
    ],
    "testMatch": [
        "<rootDir>/test/**/*.(spec|test).{ts,tsx}"
    ],
    "testURL": "http://localhost",
    "rootDir": "/Users/veksen/Projects/better-react-swiper-2",
    "watchPlugins": [
        "/Users/veksen/Projects/better-react-swiper-2/node_modules/jest-watch-typeahead/filename.js",
        "/Users/veksen/Projects/better-react-swiper-2/node_modules/jest-watch-typeahead/testname.js"
    ]
}