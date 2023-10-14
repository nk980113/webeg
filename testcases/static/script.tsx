import { create } from 'webeg';

document.addEventListener('DOMContentLoaded', () => {
  create(document.body, <div id='contains-p' key='some-key'>
    <p>Hello, world!</p>
  </div>);
});
