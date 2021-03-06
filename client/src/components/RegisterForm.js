import React from "react";
import { connect } from "react-redux";
import { Form, Header, Button, Divider } from "semantic-ui-react";
import { Field, reduxForm, formValueSelector } from "redux-form";

// validator for a required field 
const required = (x) => {
  if (!x || x === "") {
    return <span style={{ color: "pink" }}>*This field is required.</span>;
  }
  return undefined;
};

//validator for only numbers and letters 
const alphaNumeric = (value) =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? (
    <span style={{ color: "pink" }}> *Only alphanumeric characters</span>
  ) : undefined;

// validator for email
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? (
    <span style={{ color: "pink" }}>*Invalid Email address.</span>
  ) : undefined;

//validator for length < 4, value can't be less than 4
const length = (value) =>
  value && value.length < 4 ? (
    <span style={{ color: "pink" }}>
      {`*This field must contain more than 4 characters.`}
    </span>
  ) : undefined;

// validator for maxLength value can't be greater than 18
const nameMaxLength = (value) =>
  value && value.length > 18 ? (
    <span style={{ color: "pink" }}>
      {`*This field must contain no more than 18 characters.`}
    </span>
  ) : undefined;

const passMaxLength = (value) =>
  value && value.length > 18 ? (
    <span style={{ color: "pink" }}>
      {`*This field must contain no more than 18 characters.`}
    </span>
  ) : undefined;

// validator to prevent a username that contains spaces
const userNameVal = (value) =>
  value && value.includes(" ") ? (
    <span style={{ color: "pink" }}>*This field cannot include spaces.</span>
  ) : undefined;

const renderInput = ({
  input,
  label,
  value,
  type,
  meta: { touched, error, warning },
}) => {
  return (
    <div>
      <input
        fluid
        {...input}
        placeholder={label}
        type={type}
        value={value}
        autoComplete="off"
        style={{
          background: "#203647",
          border: "solid 1px #4DA8DA ",
          color: "#fff",
        }}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

let Register = (props) => {
  return (
    <div style={{ backgroundColor: "#203647" }}>
      <Header as="h2" style={{ color: "#fff" }}>
        Register to <span style={{ color: "#4da8da" }}>twitterClone</span>
      </Header>
      <Divider hidden />
      <Form onSubmit={props.handleSubmit(props.onRegister)}>
        <Field
          name="name"
          component={renderInput}
          type="text"
          label="username"
          validate={[
            required,
            alphaNumeric,
            length,
            nameMaxLength,
            userNameVal,
          ]}
        />
        <Divider hidden />
        <Field
          name="email"
          component={renderInput}
          type="email"
          label="email"
          validate={[email, required]}
        />
        <Divider hidden />
        <Field
          name="password"
          component={renderInput}
          type="password"
          label="password"
          validate={[required, length, passMaxLength, userNameVal]}
        />
        <Divider hidden />
        <Field
          name="confirmPassword"
          label="confirm password"
          component={renderInput}
          type="password"
          validate={[length, required, passMaxLength, userNameVal]}
        />
        <Divider />
        <Button type="submit" fluid circular className="follow-btn">
          Register
        </Button>
      </Form>
    </div>
  );
};

Register = reduxForm({
  form: "login",
})(Register);

const selector = formValueSelector("login");
Register = connect((state) => {
  const values = selector(state, "username", "password");
  return {
    values,
  };
})(Register);

export default Register;
