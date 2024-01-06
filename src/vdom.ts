import './jsx-runtime.js';
import {
  kChildren,
  kIdent,
  kNodeData,
  kWebeg,
} from './symbols.js';

/** A node in the VDOM Tree. */
export type VDOMNode = {
  [kIdent]: typeof kWebeg;
  [kNodeData]: JSX.Element;
  [kChildren]: VDOMNode[];
};

export function createVDOMNode(element: JSX.Element, children: VDOMNode[]): VDOMNode {
  return {
    [kIdent]: kWebeg,
    [kNodeData]: element,
    [kChildren]: children,
  };
}
