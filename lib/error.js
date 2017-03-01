'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DreamwidthError = function (_Error) {
  _inherits(DreamwidthError, _Error);

  // Readable error response messages
  function DreamwidthError(err) {
    _classCallCheck(this, DreamwidthError);

    var _this = _possibleConstructorReturn(this, (DreamwidthError.__proto__ || Object.getPrototypeOf(DreamwidthError)).call(this, err));

    console.log('req headers:', err.req && err.req._header);
    console.log('res code:', err.res && err.res.statusCode);
    console.log('res body:', err.body);
    return _this;
  }

  return DreamwidthError;
}(Error);

exports.default = DreamwidthError;