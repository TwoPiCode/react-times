'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(props) {
  var text = props.text,
      onClick = props.onClick;


  return _react2.default.createElement(
    'div',
    {
      className: 'time_picker_button',
      onClick: onClick
    },
    text
  );
};

Button.propTypes = {
  text: _propTypes2.default.string,
  onClick: _propTypes2.default.func
};

Button.defaultProps = {
  text: 'button',
  onClick: function onClick() {}
};

exports.default = Button;