const { Form, Input, Select, Button, Checkbox } = antd;
const axiosConfig = {
  url: "https://api.smsapi.pl/contacts",
  headers: {
      'Authorization': 'bearer b1HYcodZJ0swHqQt25It32EknkSGNBO6X9XurwbU',
  },
  responseType: 'application/xml',
}

const axiosInstance = axios.create(axiosConfig);

class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      contacts: [],
      groups: [],
    }
  }

  componentDidMount () {
    const URL = "https://api.smsapi.pl/contacts";
    axiosInstance()
      .then((response) => {
        console.log(response.data.collection);
        this.setState({...this.state, contacts: response.data.collection}, () => console.log(this.state));
      });

    axiosInstance("https://api.smsapi.pl/contacts/groups")
      .then((response) => {
        this.setState({...this.state, groups: response.data.collection}, () => console.log(this.state));
      });
  }

  handlesubmit = (event) => {
    event.preventDefault();
    console.log(this.props);
    this.props.form.validateFields
      (  {force: true},(error, values) => {
        if (!error) {
          console.log(values);
          const stringifyValues = JSON.stringify(values);
          console.log(stringifyValues);
          axiosInstance.post('https://api.smsapi.pl/contacts', values)
            .then((response) => console.log(response))
        }
        else console.log(error);
    })
  }

  validatePhoneNumber = (_rule, _value, callback) => {
    (this.state.contacts.find((contact) => contact.phone_number === this.props.form.getFieldValue('phone_number')) === undefined) ?
    callback() : callback("Istnieje użytkownik o podanym numerze telefonu. Proroszę wpisać inny numer telefonu lub skontaktować się z administratorem");
  }

  validateEmail = (_rule, _value, callback) => {
    (this.state.contacts.find((contact) => contact.email === this.props.form.getFieldValue('email')) === undefined) ?
    callback() : callback("Istnieje użytkownik o podanym adresie e-mail. Proszę użyc innego adresu e-mail lub skontaktować się z administratorem");
  }

  render () {
    const {getFieldDecorator, validateFields} = this.props.form;
    return (
      <div className="container">
        <Form layout="horizontal" onSubmit={this.handlesubmit} style={{width: "50%"}}>
          <Form.Item label="Imię">
            {getFieldDecorator("first_name", {rules: [{required: true, message: "Wpisz swoje imę!"}],
          })(<Input placeholder="Jan" />)}
          </Form.Item>
          <Form.Item label="Nazwisko">
            {getFieldDecorator("last_name", {rules: [{required: true, message: "Wpisz nazwisko!"}],
          })(<Input placeholder="Kowalski" />)}
          </Form.Item>
          <Form.Item label="Numer telefonu komórkowego wg wzoru: 48xxxxxxxxx">
            {getFieldDecorator("phone_number",{
              rules: [
                {required: true, message: "Wpisz twój numer telefonu!"},
                {pattern: new RegExp(/[1-9]{2}[0-9]{9}/), message: "Niepoprawny numer telefonu"},
                {validator: this.validatePhoneNumber}
              ],
          })(<Input placeholder="np. 48666666666" />)}
          </Form.Item>
          <Form.Item label="E-mail">
            {getFieldDecorator("email", {
              rules: [
                {required: true, message: "Wpisz twój adres e-mail"},
                { type: 'email', message: 'The input is not a valid e-mail addres' },
                {validator: this.validateEmail}
              ],
          })(<Input placeholder="jan.kowalski@domena.pl" />)}
          </Form.Item>
          <Form.Item label="Wybierz grupę">
            {getFieldDecorator("subscriberGroup", {rules: [{required: true, message: "Wybierz grupę!"}],
          })(<Select placeholder="Wybierz grupę">

              <Option value="group1">Grupa 1</Option>
              <Option value="group2">Grupa 2</Option>
            </Select>)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("agreement", {rules: [{required: true, message: "Zgoda jest wymagana"}],
          })(<Checkbox>Zgoda na przetwarzanie <a href="">danych osobowych</a></Checkbox>)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Subskrybuj</Button>
          </Form.Item>
        </Form>
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
