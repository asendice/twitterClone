import React from "react";
import { connect } from "react-redux";
import { Form, Button, Divider, TextArea, Segment } from "semantic-ui-react";
import { Field, reduxForm, formValueSelector } from "redux-form";
const renderTextArea = ({ input, meta: { touched, error, warning } }) => {
  return (
    <div>
      <TextArea
        {...input}
        row={3}
        placeholder={`Enter your reply `}
        style={{
          fontSize: "20px",
          maxHeight: 150,
          minHeight: 150,
          resize: "none",
          background: "#203647",
          color: "#fff",
          border: "none",
        }}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};
const required = (num) => {
  if (!num || num === "") {
    return <span></span>;
  }
};

const maxLength = (value) =>
  value && value.length > 240 ? (
    <span>240 is max character limit... is that enough?</span>
  ) : undefined;

let Comment = (props) => {
  return (
    <div style={{ backgroundColor: "#203647", minHeight: 220 }}>
      <Form onSubmit={props.handleSubmit(props.onFormSubmit)}>
        <Field
          name="content"
          component={renderTextArea}
          type="text"
          label="username"
          validate={[required, maxLength]}
        />
        <Divider hidden />
        <span style={{float: "right"}}>
          <Button
            type="submit"
            style={{
              backgroundColor: "#4DA8DA",
              color: "#fff",
              
            }}
          >
            Reply
          </Button>
        </span>
      </Form>
    </div>
  );
};

Comment = reduxForm({
  form: "comment",
})(Comment);

const selector = formValueSelector("Comment");
Comment = connect((state) => {
  const values = selector(state, "content");
  return {
    values,
  };
})(Comment);

export default Comment;
