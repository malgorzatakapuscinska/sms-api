"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _antd = antd,
    Form = _antd.Form,
    Input = _antd.Input,
    Select = _antd.Select,
    Button = _antd.Button,
    Checkbox = _antd.Checkbox,
    Alert = _antd.Alert;
var APP_URL = "http://localhost:3001";

var SignOutForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SignOutForm, _React$Component);

  function SignOutForm(props) {
    var _this;

    _classCallCheck(this, SignOutForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SignOutForm).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlesubmit", function (event) {
      event.preventDefault();
      var phoneNumber = {
        phone_number: _this.props.form.getFieldValue('phone_number')
      };

      _this.props.form.validateFields(function (error, values) {
        if (!error) {
          var requestUrl = "contacts/" + values.phone_number;
          axios({
            method: 'DELETE',
            url: requestUrl
          }).then(function (response) {
            console.log(response.status);

            if (response.status === 200) {
              _this.setState({
                userRemoved: true,
                userExists: true
              }, function () {
                return console.log(_this.state);
              });
            }
          }).catch(function (error) {
            console.log(error);

            _this.setState({
              userRemoved: false,
              userExists: false
            }, function () {
              return console.log(_this.state);
            });
          });
        }
      });
    });

    _this.state = {
      userRemoved: false,
      userExists: true
    };
    return _this;
  }

  _createClass(SignOutForm, [{
    key: "render",
    value: function render() {
      var _this$props$form = this.props.form,
          getFieldDecorator = _this$props$form.getFieldDecorator,
          validateFields = _this$props$form.validateFields;
      return React.createElement("div", {
        className: "container"
      }, React.createElement(Form, {
        layout: "horizontal",
        onSubmit: this.handlesubmit,
        className: "ant-form--centered"
      }, this.state.userRemoved === true ? React.createElement(Alert, {
        message: "Subskrypcja anulowana. Dzi\u0119kujemy za zg\u0142oszenie",
        type: "success",
        closable: true,
        onClose: this.onClose,
        className: "ant-alert-centered"
      }) : null, this.state.userExists === false ? React.createElement(Alert, {
        message: "B\u0142\u0105d. Nie istnieje u\u017Cytkownik o podanym numerze telefonu.",
        type: "error",
        closable: true,
        onClose: this.onClose,
        className: "ant-alert-centered"
      }) : null, React.createElement("h1", null, " Aby wypisa\u0107 si\u0119 z subskrypcji podaj numer telefonu u\u017Cyty podczas rejestracji "), React.createElement(Form.Item, {
        label: "Numer telefonu kom\xF3rkowego wg wzoru: 48xxxxxxxxx",
        className: "label-wordWrapped"
      }, getFieldDecorator("phone_number", {
        rules: [{
          required: true,
          message: "Wpisz twój numer telefonu!"
        }, {
          max: 11,
          message: "Numer telefonu zbyt długi - maksimum 11 znaków"
        }, {
          pattern: new RegExp(/48[0-9]{9}/),
          message: "Niepoprawny numer telefonu"
        }]
      })(React.createElement(Input, {
        placeholder: "np. 48666666666"
      }))), React.createElement(Form.Item, null, React.createElement(Button, {
        type: "primary",
        htmlType: "submit"
      }, "Subskrybuj"))), ")}");
    }
  }]);

  return SignOutForm;
}(React.Component);

