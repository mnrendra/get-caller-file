# @mnrendra/get-caller-file

![version](https://img.shields.io/npm/v/@mnrendra/get-caller-file)
![types](https://img.shields.io/npm/types/@mnrendra/get-caller-file)
![license](https://img.shields.io/npm/l/@mnrendra/get-caller-file)
![size](https://img.shields.io/npm/unpacked-size/@mnrendra/get-caller-file)
![downloads](https://img.shields.io/npm/dm/@mnrendra/get-caller-file)

A utility to get the caller's file path from a specific callee.<br/>
*Useful for debugging, logging, or building tools that need to get the file locations at runtime.*

## Install
```bash
npm i @mnrendra/get-caller-file
```

## API

### **`getCallerFile`**
Gets the caller's file path from a specific callee.<br/>
*Extracts the file name as an absolute path from the first call site in the stack trace. If a callee is provided, the stack trace will start from the caller of the callee.*<br/>

#### **Type**:
```typescript
(callee?: ((...args: any) => any) | null) => string
```

#### Parameters

| Name      | Type                              | Description                                                                                                                 |
|-----------|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| `callee`  | `((...args: any) => any) \| null` | Optional callee function or method to start tracing from. If `undefined` or `null`, tracing starts from the current caller. |

#### **Return Type**:
```typescript
string
```
A string representing the absolute path of the caller's file.

## Usage

### **CommonJS**

`/foo/callee.cjs`
```javascript
const { getCallerFile } = require('@mnrendra/get-caller-file')

const callee = () => {
  const callerFile1 = getCallerFile()
  const callerFile2 = getCallerFile(callee) // set the `callee` function as the callee.

  console.log(callerFile1) // output: /foo/callee.cjs
  console.log(callerFile2) // output: /foo/caller.cjs
}

module.exports = callee
```
`/foo/caller.cjs`
```javascript
const callee = require('./callee.cjs')
const caller = () => callee()
caller()
```

### **ES Modules**

`/foo/callee.mjs`
```javascript
import { getCallerFile } from '@mnrendra/get-caller-file'

const callee = () => {
  const callerFile1 = getCallerFile()
  const callerFile2 = getCallerFile(callee) // set the `callee` function as the callee.

  console.log(callerFile1) // output: /foo/callee.mjs
  console.log(callerFile2) // output: /foo/caller.mjs
}

export default callee
```
`/foo/caller.mjs`
```javascript
import callee from './callee.mjs'
const caller = () => callee()
caller()
```

### Examples

1. **Call from your development project**

`/foo/project-name/src/index.mjs`:
```javascript
import { fileURLToPath } from 'node:url'
import { getCallerFile } from '@mnrendra/get-caller-file'

const caller = () => getCallerFile()
const callerFile = caller()

console.log(callerFile) // output: /foo/project-name/src/index.mjs
```

2. **Call from your production package**

`/foo/consumer/node_modules/module-name/dist/index.js`:
```javascript
"use strict";

const { getCallerFile } = require("@mnrendra/get-caller-file");

const caller = () => getCallerFile();
const callerFile = caller();

console.log(callerFile); // output: /foo/consumer/node_modules/module-name/dist/index.js
```

## License
[MIT](https://github.com/mnrendra/get-caller-file/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
