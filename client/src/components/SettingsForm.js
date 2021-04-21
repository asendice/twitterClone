import React from "react";
import { connect } from "react-redux";
import {
  Form,
  Header,
  Icon,
  Button,
  TextArea,
  Divider,
  Label,
  Input,
} from "semantic-ui-react";
import { Field, reduxForm, formValueSelector } from "redux-form";

const renderInput = ({
  input,
  label,
  value,
  type,
  meta: { touched, error, warning },
}) => {
  return (
    <div>
      <Input
        {...input}
        placeholder={label}
        type={type}
        value={value}
        autoComplete="off"
        style={{
          backgroundColor: "#4DA8DA",
          color: "#fff",
          border: "solid 1px",
        }}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

const renderImageInput = ({
  input,
  label,
  value,
  type,
  meta: { touched, error, warning },
}) => {
  return (
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        value={value}
        autoComplete="off"
        style={{
          backgroundColor: "#203647",
          color: "#fff",
          border: "solid 1px #4DA8DA",
          cursor: "pointer",
        }}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

const renderTextArea = ({
  input,
  label,
  meta: { touched, error, warning },
}) => {
  return (
    <div>
      <TextArea
        {...input}
        style={{
          maxHeight: 60,
          minHeight: 60,
          backgroundColor: "#203647",
          color: "#fff",
          border: "solid 1px #4DA8DA",
          resize: "none",
        }}
        placeholder={label}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

let SettingsForm = (props) => {
  return (
    <div style={{ backgroundColor: "#203647" }}>
      <Header as="h2" style={{ color: "#fff" }}>
        <Icon
          onClick={() => props.setOpen(false)}
          name="x"
          style={{ color: "#4DA8DA", cursor: "pointer" }}
        />
        Edit Profile
      </Header>
      <Button
        type="submit"
        disable={!props.valid}
        style={{
          backgroundColor: "#4DA8DA",
          color: "#fff",
          float: "right",
          marginTop: -50,
        }}
      >
        Save
      </Button>
      <Form onSubmit={props.handleSubmit(props.onFormSubmit)}>
        <Label style={{ backgroundColor: "#4DA8DA", color: "#fff" }}>
          {" "}
          Change your Avatar Image
        </Label>
        <Field
          name="avatarPic"
          value=""
          type="file"
          accept=".png, .jpeg, .jpg"
          component={renderImageInput}
        />
        <Divider />

        <Label style={{ backgroundColor: "#4DA8DA", color: "#fff" }}>
          {" "}
          Change your Background Image
        </Label>
        <Field
          name="backgroundPic"
          value=""
          type="file"
          accept=".png, .jpeg, .jpg"
          component={renderImageInput}
        />
        <Divider />
        <Divider hidden />
        <Field name="bio" component={renderTextArea} label="update your bio" />
      </Form>
    </div>
  );
};

SettingsForm = reduxForm({
  form: "settings",
})(SettingsForm);

const selector = formValueSelector("settings");
SettingsForm = connect((state) => {
  const values = selector(state, "avatarPic", "bio", "backgroundPic");
  return {
    values,
  };
})(SettingsForm);

export default SettingsForm;
