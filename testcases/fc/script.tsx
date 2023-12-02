import { create } from 'webeg';

document.addEventListener('DOMContentLoaded', () => {
  create(document.body, <div id='container'>
    <ContainsDiv />
    <WithProps text='This text is controlled with props!' />
    {/* FIXME: Normal way doesn't compile */}
    <WithChildren children={<div>I'm a children!</div>} />
  </div>);
});

function ContainsDiv() {
  return (
    <div id='created-by-fc'>I'm created with function components!</div>
  );
}

function WithProps({ text }: { text: string }) {
  return (
    <div id='with-props'>{text}</div>
  );
}

function WithChildren({ children }: { children: JSX.Element }) {
  return (
    <div id='with-children'>{children}</div>
  );
}
