#!/usr/bin/env node
'use strict';
const __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const chalk_1 = __importDefault(require('chalk'));
console.warn((0, chalk_1.default)`
{yellow.bold ⚠️ This tool does not initialize new React Native projects.}

It's recommended to use a framework to build apps with React Native, for example:

  Expo:
    {bold npx create-expo-app}
  
  React Native Community template:
    {bold npx @react-native-community/cli init}
  
Learn more: {underline https://reactnative.dev/docs/environment-setup}
`);
process.exit(1);
