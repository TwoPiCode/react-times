import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  onOutsideClick: PropTypes.func,
};

const defaultProps = {
  children: <span />,
  onOutsideClick: () => {},
};

class OutsideClickHandler extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  mountListeners = () => {
    if (document.addEventListener) {
      document.addEventListener('mousedown', this.onOutsideClick, true);
      document.addEventListener('touchstart', this.onOutsideClick, true);
    } else {
      document.attachEvent('onmousedown', this.onOutsideClick);
    }
  };

  unmountListeners = () => {
    if (document.removeEventListener) {
      document.removeEventListener('mousedown', this.onOutsideClick, true);
      document.removeEventListener('touchstart', this.onOutsideClick, true);
    } else {
      document.detachEvent('onmousedown', this.onOutsideClick);
    }
  };

  componentWillReceiveProps (nextProps: Object) {
    const {focused} = nextProps;
    if (focused) {
      setTimeout(() => this.mountListeners(), 500);
    } else {
      this.unmountListeners();
    }
  }

  componentWillUnmount() {
    this.unmountListeners();
  }

  onOutsideClick(e) {
    const { focused } = this.props;
    if (!focused) return;
    const event = e || window.event;
    const mouseTarget = (typeof event.which !== 'undefined') ? event.which : event.button;
    const isDescendantOfRoot = this.childNode.contains(event.target);
    if (!isDescendantOfRoot && mouseTarget === 1) {
      const { onOutsideClick } = this.props;
      onOutsideClick && onOutsideClick(event);
    }
  }

  render() {
    const { focused } = this.props;
    const outsideClass = focused
      ? 'outside_container active'
      : 'outside_container';
    return (
      <div ref={c => (this.childNode = c)} className={outsideClass}>
        {this.props.children}
      </div>
    );
  }
}

OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;

export default OutsideClickHandler;
