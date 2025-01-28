import type { Config } from "@jest/types";
export const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "src",
  testRegex: ".*\\.test\\.ts$",
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/$1",
  },
  collectCoverageFrom: ["./**/*.(t|j)s"],
};
