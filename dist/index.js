'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notify = exports.Notification = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _eventEmitter = require('event-emitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _check = require('./assets/check.svg');

var _check2 = _interopRequireDefault(_check);

var _error = require('./assets/error.svg');

var _error2 = _interopRequireDefault(_error);

var _info = require('./assets/info.svg');

var _info2 = _interopRequireDefault(_info);

var _warning = require('./assets/warning.svg');

var _warning2 = _interopRequireDefault(_warning);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var emitter = new _eventEmitter2.default();

var notify = function notify(msg, type) {
  emitter.emit('notification', msg, type);
};

var Notification = function Notification() {

  (0, _react.useEffect)(function () {
    var handler = function handler(msg, type) {
      showToast(msg, type);
    };

    emitter.on('notification', handler);

    return function () {
      return emitter.off('notification', handler);
    };
  }, []);

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      toastList = _useState2[0],
      setToastList = _useState2[1];

  (0, _react.useEffect)(function () {
    var interval = setInterval(function () {
      if (toastList.length) {
        toastList.forEach(function (element) {
          if (element.type === 'success') {
            deleteToast(element.id);
            return false;
          }
        });
      }
    }, 3000);

    return function () {
      clearInterval(interval);
    };
  }, [toastList]);

  var deleteToast = function deleteToast(id) {
    var toastListItem = toastList.findIndex(function (e) {
      return e.id === id;
    });
    toastList.splice(toastListItem, 1);
    setToastList([].concat(_toConsumableArray(toastList)));
  };

  var showToast = function showToast(msg, type) {
    var id = 'toast-' + (0, _v2.default)();
    var toastProperties = void 0;
    switch (type) {
      case 'success':
        toastProperties = {
          id: id,
          description: msg,
          backgroundColor: '#57A671',
          icon: _check2.default,
          type: type
        };
        break;
      case 'danger':
        toastProperties = {
          id: id,
          description: msg,
          backgroundColor: '#F56060',
          icon: _error2.default,
          type: type
        };
        break;
      case 'info':
        toastProperties = {
          id: id,
          description: msg,
          backgroundColor: '#58CAF8',
          icon: _info2.default,
          type: type
        };
        break;
      case 'warning':
        toastProperties = {
          id: id,
          description: msg,
          backgroundColor: '#EBBD36',
          icon: _warning2.default,
          type: type
        };
        break;

      default:
        setToastList([]);
    }

    setToastList(function (list) {
      return [].concat(_toConsumableArray(list), [toastProperties]);
    });
  };

  return _react2.default.createElement(
    'div',
    { className: 'notifications-parent' },
    toastList.map(function (toast) {
      return _react2.default.createElement(
        'div',
        {
          key: toast.id,
          className: 'notification',
          style: { backgroundColor: toast.backgroundColor }
        },
        _react2.default.createElement(
          'div',
          { className: 'toaster' },
          _react2.default.createElement(
            'div',
            { className: 'notification-image' },
            _react2.default.createElement('img', { src: toast.icon, alt: '' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'notification-message' },
            toast.description
          )
        ),
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return deleteToast(toast.id);
            } },
          'x'
        )
      );
    })
  );
};

exports.Notification = Notification;
exports.notify = notify;