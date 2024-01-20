# Creating Static Elements

## Basics
Use react-like JSX syntax to create an `VElement`.
```tsx
const vElement = (
    <div>
        <h1>Hello,</h1>
        <p>world!</p>
    </div>
);
```
The variable `vElement` now has type `VElement<'div', HTMLDivElement, unknown>`.
> [!NOTE]
> The inferred type of the variable will be `JSX.Element` due to TypeScript issues, but it doesn't matter much for now

The first generic parameter of `VElement` type is the "element creator," which represents how this element is created.
The second and the third generic parameters represents "ref type" and "extension type," which will be covered later.
## Props
You can add "props" to the elements:
```tsx
const vElement = (
    <div className='container'>
        <h1 className='heading'>Hello,</h1>
        <p className='paragraph'>world!</p>
    </div>
);
```
Meaningful props are included in TypeScript declaration files.
Props are internally created by assigning correlated JavaScript properties.

You can also insert normal JavaScript values as props with curly braces `{}`:
```tsx
const vElement = (
    <div style={{ width: '100px' }}>
        <h1 style={{ textDecoration: 'blue' }}>Hello,</h1>
        <p style={{ fontFamily: 'Cascadia Code, Consolas' }}>world!</p>
    </div>
);
```
Note that childrens are props too, which means that `{}` can also be used in children:
```tsx
const vElement = (
    <div>
        <h1>1 + 1 = ?</h1>
        <p>{1 + 1}!</p>
    </div>
);
```
# Rendering `VElement`s

Use `create` function to render a `VElement`.

```tsx
import { create } from 'webeg';

create(document.body, vElement);
```

Then you can see changes in the web page.

Inline format is accepted:

```tsx
import { create } from 'webeg';

create(document.body, <div>
    <h1>Hello,</h1>
    <p>world!</p>
</div>);
```

# Related Files

- [testcases/static](../../testcases/static/) (test spec: [static](../../cypress/e2e/static.cy.ts))
