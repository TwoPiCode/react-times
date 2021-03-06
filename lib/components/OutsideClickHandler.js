'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  children: _propTypes2.default.node,
  onOutsideClick: _propTypes2.default.func
};

var defaultProps = {
  children: _react2.default.createElement('span', null),
  onOutsideClick: function onOutsideClick() {}
};

var OutsideClickHandler = function (_React$PureComponent) {
  _inherits(OutsideClickHandler, _React$PureComponent);

  function OutsideClickHandler(props) {
    _classCallCheck(this, OutsideClickHandler);

    var _this = _possibleConstructorReturn(this, (OutsideClickHandler.__proto__ || Object.getPrototypeOf(OutsideClickHandler)).call(this, props));

    _this.mountListeners = function () {
      if (document.addEventListener) {
        document.addEventListener('mousedown', _this.onOutsideClick, true);
        document.addEventListener('touchstart', _this.onOutsideClick, true);
      } else {
        document.attachEvent('onmousedown', _this.onOutsideClick);
      }
    };

    _this.unmountListeners = function () {
      if (document.removeEventListener) {
        document.removeEventListener('mousedown', _this.onOutsideClick, true);
        document.removeEventListener('touchstart', _this.onOutsideClick, true);
      } else {
        document.detachEvent('onmousedown', _this.onOutsideClick);
      }
    };

    _this.onOutsideClick = _this.onOutsideClick.bind(_this);
    return _this;
  }

  _createClass(OutsideClickHandler, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var focused = nextProps.focused;

      if (focused) {
        setTimeout(function () {
          return _this2.mountListeners();
        }, 500);
      } else {
        this.unmountListeners();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmountListeners();
    }
  }, {
    key: 'onOutsideClick',
    value: function onOutsideClick(e) {
      var focused = this.props.focused;

      if (!focused) return;
      var event = e || window.event;
      var mouseTarget = typeof event.which !== 'undefined' ? event.which : event.button;
      var isDescendantOfRoot = this.childNode.contains(event.target);
      if (!isDescendantOfRoot && mouseTarget === 1) {
        var onOutsideClick = this.props.onOutsideClick;

        onOutsideClick && onOutsideClick(event);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var focused = this.props.focused;

      var outsideClass = focused ? 'outside_container active' : 'outside_container';
      return _react2.default.createElement(
        'div',
        { ref: function ref(c) {
            return _this3.childNode = c;
          }, className: outsideClass },
        this.props.children
      );
    }
  }]);

  return OutsideClickHandler;
}(_react2.default.PureComponent);

OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;

exports.default = OutsideClickHandler;