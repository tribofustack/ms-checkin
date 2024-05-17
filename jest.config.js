const ignoreFiles = [
    "/node_modules/",
    "jest.config.js",
    "main.ts",
    "/external/",
    "app.module.ts",
    "/internal/application/configs/swagger.config.ts",
    "/internal/application/docs/",
    "/internal/application/ports/",
]

module.exports = {    
    testEnvironment: 'node',
    preset: 'ts-jest',
    roots: ["<rootDir>"],
    clearMocks: true,
    collectCoverageFrom: ["**/*.ts"],
    "moduleNameMapper": {
        "src/(.*)": "<rootDir>/$1"
    },
    moduleDirectories: [
        "node_modules",
        "src"
    ],
    modulePaths: [
        "<rootDir>/src/"
    ],
    coverageProvider: "v8",
    rootDir: "./src",
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
    // testPathIgnorePatterns: ignoreFiles,
    coveragePathIgnorePatterns: ignoreFiles,
    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest",
    },
};