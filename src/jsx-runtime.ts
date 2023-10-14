import {
  kCreator,
  kExtend,
  kInsertRef,
  kProps,
} from './symbols.js';

// #region globalJsxDecl
declare global {
  // Only documented types here
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // Since we don't use class component here, these are not allowed
    type ElementsClass = never;
    type ElementAttributesProperty = never;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type IntrinsicClassAttributes<T> = never;
    type ElementChildrenAttribute = never;

    // TODO: fill in these types
    // builtin attributes
    interface IntrinsicElements {
      // TODO: Root Element

      // TODO: Metadata

      // TODO: Section Root

      // TODO: Content Section
      h1: Props<HTMLHeadingElement>;
      h2: Props<HTMLHeadingElement>;
      h3: Props<HTMLHeadingElement>;
      h4: Props<HTMLHeadingElement>;
      h5: Props<HTMLHeadingElement>;
      h6: Props<HTMLHeadingElement>;
      main: Props;
      nav: Props;
      // TODO: Text Content
      div: Props<HTMLDivElement>;
      li: Props<HTMLLIElement>;
      ol: Props<HTMLOListElement>;
      p: Props<HTMLParagraphElement>;
      ul: Props<HTMLUListElement>;
      // TODO: Inline Text Semantics
      // TODO: add SVG A Element
      a: Props<HTMLAnchorElement>;
      b: Props;
      br: Props<HTMLBRElement>;
      i: Props;
      span: Props<HTMLSpanElement>;
      // TODO: Image/Media
      img: Props<HTMLImageElement>;
      // TODO: Embedded Content
      iframe: Props<HTMLIFrameElement>;
      // TODO: SVG/MathML

      // TODO: Scripting

      // TODO: Demarcating Edits

      // TODO: Table Contents

      // TODO: Forms
      button: Props<HTMLButtonElement>;
      form: Props<HTMLFormElement>;
      input: Props<HTMLInputElement>;
      // TODO: Interactive

      // TODO: Web Components

    }
    // FC return type
    type Element = VElement<IntrinsicElementStr | FC<unknown>, unknown, unknown>;
    // framework defined attributes
    interface IntrinsicAttributes {
      key?: string;
    }
  }
}
// #endregion
// #region utilityTypes
type GetNonFuncAndGetterOnlyKeys<T> = Exclude<{
  [K in keyof T]:
    // Exclude legacy event handlers
    ((...args: readonly unknown[]) => unknown) extends T[K]
      ? never
      // Exclude methods
      // eslint-disable-next-line @typescript-eslint/ban-types
      : T[K] extends Function
        ? never
        // https://stackoverflow.com/questions/52443276/how-to-exclude-getter-only-properties-from-type-in-typescript
        // Exclude read only keys
        : (<U>() => U extends { [Q in K]: T[K] } ? true : false) extends
          (<U>() => U extends { -readonly [Q in K]: T[K] } ? true : false)
            ? K
            : never;
// Exclude dangerous setter keys
}[keyof T], undefined | `${'inner' | 'outer'}${'HTML' | 'Text'}` | 'nodeValue'>;

type GetAttributes<T extends HTMLElement> = {
  [K in GetNonFuncAndGetterOnlyKeys<T>]? : T[K]
};

type GetEventKeys<EventMap extends HTMLElementEventMap, ElementType extends HTMLElement> = {
  [K in keyof EventMap as `on${Capitalize<string & K>}`]?: (this: ElementType, ev: EventMap[K], el: ElementType) => unknown;
};

type Props<
  // TODO: make this type wider
  T extends HTMLElement = HTMLElement,
  EventMap extends HTMLElementEventMap = HTMLElementEventMap,
> =
  & GetAttributes<T>
  & GetEventKeys<EventMap, T>
  & {
      children?: JSX.Element;
      key?: string;
    };

export type IntrinsicElementStr = keyof JSX.IntrinsicElements & keyof HTMLElementTagNameMap;

type PropType<C extends IntrinsicElementStr | FC<unknown>> = C extends IntrinsicElementStr
  ? JSX.IntrinsicElements[C]
  : C extends FC<infer PropsType>
    ? PropsType
    : never;

// #endregion

// TODO: fill in this type
export type FC<PropsType> = never;

export type VElement<C extends IntrinsicElementStr | FC<unknown>, P, E> = {
  [kCreator]: C;
  [kProps]: unknown;
  [kInsertRef](ref: P): boolean;
  [kExtend]<PE>(proto: PE): VElement<C, P, E & PE>;
} & P & E;

export function jsx<E extends IntrinsicElementStr>(
  type: E,
  props: JSX.IntrinsicElements[E],
  key?: string,
): VElement<E, HTMLElementTagNameMap[E], unknown>;
export function jsx(
  type: IntrinsicElementStr | FC<unknown>,
  props: unknown,
  key?: string,
): VElement<IntrinsicElementStr | FC<unknown>, unknown, unknown> {
  if (typeof type === 'string') {
    let ref: unknown;
    return new Proxy({
      [kCreator]: type,
      [kProps]: props,
      // TODO: make this type wider
      [kInsertRef](targetRef: HTMLElement) {
        const hadNoRef = !ref;
        ref = targetRef;
        return hadNoRef;
      },
      [kExtend]() {
        throw new Error('Extending VElement is not implemented now');
      },
    }, {
      get(target, k) {
        if (Object.hasOwn(target, k)) {
          return (target as Record<typeof k, unknown>)[k];
        }

        if (ref) {
          return (ref as Record<typeof k, unknown>)[k];
        }

        // TODO: use warning instead of throwing error
        throw new Error('Ref accessing error', { cause: { fix: 'Seems like you tried to use ref semantics without initializing the ref.\nWrap this in a effect if you access this when creating function components.' } });
      },
      set(_, p, newValue) {
        try {
          (ref as Record<typeof p, unknown>)[p] = newValue;
          return true;
        } catch {
          return false;
        }
      },
      ownKeys() {
        if (ref) {
          return Object.keys(ref);
        }
        return [];
      },
    });
  // eslint-disable-next-line no-else-return
  } else {
    throw new Error('Function components are not implemented now');
  }
}

export { jsx as jsxs };