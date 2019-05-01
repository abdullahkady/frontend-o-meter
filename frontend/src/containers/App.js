// import TitleBar from 'frameless-titlebar';
import React from 'react';
import App from '../components/App';
const { shell } = window.require('electron');

// Make all HTTP links open in the OS default browser.
document.addEventListener('click', event => {
  if (event.target.tagName !== 'A') return;
  const { href } = event.target;
  if (href.startsWith('http') && !href.includes('localhost')) {
    // The href.includes condition is a workaround to avoid bootstrap's
    // default anchor tag for the Tabs component
    event.preventDefault();
    shell.openExternal(event.target.href);
  }
});

export default props => {
  return (
    <React.Fragment>
      {/* <TitleBar
        icon={`${__dirname}/../resources/icon.png`}
        app="Electron"
        menu={menu}
      /> */}
      <App />
    </React.Fragment>
  );
};
