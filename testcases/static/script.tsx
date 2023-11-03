import { create } from 'webeg';

document.addEventListener('DOMContentLoaded', () => {
  create(document.body, <div id='contains-p' key='some-key'>
    <p>Hello, world!</p>
    <div id='contains-style' style={{ backgroundColor: 'red', color: 'orange' }}>Look at me! I have styles!</div>
  </div>);
});
