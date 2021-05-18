import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, TextArea, Button } from "semantic-ui-react";
import { Field, reduxForm, formValueSelector } from "redux-form";

const renderTextArea = ({ input, meta: { touched, error, warning } }) => {
  return (
    <div>
      <TextArea
        {...input}
        row={3}
        placeholder={`What's happening? `}
        style={{
          maxHeight: 150,
          minHeight: 150,
          resize: "none",
          fontSize: "20px",
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
const required = (value) => {
  if (!value || value === "" || value.length <= 0) {
    return <span> </span>;
  }
};

const maxLength = (value) =>
  value && value.length > 240 ? (
    <span style={{ color: "red" }}></span>
  ) : undefined;

let PostBoxForm = (props) => {
  const [char, setChar] = useState(0);

  useEffect(() => {
    setChar(0);
  }, [props.onFormSubmit]);

  return (
    <Form onSubmit={props.handleSubmit(props.onFormSubmit)}>
      <Field
        onChange={(e) => setChar(e.target.value.length)}
        type="text"
        name="boxText"
        component={renderTextArea}
        validate={[maxLength, required]}
      />
      <span
        style={{
          color: char > 240 ? "red" : char > 0 ? "#fff" : "grey",
          float: "left",
          marginTop: "10px",
        }}
      >
        {char} / 240
      </span>
      <Button
        circular
        type="submit"
        disabled={char === 0 || char > 240}
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
  onSubmitSuccess: (result, dispatch, props) => {
    props.reset("PostBoxForm");
  },
})(PostBoxForm);

const selector = formValueSelector("box");
PostBoxForm = connect((state) => {
  const values = selector(state, "boxText");
  return {
    values,
  };
})(PostBoxForm);

export default PostBoxForm;
