# Setting up with TypeScript
Add following items to your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "webeg",
  },
}
```
See the [TSConfig Reference](https://www.typescriptlang.org/tsconfig#jsx) for more information.

Using webeg with a bundler (such as `tsup`) would be suggested.