var SignInForm =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(SignInForm, _React$Component2);

  function SignInForm(props) {
    var _this2;

    _classCallCheck(this, SignInForm);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(SignInForm).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "handlesubmit", function (event) {
      event.preventDefault();

      _this2.props.form.validateFields({
        force: true
      }, function (error, values) {
        if (!error) {
          _this2.isPhoneAndEmailExist().then(function (value) {
            _this2.props.form.validateFields({
              force: true
            }, function (error, values) {
              if (!error && _this2.state.contactSaved === true) {
                _this2.setState({
                  contactSaved: false
                }, _this2.contactAdd(values));
              } else if (!error && _this2.state.contactSaved === false) {
                _this2.contactAdd(values);
              }
            });
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "contactAdd", function (values) {
      console.log(_this2.state.contactSaved);
      var stringifyValues = JSON.stringify(values);
      axios.post('/contacts/add', values).then(function (response) {
        console.log(response.status);
        response && response.status === 200 ? _this2.setState({
          contactSaved: true,
          serverError: ''
        }, function () {
          return console.log(_this2.state);
        }) : _this2.setState({
          contactSaved: false,
          serverError: response.status
        });
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "isPhoneAndEmailExist", function () {
      return new Promise(function (resolve, reject) {
        var valuesToValidate = {
          phone_number: _this2.props.form.getFieldValue('phone_number'),
          email: _this2.props.form.getFieldValue('email')
        };
        axios.post("/validation", valuesToValidate).then(function (response) {
          response.data.phone_number === 'exists' ? _this2.setState({
            isPhoneExist: true
          }) : null;
          response.data.email === 'exists' ? _this2.setState({
            isEmailExist: true
          }) : null;
          resolve('done');
        }).catch(function (error) {
          reject(error);
        });
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "validatePhoneNumber", function (_rule, _value, callback) {
      _this2.state.isPhoneExist ? _this2.setState({
        isPhoneExist: false
      }, callback("Istnieje użytkownik o podanym numerze telefonu. Proszę wpisać inny numer telefonu lub skontaktować się z administratorem")) : callback();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "validateEmail", function (_rule, _value, callback) {
      _this2.state.isEmailExist ? _this2.setState({
        isEmailExist: false
      }, callback("Istnieje użytkownik o podanym adresie e-mail. Proszę użyc innego adresu e-mail lub skontaktować się z administratorem")) : callback();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "validateTerms", function (_rule, value, callback) {
      return value !== true ? callback('Please accept the terms and conditions') : callback();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "onClose", function () {
      console.log("closed");
    });

    _this2.state = {
      groups: [],
      isPhoneExist: false,
      isEmailExist: false,
      contactSaved: false,
      serverError: ''
    };
    return _this2;
  }

  _createClass(SignInForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      axios.get('/groups').then(function (response) {
        response.status !== "404" && response.status !== "503" ? _this3.setState({
          groups: response.data,
          serverError: ''
        }) : _this3.setState({
          serverError: response.status
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$form2 = this.props.form,
          getFieldDecorator = _this$props$form2.getFieldDecorator,
          validateFields = _this$props$form2.validateFields;
      var _this$state = this.state,
          groups = _this$state.groups,
          contactSaved = _this$state.contactSaved,
          serverError = _this$state.serverError;
      return React.createElement("div", {
        className: "container"
      }, serverError === "503" ? React.createElement(Alert, {
        message: "B\u0142\u0105d serwera. Rejestracja jest chwilowo niemo\u017Cliwa. Spr\xF3buj ponownie p\xF3\u017Aniej.",
        type: "error",
        className: "ant-alert-serverError"
      }) : React.createElement(Form, {
        layout: "horizontal",
        onSubmit: this.handlesubmit,
        className: "ant-form--centered"
      }, contactSaved === true ? React.createElement(Alert, {
        message: "Dane zapisane! Dzi\u0119kujemy za zapisanie si\u0119 do listy subskrybent\xF3w",
        type: "success",
        closable: true,
        onClose: this.onClose,
        className: "ant-alert-centered"
      }) : null, serverError === "500 Internal Server Error" ? React.createElement(Alert, {
        message: "Przykro nam! Nie uda\u0142o si\u0119 zapisa\u0107 danych spr\xF3buj ponownie p\xF3\u017Aniej.",
        type: "error",
        closable: true,
        onClose: this.onClose,
        className: "ant-alert-centered"
      }) : null, React.createElement("h1", null, "Zarejestruj si\u0119 na newsletter"), React.createElement(Form.Item, {
        label: "Imi\u0119"
      }, getFieldDecorator("first_name", {
        rules: [{
          required: true,
          message: "Wpisz swoje imię!"
        }]
      })(React.createElement(Input, {
        placeholder: "Jan"
      }))), React.createElement(Form.Item, {
        label: "Nazwisko"
      }, getFieldDecorator("last_name", {
        rules: [{
          required: true,
          message: "Wpisz nazwisko!"
        }]
      })(React.createElement(Input, {
        placeholder: "Kowalski"
      }))), React.createElement(Form.Item, {
        label: "Numer telefonu kom\xF3rkowego wg wzoru: 48xxxxxxxxx",
        className: "label-wordWrapped"
      }, getFieldDecorator("phone_number", {
        rules: [{
          required: true,
          message: "Wpisz twój numer telefonu!"
        }, {
          max: 11,
          message: "Numer telefonu zbyt długi - maksimum 11 znaków"
        }, {
          pattern: new RegExp(/48[0-9]{9}/),
          message: "Niepoprawny numer telefonu"
        }, {
          validator: this.validatePhoneNumber
        }]
      })(React.createElement(Input, {
        placeholder: "np. 48666666666"
      }))), React.createElement(Form.Item, {
        label: "E-mail"
      }, getFieldDecorator("email", {
        rules: [{
          required: true,
          message: "Wpisz twój adres e-mail"
        }, {
          pattern: new RegExp(/^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i),
          message: "Nieprawidłowy adres e-mail"
        }, {
          validator: this.validateEmail
        }]
      })(React.createElement(Input, {
        placeholder: "jan.kowalski@domena.pl"
      }))), React.createElement(Form.Item, {
        label: "Wybierz grup\u0119"
      }, getFieldDecorator("subscriberGroup", {
        rules: [{
          required: true,
          message: "Wybierz grupę!"
        }]
      })(React.createElement(Select, {
        placeholder: "Wybierz grup\u0119"
      }, groups.map(function (group) {
        return React.createElement(Select.Option, {
          key: group.id,
          value: group.name
        }, group.name);
      })))), React.createElement(Form.Item, null, getFieldDecorator("agreement", {
        rules: [{
          validator: this.validateTerms,
          message: "Zgoda jest wymagana"
        }]
      })(React.createElement(Checkbox, null, "Zgoda na przetwarzanie ", React.createElement("a", {
        href: "zgoda.pdf"
      }, "danych osobowych")))), React.createElement(Form.Item, null, React.createElement(Button, {
        type: "primary",
        htmlType: "submit"
      }, "Subskrybuj"))));
    }
  }]);

  return SignInForm;
}(React.Component);

var requestPath = window.location.pathname;

if (requestPath === '/sign-in-form') {
  var WrappedSignInForm = Form.create()(SignInForm);
  ReactDOM.render(React.createElement("div", null, React.createElement(WrappedSignInForm, null)), document.getElementById('app'));
} else {
  var WrappedSignOutForm = Form.create()(SignOutForm);
  ReactDOM.render(React.createElement("div", null, React.createElement(WrappedSignOutForm, null)), document.getElementById('app'));
}
