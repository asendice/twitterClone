import React from "react";
import { connect } from "react-redux";
import { Form, TextArea, Button } from "semantic-ui-react";
import { Field, reduxForm, formValueSelector } from "redux-form";

const renderTextArea = ({ input, meta: { touched, error, warning } }) => {
  return (
    <div>
      <TextArea
        {...input}
        row={3}
        placeholder={`What's happening San Diego? `}
        style={{ maxHeight: 150, minHeight: 150, resize: "none", background: "#12232e", color: "#fff" }}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

const maxLength = (value) =>
  value && value.length > 240 ? (
    <span>240 is max character limit... is that enough?</span>
  ) : undefined;

let PostBoxForm = (props) => {
  return (
    <Form onSubmit={props.handleSubmit(props.onFormSubmit)}>
      <Field
        type="text"
        name="boxText"
        component={renderTextArea}
        validate={[maxLength]}
      />
      <Button
        type="submit"
        disabled={!props.valid}
        style={{
          float: "right",
          marginTop: "5px",
          color: "#fff",
          backgroundColor: "#4DA8DA",
        }}
      >
        Post
      </Button>
    </Form>
  );
};

PostBoxForm = reduxForm({
  form: "box",
})(PostBoxForm);

const selector = formValueSelector("box");
PostBoxForm = connect((state) => {
  const values = selector(state, "boxText");
  return {
    values,
  };
})(PostBoxForm);

export default PostBoxForm;
