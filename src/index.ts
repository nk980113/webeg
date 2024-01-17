import type { FC, IntrinsicElementStr, VElement } from './jsx-runtime.js';
import {
  kCreator,
  kIdent,
  kInsertRef,
  kProps,
  kWebeg,
} from './symbols.js';
import { VDOMNode, createVDOMNode } from './vdom.js';

if (typeof window === 'undefined') {
  throw new Error('This package should be run in browser or browser-like environment.');
}

const HTMLUnknownElementProto = Reflect.getPrototypeOf(document.createElement('c'));

let unknownWarned = false;

function render(
  vel: VElement<IntrinsicElementStr | FC<unknown>, unknown, unknown>,
): [Node[], VDOMNode] {
  if (typeof vel[kCreator] === 'string') {
    const el = document.createElement(vel[kCreator]);
    if (!unknownWarned && Reflect.getPrototypeOf(el) === HTMLUnknownElementProto) {
      // eslint-disable-next-line no-console
      console.warn('Found unexpected unknown element. Did you make a typo somewhere?');
      unknownWarned = true;
    }
    const children: VDOMNode[] = [];
    Object.entries(vel[kProps] as object).forEach(([v, p]) => {
      if (v.startsWith('on')) {
        const eventName = v.slice(2).toLowerCase();
        el.addEventListener(eventName, function _webegInternalCallback(this: HTMLElement, ev) {
          (p as (_: unknown, __: unknown) => unknown).call(this, ev, this);
        });
      } else if (v === 'children') {
        let els;
        if (Array.isArray(p)) {
          els = p.map((e) => renderAny(e));
        } else {
          els = [renderAny(p as JSX.Element)];
        }
        els.forEach(([es, c]) => {
          es.forEach((e) => el.appendChild(e));
          children.push(c);
        });
      } else if (v === 'key') {
        // No-op
      } else if (v === 'style') {
        Object.assign(el.style, p);
      } else if (p) {
        (el as Record<typeof v, unknown>)[v] = p;
      }
    });

    vel[kInsertRef](el);
    return [[el], createVDOMNode(vel, children)];
  }
  const [el, node] = renderAny(vel[kCreator](vel[kProps]));
  return [el, createVDOMNode(vel, [node])];
}

function renderAny(vel: JSX.Element): [Node[], VDOMNode] {
  switch (typeof vel) {
    case 'string':
    case 'number':
    case 'bigint':
      return [[document.createTextNode(String(vel))], createVDOMNode(vel, [])];
    case 'undefined':
    case 'boolean':
      return [[], createVDOMNode(vel, [])];
    case 'object':
      if (!vel) return [[], createVDOMNode(vel, [])];
      if (Array.isArray(vel)) {
        const result = vel.map((v) => renderAny(v));
        const node = createVDOMNode(vel, result.map(([, n]) => n));
        const els = result.flatMap(([e]) => e);
        return [els, node];
      }
      if (vel[kIdent] === kWebeg) {
        return render(vel);
      }
      throw new Error('Type not supported');
    default:
      throw new Error('Type not supported');
  }
}

/**
 * Render the target component to the DOM Tree.
 * @param root The container DOM element to render the result.
 * @param element The target element to render.
 * @returns The root of the result VDOM Tree.
 */
export function create(
  root: HTMLElement,
  element: JSX.Element,
): VDOMNode {
  const [els, node] = renderAny(element);
  els.forEach((el) => root.appendChild(el));
  return node;
}

export {
  VElement,
  VDOMNode,
};
