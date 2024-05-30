// module.exports = {
//   collectCoverage: true,
//   collectCoverageFrom: ["src/**/*.{js,jsx}"],
//   coverageDirectory: "coverage",
//   testEnvironment: "jsdom",
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
// };

module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/src/__mocks__/styleMock.js",
  },
  collectCoverage: true,
  coverageReporters: ["lcov", "text"],
  // collectCoverageFrom: [
  //   "src/**/*.{js,jsx}",
  //   "!src/**/*.test.{js,jsx}",
  //   "!src/index.js",
  //   "!src/reportWebVitals.js",
  // ],
  coverageDirectory: "coverage",
};
