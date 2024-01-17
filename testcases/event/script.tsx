import { type VElement, create } from 'webeg';

document.addEventListener('DOMContentLoaded', () => {
  const divRef = <div id='control-ref' onClick={() => {
    divRef.textContent = 'This piece of text is controlled by webeg refs!';
  }}>Click me too!</div> as VElement<'div', HTMLDivElement, unknown>;
  create(document.body, <div>
    <div id='control-ev' onClick={(_, el) => {
      el.textContent = 'This piece of text is controlled by event listener!';
    }}>Click me!</div>
    {divRef}
    <div id='control-this' onClick={function _() {
      this.textContent = 'This piece of text is controlled by event listener using this!';
    }}>Click me three!</div>
  </div>);
});
