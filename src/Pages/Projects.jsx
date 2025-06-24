import React, { Component, ReactDOM } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "../css/AdminProjects.scss";

const withNavigateHook = (Component) => {
  return (props) => {
    const navigation = useNavigate();

    return <Component navigation={navigation} {...props} />;
  };
};

class Otpinput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", otp1: "", otp2: "", otp3: "", otp4: "", otp5: "", disable: true };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value1, event) {
    this.setState({ [value1]: event.target.value });
  }

  handleSubmit(event) {
    const data = new FormData(event.target);
    // this.props.navigation("/project");
    event.preventDefault();
  }

  inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      if (next < 5) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

  render() {
    return (
      <section className="admin-project">
        <Card className="p-5" style={{ backgroundColor: "lightgrey" }}>
          <form onSubmit={this.handleSubmit} className="text-center p-5">
            <div className="otpContainer">
              <p>Check your email Enter your One time password</p>
              <input
                name="otp1"
                type="text"
                autoComplete="off"
                className="otpInput"
                value={this.state.otp1}
                onChange={(e) => this.handleChange("otp1", e)}
                tabIndex="1"
                maxLength="1"
                onKeyUp={(e) => this.inputfocus(e)}
              />
              <input
                name="otp2"
                type="text"
                autoComplete="off"
                className="otpInput"
                value={this.state.otp2}
                onChange={(e) => this.handleChange("otp2", e)}
                tabIndex="2"
                maxLength="1"
                onKeyUp={(e) => this.inputfocus(e)}
              />
              <input
                name="otp3"
                type="text"
                autoComplete="off"
                className="otpInput"
                value={this.state.otp3}
                onChange={(e) => this.handleChange("otp3", e)}
                tabIndex="3"
                maxLength="1"
                onKeyUp={(e) => this.inputfocus(e)}
              />
              <input
                name="otp4"
                type="text"
                autoComplete="off"
                className="otpInput"
                value={this.state.otp4}
                onChange={(e) => this.handleChange("otp4", e)}
                tabIndex="4"
                maxLength="1"
                onKeyUp={(e) => this.inputfocus(e)}
              />

              <input
                name="otp5"
                type="text"
                autoComplete="off"
                className="otpInput"
                value={this.state.otp5}
                onChange={(e) => this.handleChange("otp5", e)}
                tabIndex="5"
                maxLength="1"
                onKeyUp={(e) => this.inputfocus(e)}
              />
            </div>
            <Button className="primary" type="submit">
              Submit
            </Button>
          </form>
        </Card>
      </section>
    );
  }
}

export default withNavigateHook(Otpinput);
