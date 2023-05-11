/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["dist/", "docs/"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "hack-node-fetch": "node-fetch",
    "node-fetch": "fetch-vcr",
  },
  transform: {
    "^.+\\.m?[tj]sx?$": ["ts-jest", { useESM: true }],
  },
  //setupFiles: ["dotenv/config"],
  testTimeout: 20_000,
};
