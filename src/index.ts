import type { FC, IntrinsicElementStr, VElement } from './jsx-runtime.js';
import { kCreator, kInsertRef, kProps } from './symbols.js';

if (typeof window === 'undefined') {
  throw new Error('This package should be run in browser or browser-like environment.');
}

const HTMLUnknownElementProto = Reflect.getPrototypeOf(document.createElement('c'));

let unknownWarned = false;

function render(vel: VElement<IntrinsicElementStr | FC<unknown>, unknown, unknown>): HTMLElement {
  if (typeof vel[kCreator] === 'string') {
    const el = document.createElement(vel[kCreator]);
    if (!unknownWarned && Reflect.getPrototypeOf(el) === HTMLUnknownElementProto) {
      // eslint-disable-next-line no-console
      console.warn('Found unexpected unknown element. Did you make a typo in somewhere?');
      unknownWarned = true;
    }
    Object.entries(vel[kProps] as object).forEach(([v, p]) => {
      if (v.startsWith('on')) {
        const eventName = v.slice(2).toLowerCase();
        el.addEventListener(eventName, function _webegInternalCallback(this: HTMLElement, ev) {
          p(ev, this);
        });
      } else if (v === 'children') {
        let els;
        if (Array.isArray(p)) {
          els = p.map((e) => renderAny(e));
        } else {
          els = [renderAny(p)];
        }
        els.forEach((e) => {
          if (e) el.appendChild(e);
        });
      } else if (v === 'key') {
        // No-op
      } else if (p) {
        el.setAttribute(v, p);
      }
    });

    vel[kInsertRef](el);
    return el;
  }
  throw new Error('Function components are not implemented now');
}

function renderAny(vel: JSX.Element): Node | null {
  switch (typeof vel) {
    case 'string':
    case 'number':
    case 'bigint':
      return document.createTextNode(String(vel));
    case 'undefined':
    case 'boolean':
      return null;
    case 'object':
      return render(vel);
    default:
      throw new Error('Type not supported');
  }
}

// eslint-disable-next-line import/prefer-default-export
export function create(
  root: HTMLElement,
  element: JSX.Element,
) {
  const el = renderAny(element);
  if (el) root.appendChild(el);
}

export {
  VElement,
};