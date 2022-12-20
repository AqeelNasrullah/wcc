import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

const InputField = ({ label, required, type, error, ...rest }) => {
  return (
    <FormGroup>
      <Label>
        {label}
        {required && <span className="text-danger"> *</span>}:
      </Label>
      <Input
        type={type}
        placeholder={label}
        className={`${error && "is-invalid"}`}
        {...rest}
      />
      {error && (
        <FormFeedback>
          <i className="fa-solid fa-triangle-exclamation"></i> {error}
        </FormFeedback>
      )}
    </FormGroup>
  );
};

export default InputField;
