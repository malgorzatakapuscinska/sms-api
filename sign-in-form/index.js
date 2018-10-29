const { Form, Input, Select, Button, Checkbox, Alert } = antd;

class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      /*contacts: [],*/
      groups: [],
      isPhoneExist: false,
      isEmailExist: false,
      contactSaved: false,
      serverError: ''
    }
  }

  componentDidMount () {
    /*axios.get("http://localhost:3001/contacts")
      .then((response) => {
        (response.data !== "404 not found") ?
        this.setState({...this.state, contacts: response.data, serverError: ''}, () => console.log(this.state)) :
        this.setState({...this.state, serverError: response.data}, console.log(this.state));
      })*/
    axios.get("http://localhost:3001/groups")
      .then((response) => {
        (response.data !== "404 not found") ? this.setState({...this.state, groups: response.data, serverError: ''}, () => console.log(this.state)) :
        this.setState({serverError: response.data}, console.log(this.state));
      })
  }

  handlesubmit = (event) => {
    event.preventDefault();
    console.log(this.props);
    this.isPhoneExist();

    (this.)
    this.props.form.validateFields
      (  {force: true},(error, values) => {
        if (!error) {
          console.log(values);
          const stringifyValues = JSON.stringify(values);
          console.log(stringifyValues);
          axios.post('http://localhost:3001/contacts/add', values)
            .then((response) => {
              console.log(response);
              (response && response.data !== "500 Internal Server Error") ?
              this.setState({contactSaved: true, serverError: ''}, console.log(this.state)) :
              this.setState({contactSaved: false, serverError: response.data}, console.log(this.state));
            });
        }
    })
  }

  isPhoneExist = () => {
    console.log("phone " + this.props.form.getFieldValue('phone_number'));
    let phoneNumber = {phone_number: this.props.form.getFieldValue('phone_number')};
      axios.post("http://localhost:3001/phone/check", phoneNumber)
      .then((response) => {
        console.log("server response" + response.data);
        (response.data && response.data === "Phone number exists in database") ? true
         /*this.setState({...this.state, isPhoneExist: true}, () => console.log(this.state))*/ : false
         /*this.setState({...this.state, isPhoneExist: false}, () => console.log(this.state))*/;
      })
  }

  validatePhoneNumber = (_rule, _value, callback) => {
  /*  console.log("phone " + this.props.form.getFieldValue('phone_number'));
    let phoneNumber = {phone_number: this.props.form.getFieldValue('phone_number')};
    console.log(phoneNumber.phone_number.length);*/

    (this.state.isPhoneExist) ?
        callback("Istnieje użytkownik o podanym numerze telefonu. Proszę wpisać inny numer telefonu lub skontaktować się z administratorem") :
        callback();
  }

  isEmailExist = (email) => {
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:3001/email/check", email)
        .then((response) => {
          console.log("server response" + response.data);
          (response.data && response.data === "Email exists in database") ?
          resolve(response.data) : reject(response.data);
        })
    })
  }

  validateEmail = (_rule, _value, callback) => {
    console.log("e-mail " + this.props.form.getFieldValue('email'));
    let email = {email: this.props.form.getFieldValue('email')};
    console.log(email.email);

    if (email) {
      this.isEmailExist(email)
      .then((data) => {
        this.setState({isEmailExist: true}, () => {
          console.log(this.state);
          (this.state.isEmailExist === true) ?
          callback("Istnieje użytkownik o podanym adresie e-mail. Proszę użyc innego adresu e-mail lub skontaktować się z administratorem") :
          callback();
        });
      })
      .catch((data) => {
        this.setState({isEmailExist: false}, () => console.log(this.state));
      });
    }

    /*(this.state.contacts.find((contact) => contact.email === this.props.form.getFieldValue('email')) === undefined) ?
    callback() : callback("Istnieje użytkownik o podanym adresie e-mail. Proszę użyc innego adresu e-mail lub skontaktować się z administratorem");*/
  }

  onClose = () => {
    console.log("closed");
  }

  render () {
    const {getFieldDecorator, validateFields} = this.props.form;
    const {groups, contactSaved, serverError} = this.state;
    console.log(groups);
    console.log(this.state);
    return (
      <div className="container">
        {
          (serverError === "404 not found") ? (
            <Alert
              message="Przepraszamy rejestracja jest chwilowo niemożliwa. Spróbuj ponownie później"
              type="error"
              className="ant-alert-serverError"
            />
          ) :
        (<Form layout="horizontal" onSubmit={this.handlesubmit} className="ant-form--centered">
          { (contactSaved === true) ? (
              <Alert
                message="Dane zapisane! Dziękujemy za zapisanie się do listy subskrybentów"
                type="success"
                closable
                onClose={this.onClose}
                className="ant-alert-centered"
            />) : null
          }

          { (serverError === "500 Internal Server Error") ? (
              <Alert
                message="Przykro nam! Nie udało się zapisać danych spróbuj ponownie później"
                type="error"
                closable
                onClose={this.onClose}
                className="ant-alert-centered"
            />) : null
          }
          <h1>Zarejestruj się na newsletter</h1>
          <Form.Item label="Imię">
            {getFieldDecorator("first_name", {rules: [{required: true, message: "Wpisz swoje imię!"}],
          })(<Input placeholder="Jan" />)}
          </Form.Item>
          <Form.Item label="Nazwisko">
            {getFieldDecorator("last_name", {rules: [{required: true, message: "Wpisz nazwisko!"}],
          })(<Input placeholder="Kowalski" />)}
          </Form.Item>
          <Form.Item label="Numer telefonu komórkowego wg wzoru: 48xxxxxxxxx" className="label-wordWrapped">
            {getFieldDecorator("phone_number",{
              rules: [
                {required: true, message: "Wpisz twój numer telefonu!"},
                {max: 11, message: "Numer telefonu zbyt długi - maksimum 11 znaków"},
                {pattern: new RegExp(/48[0-9]{9}/), message: "Niepoprawny numer telefonu"},
                {validator: this.validatePhoneNumber}
              ],
          })(<Input placeholder="np. 48666666666" />)}
          </Form.Item>
          <Form.Item label="E-mail">
            {getFieldDecorator("email", {
              rules: [
                {required: true, message: "Wpisz twój adres e-mail"},
                {type: 'email', message: 'Nieprawidłowy adres e-mail' },
                {validator: this.validateEmail}
              ],
          })(<Input placeholder="jan.kowalski@domena.pl" />)}
          </Form.Item>
          <Form.Item label="Wybierz grupę">
            {getFieldDecorator("subscriberGroup", {rules: [{required: true, message: "Wybierz grupę!"}],
          })(<Select placeholder="Wybierz grupę">
              {groups.map((group) => (
                  <Select.Option key={group.id} value={group.name}>
                      {group.name}
                  </Select.Option>
              ))}
            </Select>)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("agreement", {rules: [{required: true, message: "Zgoda jest wymagana"}],
          })(<Checkbox>Zgoda na przetwarzanie <a href="zgoda.pdf">danych osobowych</a></Checkbox>)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Subskrybuj</Button>
          </Form.Item>
        </Form>)}
      </div>
    );
  }
}

const WrappedApp = Form.create()(App);
ReactDOM.render (
    <div>
      <WrappedApp />
    </div>,
    document.getElementById('app')
);
