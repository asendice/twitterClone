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
  Segment,
} from "semantic-ui-react";
import { Field, reduxForm, formValueSelector } from "redux-form";

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

const bioMaxLength = (value) =>
  value && value.length > 180 ? (
    <span style={{ color: "pink" }}>
      {`*Your Bio cannot be longer than 180 characters.`}
    </span>
  ) : undefined;

let SettingsForm = (props) => {
  return (
    <div style={{ backgroundColor: "#203647", height: "100%" }}>
      <Header as="h2" style={{ color: "#fff" }}>
        <Icon
          onClick={() => props.setOpen(false)}
          name="x"
          style={{ color: "#4DA8DA", cursor: "pointer" }}
        />
        Edit Profile
      </Header>

      <Divider />
      <Form onSubmit={props.handleSubmit(props.onFormSubmit)}>
        <Label style={{ backgroundColor: "black", color: "#4DA8DA" }}>
          {" "}
          Change your Profile Image
        </Label>
        <Field
          name="profilePic"
          value=""
          type="file"
          accept=".png, .jpeg, .jpg"
          component={renderImageInput}
        />
        <Divider hidden />

        <Label style={{ backgroundColor: "black", color: "#4DA8DA" }}>
          {" "}
          Change your Background Image
        </Label>
        <Field
          name="background"
          value=""
          type="file"
          accept=".png, .jpeg, .jpg"
          component={renderImageInput}
        />
        <Divider hidden />
        <Divider hidden />
        <Field name="bio" component={renderTextArea} label="update your bio" validate={[bioMaxLength]} />
        <Segment basic>
          <Button
            type="submit"
            disable={!props.valid}
            style={{
              backgroundColor: "#4DA8DA",
              color: "#fff",
              float: "right",
            }}
          >
            Save
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

SettingsForm = reduxForm({
  form: "settings",
})(SettingsForm);

const selector = formValueSelector("settings");
SettingsForm = connect((state) => {
  const values = selector(state, "profilePic", "bio", "background");
  return {
    values,
  };
})(SettingsForm);

export default SettingsForm;
