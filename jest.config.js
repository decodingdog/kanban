module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js",
    // "@nuxtjs/composition-api": "@nuxtjs/composition-api/lib/entrypoint.js",
  },
  moduleFileExtensions: ["ts", "js", "vue", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/components/**/*.vue",
    "<rootDir>/layouts/**/*.vue",
    "<rootDir>/pages/*.vue",
    "<rootDir>/utils/*.ts",
  ],
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/test/setup.js"],
};
