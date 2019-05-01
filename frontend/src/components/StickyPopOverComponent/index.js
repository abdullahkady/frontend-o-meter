// Credits: https://gist.github.com/lou/571b7c0e7797860d6c555a9fdc0496f9

import React from 'react';
import { Overlay, Popover } from 'react-bootstrap';

export default class StickyPopOverComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.state = {
      showPopover: false
    };
  }

  handleMouseEnter() {
    const { delay, onMouseEnter } = this.props;

    this.setTimeoutConst = setTimeout(() => {
      this.setState({ showPopover: true }, () => {
        if (onMouseEnter) {
          onMouseEnter();
        }
      });
    }, delay);
  }

  handleMouseLeave() {
    clearTimeout(this.setTimeoutConst);
    this.setState({ showPopover: false });
  }

  componentWillUnmount() {
    if (this.setTimeoutConst) {
      clearTimeout(this.setTimeoutConst);
    }
  }

  render() {
    let { content, children, placement, title } = this.props;

    const child = React.Children.map(children, child =>
      React.cloneElement(child, {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        ref: node => {
          this._child = node;
          const { ref } = child;
          if (typeof ref === 'function') {
            ref(node);
          }
        }
      })
    )[0];

    return (
      <React.Fragment>
        {child}
        <Overlay
          show={this.state.showPopover}
          placement={placement}
          target={this._child}
          shouldUpdatePosition={true}
        >
          <Popover
            title={title}
            onMouseEnter={() => {
              this.setState({ showPopover: true });
            }}
            onMouseLeave={this.handleMouseLeave}
            id="popover"
          >
            {content}
          </Popover>
        </Overlay>
      </React.Fragment>
    );
  }
}
