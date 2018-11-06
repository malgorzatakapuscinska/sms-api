const { Form, Input, Select, Button, Checkbox, Alert } = antd;
const APP_URL = "http://localhost:3001";
class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      userRemoved: false,
      userExists: true,
    }
  }

  handlesubmit = (event) => {
    event.preventDefault();
    const phoneNumber = {phone_number: this.props.form.getFieldValue('phone_number')};
    this.props.form.validateFields((error, values) => {
      if(!error) {
        const requestUrl = "contacts/" + values.phone_number;
        axios({
          method: 'DELETE',
          url: requestUrl
        })
          .then(response => {
            console.log(response.status);
            if (response.status === 200) {
              this.setState({userRemoved: true, userExists: true}, () => console.log(this.state));
            }
          })
          .catch(error => {
            console.log(error);
            this.setState({userRemoved: false, userExists: false}, () => console.log(this.state));
          })
      }
    })
  }

  render () {
    const {getFieldDecorator, validateFields} = this.props.form;
    return (
      <div className="container">
        <Form layout="horizontal" onSubmit={this.handlesubmit} className="ant-form--centered">
        { (this.state.userRemoved === true) ? (
            <Alert
              message="Subskrypcja anulowana. Dziękujemy za zgłoszenie"
              type="success"
              closable
              onClose={this.onClose}
              className="ant-alert-centered"
          />) : null
        }
        { (this.state.userExists === false) ? (
            <Alert
              message="Błąd. Nie istnieje użytkownik o podanym numerze telefonu."
              type="error"
              closable
              onClose={this.onClose}
              className="ant-alert-centered"
          />) : null
        }

          <h1> Aby wypisać się z subskrypcji podaj numer telefonu użyty podczas rejestracji </h1>
          <Form.Item label="Numer telefonu komórkowego wg wzoru: 48xxxxxxxxx" className="label-wordWrapped">
            {getFieldDecorator("phone_number",{
              rules: [
                {required: true, message: "Wpisz twój numer telefonu!"},
                {max: 11, message: "Numer telefonu zbyt długi - maksimum 11 znaków"},
                {pattern: new RegExp(/48[0-9]{9}/), message: "Niepoprawny numer telefonu"},
              ],
          })(<Input placeholder="np. 48666666666" />)}
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
