# npm-outdated-to-latest
Helper tool for updating node dependencies.

Tool updates all project dependencies to latest (greater) version reported by `npm outdated`. Update process resets and regenerates also package-lock.json file and reinstalls all dependencies so it is recommended to use only when extensive acceptance test set can be run.

## Install

```
npm install --save-dev npm-outdated-to-latest
```

## Usage

```
npm-outdated-to-latest
```
