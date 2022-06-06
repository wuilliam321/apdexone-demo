module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
