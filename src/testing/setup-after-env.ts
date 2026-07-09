import { extendJest } from "./extend-jest";

// Jest `setupFilesAfterEnv` entry wired by `createJestConfig`: registers the custom matchers.
extendJest();
