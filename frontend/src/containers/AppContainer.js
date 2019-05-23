import React, { Component } from 'react';
import { ipcRenderer, shell } from 'electron';

import App from '../components/App';
import TitleBar from 'frameless-titlebar';
import appIcon from '../assets/performance.png';

const exportJSON = data => {
  ipcRenderer.send('saveFile', data);
};

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

export default class AppContainer extends Component {
  NEW_MENU_OPTION = {
    label: 'New',
    click: () => this.resetApp()
  };
  ABOUT_MENU_OPTION = {
    label: 'About',
    click: () =>
      shell.openExternal('https://github.com/AbdullahKady/frontend-o-meter/')
  };

  constructor(props) {
    super(props);
    this.state = {
      menu: [this.NEW_MENU_OPTION, this.ABOUT_MENU_OPTION],
      appResetFlag: true
    };
  }

  resetApp = () => {
    this.setState(prevState => ({
      menu: [this.NEW_MENU_OPTION, this.ABOUT_MENU_OPTION],
      appResetFlag: !prevState.appResetFlag
    }));
  };

  onResultsChanged = ({ css, js }) => {
    const subMenu = [];

    if (js.length) {
      subMenu.push({
        label: 'Export JS',
        click: () => exportJSON(js)
      });
    }
    if (css.length) {
      subMenu.push({
        label: 'Export CSS',
        click: () => exportJSON(css)
      });
    }
    if (css.length && js.length) {
      subMenu.push({
        label: 'Export All',
        click: () => exportJSON({ js, css })
      });
    }

    let exportMenu = {};
    if (subMenu.length) {
      exportMenu = {
        label: 'Export',
        submenu: subMenu
      };
    }

    this.setState({
      menu: [this.NEW_MENU_OPTION, exportMenu, this.ABOUT_MENU_OPTION]
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="sticky-top">
          <TitleBar
            icon={appIcon}
            app="Frontend-o-Meter"
            menu={this.state.menu}
            theme={{
              barTheme: 'dark',
              barBackgroundColor: '#251d24',
              menuStyle: 'vertical',
              menuHighlightColor: '#52a98c',
              barHeight: '32px',
              winBarHeight: '38px',
              menuDimItems: false
            }}
          />
        </div>
        <App
          key={this.state.appResetFlag}
          onResultsChanged={this.onResultsChanged}
        />
      </React.Fragment>
    );
  }
}
